import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../../utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional() // Opcional, pois esse campo pode ser nulo
  emailVerifiedAt?: Date | null;

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
  active: number = 1; // Valor padrão caso não seja informado
}
