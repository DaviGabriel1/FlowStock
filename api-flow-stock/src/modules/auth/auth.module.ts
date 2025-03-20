import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { SessionModule } from '../session/session.module';
import { ValidateRegisterPasswordMiddleware } from './middlewares/validate-register-password.middleware';

@Module({
  imports: [UsersModule, MailModule, SessionModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateRegisterPasswordMiddleware)
      .forRoutes({ path: 'auth/email/register', method: RequestMethod.POST });
  }


}
