import { SessionService } from './../session/session.service';
import { MailService } from './../mail/mail.service';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { HttpStatus, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { RoleEnum } from 'src/roles/roles.enum';
import { UserService } from '../users/users.service';
import User from '../users/entities/user.entity';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import ms from 'ms';
import Session from '../session/entities/session.entity';
import { ProviderEnum } from './auth-providers.enum';
import { SocialInterface } from '../social/interfaces/social.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
    private configService: ConfigService<AllConfigType>,
    private mailService: MailService
  ) {}

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const user = await this.userService.create({
      ...dto,
      email: dto.email,
      active: 0,
      level: RoleEnum.USER,
      provider: ProviderEnum.EMAIL,
      socialId: null,
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

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'not found'
        }
      });
    }

    if (user.active != 1) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'user not verified',
        },
      });
    }

    if (!user.password) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrect Password'
        }
      });
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrect Password',
        },
      });
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    
    const session = await this.sessionService.create({
      user,
      hash
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      level: user.level,
      sessionId: session.id,
      hash,
    })


    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    }
  }

  async validateSocialLogin(
    authProvider: ProviderEnum,
    socialData: SocialInterface
  ): Promise<LoginResponseDto>{
    let user: User | null = null;
    const socialEmail = socialData.email?.toLowerCase();
    let userByEmail: User | null = null;

    if (socialEmail) {
      userByEmail = await this.userService.findByEmail(socialEmail);
    }

    if (socialData.id) {
      user = await this.userService.findBySocialIdAndProvider({
        socialId: socialData.id,
        provider: authProvider
      });
    }

    if (user) {
      if (socialEmail && !userByEmail) {
        user.email = socialEmail;
      }
      await this.userService.update(user.id, user);
    }
    else if (userByEmail) {
      user = userByEmail;
    }
    else if (socialData.id) {
      const active = 1;

      user = await this.userService.create({
        email: socialEmail ?? "tempOption",
        name: socialData.name ?? 'guest',
        emailVerifiedAt: null,
        password: "re",
        phone: "11-9999999", //TODO: tornar campos de password, phone, etc opcionais e DEFAULT NULL nos DTOs de createUserByOAuth
        socialId: socialData.id,
        level: RoleEnum.USER,
        avatar: "teste-avatar",//testar a busca de avatar do google
        provider: authProvider,
        active
      });
      user = await this.userService.findOne(user.id);
    }

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'user not found'
        }
      })
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    
    const session = await this.sessionService.create({
      user,
      hash
    });

    const { token: jwtToken, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      level: user.level,
      sessionId: session.id,
      hash,
    });

    return {
      refreshToken,
      token: jwtToken,
      tokenExpires,
      user,
    };
  }

  private async getTokensData(data: {
    id: User['id'],
    level: User['level'],
    sessionId: Session['id'],
    hash: Session['hash'];
  }){
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

     const [token, refreshToken] = await Promise.all([
       await this.jwtService.signAsync(
         {
           id: data.id,
           level: data.level,
           sessionId: data.sessionId,
         },
         {
           secret: this.configService.getOrThrow('auth.secret', {
             infer: true,
           }),
           expiresIn: tokenExpiresIn,
         }
       ),
       await this.jwtService.signAsync(
         {
           sessionId: data.sessionId,
           hash: data.hash,
         },
         {
           secret: this.configService.getOrThrow('auth.refreshSecret', {
             infer: true,
           }),
           expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
             infer: true,
           }),
         }
       ),
     ]);
    
    return {
      token,
      refreshToken,
      tokenExpires
    };
  }
}
