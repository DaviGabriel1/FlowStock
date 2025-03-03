/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsInt
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional() // Opcional, pois esse campo pode ser nulo
  emailVerifiedAt?: Date | null;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional() // Opcional
  rememberToken?: string | null;

  @IsOptional() // Opcional, será gerado automaticamente pelo banco
  createdAt?: Date;

  @IsOptional() // Opcional, será gerado automaticamente pelo banco
  updatedAt?: Date;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsString()
  @IsOptional()
  level: string = 'user'; // Valor padrão caso não seja informado

  @IsInt()
  @IsOptional() // Opcional, mas um valor será atribuído automaticamente pelo banco
  active: number = 0; // Valor padrão caso não seja informado
}
