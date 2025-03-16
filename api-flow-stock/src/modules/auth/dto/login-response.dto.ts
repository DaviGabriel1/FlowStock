import User from "src/modules/users/entities/user.entity";

export class LoginResponseDto {
    token: string;
    refreshToken: string;
    tokenExpires: number;
    user: User;
}