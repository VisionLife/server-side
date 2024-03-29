import { DataSource } from 'typeorm';
import { Form } from '../models/entities/form.entity';

export const formProviders = [
  {
    provide: 'FORM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Form),
    inject: ['DATA_SOURCE'],
  },
];
