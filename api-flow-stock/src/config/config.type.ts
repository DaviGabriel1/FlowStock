/* eslint-disable prettier/prettier */
import { MailConfig } from "src/modules/mail/config/mail-config.type";
import { AuthConfig } from "../modules/auth/config/auth-config.type";
import { AppConfig } from "./app-config.type";

export type AllConfigType = {
    app: AppConfig,
    auth: AuthConfig,
    mail: MailConfig,
}