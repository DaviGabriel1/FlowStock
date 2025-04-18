import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const synchronize = this.configService.get('mysql.synchronize', {
      infer: true,
    });

    return {
      type: this.configService.get('mysql.type', { infer: true }),
      host: this.configService.get('mysql.host', { infer: true }),
      port: this.configService.get('mysql.port', { infer: true }),
      username: this.configService.get('mysql.username', { infer: true }),
      database: this.configService.get('mysql.database', { infer: true }),
      synchronize: synchronize,
    } as TypeOrmModuleOptions;
  }
}
