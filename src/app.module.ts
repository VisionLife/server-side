import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/config/user.module';
import { DomainModule } from './modules/domain/config/domain.module';
import { PatientModule } from './modules/patient/config/patient.module';
import { FormModule } from './modules/form/config/form.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, DomainModule, PatientModule, FormModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
