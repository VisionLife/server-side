import { Domain } from 'src/modules/domain/models/entities/domain.entity';
import { DataSource } from 'typeorm';
import { User } from '../modules/user/models/entities/user.entity';
import { Patient } from 'src/modules/patient/models/entity/patient.entity';
import { Form } from 'src/modules/form/models/entities/form.entity';
import appEnv from 'src/appEnv';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: appEnv.DB_CONNECTION as 'mysql',
        host: appEnv.DB_HOST,
        port: Number(appEnv.DB_PORT),
        username: appEnv.DB_USERNAME,
        password: appEnv.DB_PASSWORD,
        database: appEnv.DB_DATABASE,
        entities: [User, Domain, Patient, Form],
        synchronize: true, // <--- must not be set true in production
      });

      return dataSource.initialize();
    },
  },
];
