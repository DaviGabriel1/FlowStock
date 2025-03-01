/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import User from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getFindAll(): Promise<User[] | null> {
    return this.userService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    return this.userService.create(createUserDto);
  }
}
