/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './repositories/UserRepository.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserRepository,UserService],
  exports: [UserService],
})
export class UsersModule {}
