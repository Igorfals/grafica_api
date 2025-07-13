import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class FilterUserDto {
  @ApiPropertyOptional({ example: 'Zezo', description: 'Nome do usuário' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'zezo@gmail.com',
    description: 'Email do usuário',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
