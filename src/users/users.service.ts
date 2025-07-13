import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findByEmail(createUserDto.email)) {
      throw new BadRequestException(
        'User creation failed. Please check your credentials.',
      );
    }
    const createdUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });
    return {
      ...createdUser,
      password: undefined,
    };
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

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    if (await this.findByEmail(updateUserDto.email)) {
      throw new BadRequestException(
        'User creation failed. Please check your credentials.',
      );
    }
    if (!updateUserDto.id_user) {
      throw new BadRequestException('Missing user ID for update.');
    }
    const { id_user, ...data } = updateUserDto;
    return this.prisma.user.update({
      where: { id: id_user },
      data: {
        ...data,
        password: data.password
          ? bcrypt.hashSync(data.password, 10)
          : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'User successfully deleted.',
    };
  }
}
