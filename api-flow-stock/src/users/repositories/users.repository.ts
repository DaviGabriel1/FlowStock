import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findByResetToken(token: string): Promise<User | null> {
    return this.repository.findOne({ where: { resetToken: token } });
  }

  async findByConfirmToken(token: string): Promise<User | null> {
    return this.repository.findOne({ where: { confirmToken: token } });
  }
}
