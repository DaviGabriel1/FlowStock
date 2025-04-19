import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DefaultResponseDto {
  @IsInt()
  @IsNotEmpty()
  status: number;
  @IsString()
  @IsNotEmpty()
  message: string;
}
