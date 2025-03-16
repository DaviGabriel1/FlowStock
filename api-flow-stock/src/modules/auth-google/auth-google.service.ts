import { ConfigService } from '@nestjs/config';
import { AuthGoogleLoginDto } from "./dto/AuthGoogleLoginDto.dto";
import { AllConfigType } from 'src/config/config.type';
import { OAuth2Client } from 'google-auth-library';
import { SocialInterface } from '../social/interfaces/social.interface';
import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class AuthGoogleService {
    private google: OAuth2Client;
    constructor(
        private configService: ConfigService<AllConfigType>
    ) { 
        this.google = new OAuth2Client(
            configService.get('google.clientId', { infer: true }),
            configService.get('google.clientSecret', { infer: true})
        );
    }


    async getProfileByToken(loginDto: AuthGoogleLoginDto): Promise<SocialInterface> {
        const ticket = await this.google.verifyIdToken({
            idToken: loginDto.idToken,
            audience: [
                this.configService.getOrThrow('google.clientId', {infer:true})
            ]
        });

        const data = ticket.getPayload();

        if (!data) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    user: 'wrong token'
                }
            });
        }

        const name = `${data.given_name} ${data.family_name}`;

        return {
            id: data.sub,
            email: data.email,
            name
        }
    }
}