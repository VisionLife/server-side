import { Patient } from 'src/modules/patient/models/entity/patient.entity';
import { User } from 'src/modules/user/models/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('forms')
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: number;

  @Column()
  examinerId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'examinerId' })
  examiner: User;
  
  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column({ type: 'date' })
  examDate: Date;

  @Column()
  previousExams: string;
  
  @Column({ nullable: true })
  previousExamsTime: string;

  @Column('text', { nullable: true })
  previousExamsObservation: string;

  @Column()
  difficulties: string;

  @Column('text', { nullable: true })
  difficultiesObservation: string;

  @Column()
  corrections: string;

  @Column('text', { nullable: true })
  correctionsObservation: string;

  @Column()
  symptoms: string;

  @Column('text', { nullable: true })
  symptomsObservation: string;

  @Column()
  events: string;
 
  @Column({ nullable: true })
  eventsType: string;

  @Column('text', { nullable: true })
  eventsObservation: string;

  @Column()
  surgery: string;
  
  @Column({ nullable: true })
  surgeryTime: string;

  @Column('text', { nullable: true })
  surgeryObservation: string;

  @Column()
  health: string;

  @Column('text', { nullable: true })
  healthObservation: string;

  @Column()
  history: string;

  @Column('text', { nullable: true })
  historyObservation: string;

  @Column()
  testCorrection: string
  
  @Column()
  testTypeCorrection: string
  
  @Column('text', { nullable: true })
  testCorrectionObservation: string

  @Column()
  testTwoHundredLeftEyeClose: number
  @Column('text', { nullable: true })
  testTwoHundredObservationLeftEyeClose: string
  
  @Column()
  testTwoHundredLeftEyeFar: number
  @Column('text', { nullable: true })
  testTwoHundredObservationLeftEyeFar: string
  
  @Column()
  testOneHundredLeftEyeClose: number
  @Column('text', { nullable: true })
  testOneHundredObservationLeftEyeClose: string
  
  @Column()
  testOneHundredLeftEyeFar: number
  @Column('text', { nullable: true })
  testOneHundredObservationLeftEyeFar: string
  
  @Column()
  testFiftyLeftEyeClose: number
  @Column('text', { nullable: true })
  testFiftyObservationLeftEyeClose: string
  
  @Column()
  testFiftyLeftEyeFar: number
  @Column('text', { nullable: true })
  testFiftyObservationLeftEyeFar: string
  
  @Column()
  testThirtyLeftEyeClose: number
  @Column('text', { nullable: true })
  testThirtyObservationLeftEyeClose: string
  
  @Column()
  testThirtyLeftEyeFar: number
  @Column('text', { nullable: true })
  testThirtyObservationLeftEyeFar: string
  
  @Column()
  testTwentyLeftEyeClose: number
  @Column('text', { nullable: true })
  testTwentyObservationLeftEyeClose: string
  
  @Column()
  testTwentyLeftEyeFar: number
  @Column('text', { nullable: true })
  testTwentyObservationLeftEyeFar: string
  
  @Column()
  testTwoHundredRightEyeClose: number
  @Column('text', { nullable: true })
  testTwoHundredObservationRightEyeClose: string
  
  @Column()
  testTwoHundredRightEyeFar: number
  @Column('text', { nullable: true })
  testTwoHundredObservationRightEyeFar: string
  
  @Column()
  testOneHundredRightEyeClose: number
  @Column('text', { nullable: true })
  testOneHundredObservationRightEyeClose: string
  
  @Column()
  testOneHundredRightEyeFar: number
  @Column('text', { nullable: true })
  testOneHundredObservationRightEyeFar: string
  
  @Column()
  testFiftyRightEyeClose: number
  @Column('text', { nullable: true })
  testFiftyObservationRightEyeClose: string
  
  @Column()
  testFiftyRightEyeFar: number
  @Column('text', { nullable: true })
  testFiftyObservationRightEyeFar: string
  
  @Column()
  testThirtyRightEyeClose: number
  @Column('text', { nullable: true })
  testThirtyObservationRightEyeClose: string
  
  @Column()
  testThirtyRightEyeFar: number
  @Column('text', { nullable: true })
  testThirtyObservationRightEyeFar: string
  
  @Column()
  testTwentyRightEyeClose: number
  @Column('text', { nullable: true })
  testTwentyObservationRightEyeClose: string
  
  @Column()
  testTwentyRightEyeFar: number
  @Column('text', { nullable: true })
  testTwentyObservationRightEyeFar: string
}
