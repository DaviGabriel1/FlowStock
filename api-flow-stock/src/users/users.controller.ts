import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './users.service';
import User from './entities/user.entity';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id do usuário',
  })
  @ApiOperation({
    summary: 'retorna usuário associado ao id',
  })
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get()
  @ApiOperation({
    summary: 'retorna todos os usuários cadastrados',
  })
  async getFindAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
