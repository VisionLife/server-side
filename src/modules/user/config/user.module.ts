import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { UserController } from '../application/user.controller';
import { userProviders } from './user.providers';
import { UserService } from '../usecase/user.service';
import { DomainModule } from 'src/modules/domain/config/domain.module';

@Module({
  imports: [DatabaseModule, DomainModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
