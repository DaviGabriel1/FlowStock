import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { IPasswordParams } from '../interfaces/IPasswordParams.interface';

@Injectable()
export class ValidateRegisterPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body = req.body as IPasswordParams;

    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

    let errorMessage: string | null = null;

    if (!body.password) {
      errorMessage = 'password must be filled';
    } else if (!body.repeatPassword) {
      errorMessage = 'repeatPassword must be filled';
    } else if (body.password.length < 8) {
      errorMessage = 'password must be 8 characters long';
    } else if (body.password !== body.repeatPassword) {
      errorMessage = 'password must be the same';
    } else if (!hasUppercase.test(body.password)) {
      errorMessage = 'the password must have a capital letter';
    } else if (!hasLowercase.test(body.password)) {
      errorMessage = 'the password must have a lowercase letter';
    } else if (!hasNumber.test(body.password)) {
      errorMessage = 'the password must have a number';
    } else if (!hasSpecialChar.test(body.password)) {
      errorMessage = 'the password must have a special character';
    }

    if (errorMessage) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: errorMessage,
        },
      });
    }
    next();
  }
}
