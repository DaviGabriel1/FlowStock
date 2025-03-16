
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Session from "../entities/session.entity";
import { Repository } from 'typeorm';
import { SessionMapper } from '../mapper/session.mapper';
import User from "src/modules/users/entities/user.entity";

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  async findById(id: Session['id']): Promise<Session | null> {
    const entity = await this.sessionRepository.findOne({
      where: {
        id: Number(id),
      },
    });
    return entity ? SessionMapper.toDomain(entity) : null; // não é necessário um mapper pois não há alteração de dados ou
  }

  async create(
    data: Omit<Session, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
  ): Promise<Session> {
    const entity = this.sessionRepository.create(data);
    await this.sessionRepository.save(entity);
    return entity;
  }

  async update(
    id: Session['id'],
    data: Partial<Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>
  ): Promise<Session | null> {
    const entity = await this.sessionRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!entity) {
      throw new Error('Session not found');
    }

    const updatedEntity = await this.sessionRepository.save(
      this.sessionRepository.create({
        ...SessionMapper.toDomain(entity),
        ...data,
      })
    );
    return SessionMapper.toDomain(updatedEntity);
  }

  async deleteById(id: Session['id']): Promise<void> {
    await this.sessionRepository.softDelete({
      id: Number(id),
    });
  }

  async deleteByUserId(conditions: {userId: User['id']}): Promise<void> {
    await this.sessionRepository.softDelete({
      id: Number(conditions),
    });
  }
}