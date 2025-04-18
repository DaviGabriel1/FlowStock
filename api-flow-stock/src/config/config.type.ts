/* eslint-disable prettier/prettier */
import { MailConfig } from 'src/mail/config/mail-config.type';
import { AuthConfig } from '../auth/config/auth-config.type';
import { AppConfig } from './app-config.type';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { GoogleConfig } from 'src/auth-google/config/google-config.type';
import { S3Type } from 'src/upload/config/s3-config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  mail: MailConfig;
  google: GoogleConfig;
  mongodb: DatabaseConfig;
  mysql: DatabaseConfig;
  s3: S3Type;
};
