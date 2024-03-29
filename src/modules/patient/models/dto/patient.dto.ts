import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PatientDTO {

  id: number;
  
  @ApiProperty({
    description: 'Patient\'s name!',
    example: 'John Doe',
  })
  @IsNotEmpty()
  completeName: string;

  @ApiProperty({
    description: 'Patient\'s birth day!',
    example: '0000-00-00',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  birthDate: Date;

  age: number;

  @ApiProperty({
    description: 'Patient\'s education level!',
    example: 'Undergraduate',
  })
  @IsNotEmpty()
  educationLevel: string;

  @ApiProperty({
    description: 'Patient\'s email!',
    example: 'johndoe@email.com',
  })
  email: string;
  
  @ApiProperty({
    description: 'Patient\'s phone!',
    example: '(51)999999999',
  })
  @IsNotEmpty()
  phone: string;
}
