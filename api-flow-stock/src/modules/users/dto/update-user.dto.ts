import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsEnum,
} from 'class-validator';
import { RoleEnum } from 'src/roles/roles.enum';

export class UpdateUserDTO{
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

  @IsNotEmpty()
  @Transform(({ value }) => value || RoleEnum.USER)
  @IsEnum(RoleEnum, {
    message: `O campo "level" deve ser: ${Object.values(RoleEnum).join(', ')}`,
  })
  level: RoleEnum;

  @IsInt()
  @IsOptional() // Opcional, mas um valor será atribuído automaticamente pelo banco
  active: number = 0; // Valor padrão caso não seja informado
}
