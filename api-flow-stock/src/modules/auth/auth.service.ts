import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { RoleEnum } from 'src/roles/roles.enum';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<AllConfigType>
  ) {}

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const user = await this.userService.create({
      ...dto,
      email: dto.email,
      level: RoleEnum.USER,
    });
    const hash = await this.jwtService.signAsync(
      {
        confirmEmailUserId: user.id,
      },
      {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
          infer: true,
        }),
      }
    );
    console.log(hash);
    //todo: envio de email com hash para cadastro
  }
}
