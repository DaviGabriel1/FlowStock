/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRegisterLoginDto } from "./dto/auth-register-login.dto";
import { AuthConfirmEmailDto } from "./dto/auth-confirm-email.dto";

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('email/register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() authRegisterDTO: AuthRegisterLoginDto): Promise<void> {
    return this.authService.register(authRegisterDTO);
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(
    @Body() authConfirmEmailDto: AuthConfirmEmailDto
  ): Promise<void> {
    return this.authService.confirmEmail(authConfirmEmailDto.hash);
  }

  @Post('email/confirm/new')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmNewEmail(
    @Body() authConfirmEmailDto: AuthConfirmEmailDto
  ): Promise<void> {
    return this.authService.confirmEmail(authConfirmEmailDto.hash);
  }
}