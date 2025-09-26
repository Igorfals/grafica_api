import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { FilterUserDto } from './dto/filter-user.dto';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { omitField } from 'src/common/utils/omit.field';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    @Inject('REDIS') private readonly redis: Redis,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { accessKey, ...userData } = createUserDto;
    const secret = this.configService.get<string>('USER_CREATION_SECRET');

    const key = `user:create:attempts:${userData.email}`;
    const blockKey = `user:create:block:${userData.email}`;

    const isBlocked = await this.redis.get(blockKey);
    if (isBlocked) {
      throw new UnauthorizedException(
        'Too many attempts. Try again in 30 minutes.',
      );
    }

    if (accessKey !== secret) {
      const attempts = await this.redis.incr(key);
      if (attempts === 1) {
        await this.redis.expire(key, 1800); // 30 min
      }

      if (attempts >= 5) {
        await this.redis.set(blockKey, '1', 'EX', 1800); // block for 30 min
        await this.redis.del(key); // reset attempts
        throw new UnauthorizedException(
          'Too many attempts. Try again in 30 minutes.',
        );
      }

      throw new UnauthorizedException(
        `Invalid access key. Attempt ${attempts}/5`,
      );
    }

    await this.redis.del(key); // reset on success

    if (await this.findByEmail(userData.email)) {
      throw new BadRequestException(
        'Email already exists. Please use a different email.',
      );
    }

    const createdUser = await this.prisma.user.create({
      data: {
        ...userData,
        password: await bcrypt.hash(userData.password, 10),
      },
    });

    const safeUser = omitField(createdUser, 'password');
    return safeUser;
  }

  findByUserName(name: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { name },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findAll(filter?: FilterUserDto): Promise<User[]> {
    const where: Prisma.UserWhereInput = {};

    if (filter?.name) {
      where.name = {
        contains: filter.name,
        mode: 'insensitive',
      };
    }

    if (filter?.email) {
      where.email = {
        contains: filter.email,
        mode: 'insensitive',
      };
    }

    return this.prisma.user.findMany({ where });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    if (!updateUserDto.id) {
      throw new BadRequestException('Missing user ID for update.');
    }

    const existingUser = await this.findByEmail(updateUserDto.email);
    if (existingUser && existingUser.id !== updateUserDto.id) {
      throw new BadRequestException(
        'Email already exists. Please use a different email.',
      );
    }

    const { id, ...data } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        password: data.password
          ? bcrypt.hashSync(data.password, 10)
          : undefined,
      },
    });
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('User ID is required for deletion.');
    }
    const userExists = await this.findOne(id);
    if (!userExists) {
      throw new BadRequestException('User not found.');
    }
    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'User successfully deleted.',
    };
  }
}
