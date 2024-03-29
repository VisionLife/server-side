import { DataSource } from 'typeorm';
import { Domain } from '../models/entities/domain.entity';

export const domainProviders = [
  {
    provide: 'DOMAIN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Domain),
    inject: ['DATA_SOURCE'],
  },
];
