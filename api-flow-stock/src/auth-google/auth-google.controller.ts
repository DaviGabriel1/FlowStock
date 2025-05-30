import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginResponseDto } from '../auth/dto/login-response.dto';
import { AuthGoogleLoginDto } from './dto/AuthGoogleLoginDto.dto';
import { AuthGoogleService } from './auth-google.service';
import { ProviderEnum } from '../auth/auth-providers.enum';
import { ApiOperation } from '@nestjs/swagger';

@Controller({
  path: 'auth/google',
  version: '1',
})
export class AuthGoogleController {
  constructor(
    private readonly authService: AuthService,
    private readonly authGoogleService: AuthGoogleService
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'valida o token google enviado e retorna credenciais',
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: AuthGoogleLoginDto): Promise<LoginResponseDto> {
    const socialData = await this.authGoogleService.getProfileByToken(loginDto);
    return this.authService.validateSocialLogin(
      ProviderEnum.GOOGLE,
      socialData
    );
  }
}
