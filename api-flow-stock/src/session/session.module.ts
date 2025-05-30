import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionRepository } from './repositories/session.repository';
import Session from './entities/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionService, SessionRepository],
  exports: [SessionService],
})
export class SessionModule {}
