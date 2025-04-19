import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('email/register')
  @ApiOperation({
    summary:
      'salva usuário e envia E-mail de confirmação com token de autenticação',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() authRegisterDTO: AuthRegisterLoginDto): Promise<void> {
    return this.authService.register(authRegisterDTO);
  }

  @Post('email/confirm')
  @ApiOperation({
    summary: 'valida hash e o payload',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(
    @Body() authConfirmEmailDto: AuthConfirmEmailDto
  ): Promise<void> {
    return this.authService.confirmEmail(authConfirmEmailDto.hash);
  }

  @Post('email/confirm/new')
  @ApiOperation({
    summary: 'valida hash e o payload',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmNewEmail(
    @Body() authConfirmEmailDto: AuthConfirmEmailDto
  ): Promise<void> {
    return this.authService.confirmEmail(authConfirmEmailDto.hash);
  }

  @Post('email/login')
  @ApiOperation({
    summary: 'cria sessão com hash e retorna credenciais',
  })
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return this.authService.validateLogin(loginDto);
  }
}
