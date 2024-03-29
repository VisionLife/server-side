import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { patientProviders } from './patient.providers';
import { PatientController } from '../application/patient.controller';
import { PatientService } from '../usecase/patient.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PatientController],
  providers: [...patientProviders, PatientService],
  exports: [PatientService],
})
export class PatientModule {}