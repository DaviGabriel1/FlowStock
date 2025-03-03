import { MailService } from './../mail/mail.service';
import { HttpStatus, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { RoleEnum } from 'src/roles/roles.enum';
import { UserService } from '../users/users.service';
import User from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<AllConfigType>,
    private mailService: MailService
  ) {}

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const user = await this.userService.create({
      ...dto,
      email: dto.email,
      active: 0,
      level: RoleEnum.USER,
      avatar: 'teste-avatar', //substitui pelo id do avatar default do cloudnary
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
    await this.mailService.userSignUp({
      to: dto.email,
      data: {
        hash,
      },
    });
  }

  async confirmNewEmail(hash: string): Promise<void> {
    let userId: User['id'];
    let newEmail: User['email'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        confirmEmailUserId: User['id'];
        newEmail: User['email'];
      }>(hash, {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
      });

      userId = jwtData.confirmEmailUserId;
      newEmail = jwtData.newEmail;
    } catch {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: 'invalid hash',
        },
      });
    }

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'user not found',
      });
    }

    user.email = newEmail;
    user.active = 1;

    await this.userService.update(user.id, user);
  }

  async confirmEmail(hash: string): Promise<void> {
    let userId: User['id'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        confirmEmailUserId: User['id'];
      }>(hash, {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
      });

      userId = jwtData.confirmEmailUserId;
    } catch {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: `invalidHash`,
        },
      });
    }

    const user = await this.userService.findOne(userId);

    if (
      !user ||
      user?.active !== 0
    ) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `user not found`,
      });
    }

    user.active = 1;

    await this.userService.update(user.id, user);
  }
}
