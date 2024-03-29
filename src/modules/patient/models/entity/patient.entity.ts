import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 75 })
  completeName: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column()
  age: number;

  @Column({ length: 75 })
  educationLevel: string;

  @Column('text')
  email: string;
  
  @Column()
  phone: string;
}