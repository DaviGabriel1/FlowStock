import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class AuthEmailLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(lowerCaseTransformer)
  email: string;

  @IsNotEmpty()
  password: string;
}
