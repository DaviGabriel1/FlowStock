import User from '../users/entities/user.entity';
import Session from './entities/session.entity';
import { SessionRepository } from './repositories/session.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  findById(id: Session['id']): Promise<Session | null> {
    return this.sessionRepository.findById(id);
  }

  create(
    data: Omit<Session, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
  ) {
    return this.sessionRepository.create(data);
  }

  update(
    id: Session['id'],
    payload: Partial<
      Omit<Session, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
    >
  ): Promise<Session | null> {
    return this.sessionRepository.update(id, payload);
  }

  deleteById(id: Session['id']): Promise<void> {
    return this.sessionRepository.deleteById(id);
  }

  deleteByUserId(conditions: { userId: User['id'] }): Promise<void> {
    return this.sessionRepository.deleteByUserId(conditions);
  }
}
