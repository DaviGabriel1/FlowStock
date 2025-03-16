import { registerAs } from '@nestjs/config';

import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import { DatabaseConfig } from './database-config.type';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {

  //@ValidateIf((envValues) => !envValues.MYSQL_URL)
  //@IsString()
  MYSQL_TYPE: string;

  //@ValidateIf((envValues) => !envValues.MYSQL_URL)
  //@IsString()
  MYSQL_HOST: string;

  //@ValidateIf((envValues) => !envValues.MYSQL_URL)
  //@IsInt()
  //@Min(0)
 // @Max(65535)
  MYSQL_PORT: number;

  //@ValidateIf((envValues) => !envValues.MYSQL_URL)
  //@IsString()
    MYSQL_PASSWORD: string;
    
  //@ValidateIf((envValues) => !envValues.MYSQL_URL)
  //@IsString()
  MYSQL_USERNAME: string;

  MYSQL_SYNCHRONIZE: boolean;

}

export default registerAs<DatabaseConfig>('database', () => {
    //validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        type: process.env.MYSQL_TYPE,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT
            ? parseInt(process.env.MYSQL_PORT, 10)
            : 5432,
        password: process.env.MYSQL_PASSWORD,
      username: process.env.MYSQL_USERNAME,
        synchronize: process.env.MYSQL_SYNCHRONIZE === 'true',
    }
});
