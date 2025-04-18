import { IsOptional, IsString } from 'class-validator';
import { S3Type } from './s3-config.type';
import { registerAs } from '@nestjs/config';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  s3_REGION: string;

  @IsString()
  @IsOptional()
  s3_BUCKET_NAME: string;

  @IsString()
  @IsOptional()
  s3_ACCESS_KEY_ID: string;

  @IsString()
  @IsOptional()
  s3_SECRET_ACCESS_KEY: string;
}

export default registerAs<S3Type>('s3', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    region: process.env.S3_REGION as string,
    bucketName: process.env.S3_BUCKET_NAME as string,
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  };
});
