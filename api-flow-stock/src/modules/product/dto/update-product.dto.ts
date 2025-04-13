import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  sku: string;

  @IsInt()
  @IsOptional()
  quantity: number;

  @IsInt()
  @IsOptional()
  minStock: number;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  imgUrl: string;

  @IsInt()
  @IsOptional()
  deleted: number;
}