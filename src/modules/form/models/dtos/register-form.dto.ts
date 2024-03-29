import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class RegisterFormDTO {

  id: string;

  @IsNotEmpty()
  patientId: number;

  @IsNotEmpty()
  examinerId: number;

  @ApiProperty({
    description: 'Exam application date!',
    example: '0000-00-00',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  examDate: Date;

  @IsNotEmpty()
  previousExams: string;
  previousExamsTime: string;
  previousExamsObservation: string;
  
  @IsNotEmpty()
  history: string;
  historyObservation: string;

  @IsNotEmpty()
  testCorrection: string
  testTypeCorrection: string
  testCorrectionObservation: string

  @IsNotEmpty()
  difficulties: string;
  difficultiesObservation: string;

  @IsNotEmpty()
  corrections: string;
  correctionsObservation: string;

  @IsNotEmpty()
  symptoms: string;
  symptomsObservation: string;

  @IsNotEmpty()
  events: string;
  eventsType: string;
  eventsObservation: string;

  @IsNotEmpty()
  surgery: string;
  surgeryTime: string;
  surgeryObservation: string;

  @IsNotEmpty()
  health: string;
  healthObservation: string;

  @IsNotEmpty()
  testTwoHundredLeftEyeClose: number
  testTwoHundredObservationLeftEyeClose: string
  
  @IsNotEmpty()
  testTwoHundredLeftEyeFar: number
  testTwoHundredObservationLeftEyeFar: string
  
  @IsNotEmpty()
  testOneHundredLeftEyeClose: number
  testOneHundredObservationLeftEyeClose: string
  
  @IsNotEmpty()
  testOneHundredLeftEyeFar: number
  testOneHundredObservationLeftEyeFar: string
  
  @IsNotEmpty()
  testFiftyLeftEyeClose: number
  testFiftyObservationLeftEyeClose: string
  
  @IsNotEmpty()
  testFiftyLeftEyeFar: number
  testFiftyObservationLeftEyeFar: string
  
  @IsNotEmpty()
  testThirtyLeftEyeClose: number
  testThirtyObservationLeftEyeClose: string
  
  @IsNotEmpty()
  testThirtyLeftEyeFar: number
  testThirtyObservationLeftEyeFar: string
  
  @IsNotEmpty()
  testTwentyLeftEyeClose: number
  testTwentyObservationLeftEyeClose: string
  
  @IsNotEmpty()
  testTwentyLeftEyeFar: number
  testTwentyObservationLeftEyeFar: string
  
  @IsNotEmpty()
  testTwoHundredRightEyeClose: number
  testTwoHundredObservationRightEyeClose: string
  
  @IsNotEmpty()
  testTwoHundredRightEyeFar: number
  testTwoHundredObservationRightEyeFar: string
  
  @IsNotEmpty()
  testOneHundredRightEyeClose: number
  testOneHundredObservationRightEyeClose: string
  
  @IsNotEmpty()
  testOneHundredRightEyeFar: number
  testOneHundredObservationRightEyeFar: string
  
  @IsNotEmpty()
  testFiftyRightEyeClose: number
  testFiftyObservationRightEyeClose: string
  
  @IsNotEmpty()
  testFiftyRightEyeFar: number
  testFiftyObservationRightEyeFar: string
  
  @IsNotEmpty()
  testThirtyRightEyeClose: number
  testThirtyObservationRightEyeClose: string
  
  @IsNotEmpty()
  testThirtyRightEyeFar: number
  testThirtyObservationRightEyeFar: string
  
  @IsNotEmpty()
  testTwentyRightEyeClose: number
  testTwentyObservationRightEyeClose: string
  
  @IsNotEmpty()
  testTwentyRightEyeFar: number
  testTwentyObservationRightEyeFar: string
}
