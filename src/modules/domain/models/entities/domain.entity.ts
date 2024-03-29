import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('domains')
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 75 })
  companyName: string;

  @Column()
  tradingName: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  address: string;

  @Column({ default: 0 })
  managerId: number;
}
