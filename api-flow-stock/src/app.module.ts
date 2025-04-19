import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import User from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import databaseConfig from './database/config/database.config';
import { SessionModule } from './session/session.module';
import Session from './session/entities/session.entity';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import googleConfig from './auth-google/config/google.config';
import { ProductModule } from './product/product.module';
import Product from './product/entities/product.entity';
import s3Config from './upload/config/s3.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
//import { DatabaseConfig } from './modules/database/config/database-config.type';
//import { MongooseConfigService } from './modules/database/mongoose-config.service';
//import { DataSource, DataSourceOptions } from 'typeorm';
// import { MongooseModule } from '@nestjs/mongoose';

/*const infrastructureDatabaseModule = (databaseConfig() as DatabaseConfig).type === 'mongodb'
  ? MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    })
  : TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    });*/
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        authConfig,
        appConfig,
        mailConfig,
        databaseConfig,
        googleConfig,
        s3Config,
      ],
      envFilePath: ['.env'],
    }),
    //infrastructureDatabaseModule,
    TypeOrmModule.forRoot({
      //TODO: databaseModuleConfig
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, Session, Product],
      synchronize: process.env.MYSQL_SYNCHRONIZE
        ? process.env.MYSQL_SYNCHRONIZE == 'true'
        : true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: process.env.RATE_LIMIT_TTL
            ? parseInt(process.env.RATE_LIMIT_TTL)
            : 60,
          limit: process.env.RATE_LIMIT_LIMIT
            ? parseInt(process.env.RATE_LIMIT_LIMIT)
            : 1,
          blockDuration: process.env.RATE_BLOCK_DURATION
            ? parseInt(process.env.RATE_BLOCK_DURATION)
            : 10000,
        },
      ],
    }),
    UsersModule,
    AuthModule,
    SessionModule,
    AuthGoogleModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    TypeOrmConfigService,
    {
      provide: APP_GUARD, //TODO: validar rateLimiting
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  constructor() {}
}
