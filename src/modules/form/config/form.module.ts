import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/config/user.module';
import { DatabaseModule } from '../../../database/database.module';
import { FormController } from '../application/form.controller';
import { FormService } from '../usecase/form.service';
import { formProviders } from './form.providers';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [FormController],
  providers: [...formProviders, FormService],
  exports: [FormService],
})
export class FormModule {}
