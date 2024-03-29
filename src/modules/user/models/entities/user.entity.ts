import { hashSync } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Domain } from '../../../domain/models/entities/domain.entity';
import { UserRoles } from '../enums/user.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 75 })
  name: string;

  @Column({ length: 80, unique: true })
  email: string;

  @Column({ length: 60 })
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.OPERATOR })
  role: UserRoles;

  @ManyToOne(() => Domain, { eager: true })
  domain: Domain;

  @Column()
  isActive: boolean;

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = hashSync(password || this.password, process.env.HASH_SALT);
  }
}
