import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadService } from './upload.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [ConfigService],
  exports: [UploadService],
})
export class UploadModule {}
