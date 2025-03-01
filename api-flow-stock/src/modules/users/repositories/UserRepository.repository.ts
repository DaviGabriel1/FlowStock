import { DataSource, Repository } from 'typeorm';
import User from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async findByEmail(email: User['email']): Promise<User | null> {
    if (!email) return null;

    /*return this.createQueryBuilder('users') método alternativo com query builder para consultas complexas
      .where('users.email = :email', { email })
      .getMany();*/

    return this.findOne({ where: { email } });
  }
}
