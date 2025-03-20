import { HttpStatus, Injectable, NestMiddleware, UnprocessableEntityException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ValidateRegisterPasswordMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const { password, repeatPassword } = req.body;

        const hasUppercase = /[A-Z]/;
        const hasLowercase = /[a-z]/;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

        let errorMessage: string | null = null;
        
        if (!password) {
            errorMessage = 'password must be filled';
        }
        else if (!repeatPassword) {
            errorMessage = 'repeatPassword must be filled';
        }
        else if (password.length < 8) {
            errorMessage = 'password must be 8 characters long';
        }    
        else if (password !== repeatPassword) {
          errorMessage = 'password must be the same';
        } else if (!hasUppercase.test(password)) {
          errorMessage = 'the password must have a capital letter';
        } else if (!hasLowercase.test(password)) {
          errorMessage = 'the password must have a lowercase letter';
        } else if (!hasNumber.test(password)) {
          errorMessage = 'the password must have a number';
        } else if (!hasSpecialChar.test(password)) {
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