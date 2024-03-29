import { DataSource } from 'typeorm';
import { User } from '../models/entities/user.entity';
import { Domain } from '../../domain/models/entities/domain.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
