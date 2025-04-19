import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../src/users/users.module';
import User from '../src/users/entities/user.entity';
import { AuthModule } from '../src/auth/auth.module';
import authConfig from '../src/auth/config/auth.config';
import appConfig from '../src/config/app.config';
import mailConfig from '../src/mail/config/mail.config';
import databaseConfig from '../src/database/config/database.config';
import { SessionModule } from '../src/session/session.module';
import Session from '../src/session/entities/session.entity';
import { AuthGoogleModule } from '../src/auth-google/auth-google.module';
import googleConfig from '../src/auth-google/config/google.config';
import { ProductModule } from '../src/product/product.module';
import Product from '../src/product/entities/product.entity';
import s3Config from '../src/upload/config/s3.config';
import { ThrottlerModule } from '@nestjs/throttler';

describe('productsController (e2e)', () => {
  let app: INestApplication;

  // Increase the timeout for the entire test suite
  jest.setTimeout(10000); // Set timeout to 10 seconds

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
          database: process.env.TEST_MYSQL_DATABASE,
          entities: [User, Session, Product],
          synchronize: true,
          //dropSchema: true,
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
            },
          ],
        }),
        UsersModule,
        AuthModule,
        SessionModule,
        AuthGoogleModule,
        ProductModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/products (POST)', () => {
    const id = 1;
    const productMock = {
      //TODO: factory para criação de objetos
      name: 'Test Product',
      description: 'This is a test product',
      price: 100.0,
      stock: 10,
      user: {
        id,
      },
    };
    it('deve criar o produto com sucesso', async () => {
      const response = await request(app.getHttpServer())
        .post('/products')
        .send(productMock)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({
        name: productMock.name,
        description: productMock.description,
        price: productMock.price,
        stock: productMock.stock,
        user: { id: productMock.user.id },
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
      //expect.objectContaining()
    }, 10000);
  });

  describe('/products?userId (GET)', () => {
    const id = 1;
    const productMock = {
      //TODO: factory para criação de objetos
      name: 'Test Product',
      description: 'This is a test product',
      price: 100.0,
      stock: 10,
      user: {
        id,
      },
    };
    it('deve buscar todos os produtos relacionados a um usuários', async () => {
      await request(app.getHttpServer())
        .post('/products')
        .send(productMock)
        .expect(HttpStatus.CREATED);

      await request(app.getHttpServer())
        .post('/products')
        .send(productMock)
        .expect(HttpStatus.CREATED);

      const response = await request(app.getHttpServer())
        .get(`/products/by-user?userId=${id}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: productMock.name,
            description: productMock.description,
            price: productMock.price.toString(), // Adjusted to match the string format
            stock: productMock.stock,
            user: expect.objectContaining({ id: productMock.user.id }),
          }),
        ])
      );
    });
  });
});
