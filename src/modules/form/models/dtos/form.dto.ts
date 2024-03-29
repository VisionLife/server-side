import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Patient } from 'src/modules/patient/models/entity/patient.entity';
import { User } from 'src/modules/user/models/entities/user.entity';

export class FormDTO {

  id: string;

  patient: Patient;

  examiner: User;

  examDate: Date;
  previousExams: string;
  previousExamsTime: string;
  previousExamsObservation: string;
  difficulties: string;
  difficultiesObservation: string;
  corrections: string;
  correctionsObservation: string;
  symptoms: string;
  symptomsObservation: string;
  accidents: string;
  accidentsObservation: string;
  surgery: string;
  surgeryObservation: string;
  health: string;
  healthObservation: string;
  testTwoHundredLeftEye: number;
  testTwoHundredObservationLeftEye: string;
  testOneHundredLeftEye: number;
  testOneHundredObservationLeftEye: string;
  testFiftyLeftEye: number;
  testFiftyObservationLeftEye: string;
  testThirtyLeftEye: number;
  testThirtyObservationLeftEye: string;
  testTwentyLeftEye: number;
  testTwentyObservationLeftEye: string;
  testTwoHundredRightEye: number;
  testTwoHundredObservationRightEye: string;
  testOneHundredRightEye: number;
  testOneHundredObservationRightEye: string;
  testFiftyRightEye: number;
  testFiftyObservationRightEye: string;
  testThirtyRightEye: number;
  testThirtyObservationRightEye: string;
  testTwentyRightEye: number;
  testTwentyObservationRightEye: string;
}
