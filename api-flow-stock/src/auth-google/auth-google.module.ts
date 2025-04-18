import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleController } from './auth-google.controller';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthGoogleService], //AuthGoogleService
  exports: [AuthGoogleService], //AuthGoogleService
  controllers: [AuthGoogleController], //AuthGoogleController
})
export class AuthGoogleModule {}
