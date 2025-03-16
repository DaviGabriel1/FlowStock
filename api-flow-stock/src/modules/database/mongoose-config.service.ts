import mongooseAutoPopulate from 'mongoose-autopopulate';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AllConfigType } from 'src/config/config.type';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get('mongodb.uri', { infer: true }),
      dbName: this.configService.get('mongodb.name', { infer: true }),
      user: this.configService.get('mongodb.username', { infer: true }),
      pass: this.configService.get('mongodb.password', { infer: true }),
      connectionFactory(connection) {
        connection.plugin(mongooseAutoPopulate);
        return connection;
      },
    };
  }
}
