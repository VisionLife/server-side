import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { domainProviders } from './domain.providers';
import { DomainController } from '../application/domain.controller';
import { DomainService } from '../usecase/domain.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DomainController],
  providers: [...domainProviders, DomainService],
  exports: [DomainService],
})
export class DomainModule {}
