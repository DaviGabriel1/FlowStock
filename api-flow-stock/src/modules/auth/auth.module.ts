import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [UsersModule, MailModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
