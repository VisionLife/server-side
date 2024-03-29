import { DataSource } from 'typeorm';
import { Patient } from '../models/entity/patient.entity';

export const patientProviders = [
  {
    provide: 'PATIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Patient),
    inject: ['DATA_SOURCE'],
  },
];