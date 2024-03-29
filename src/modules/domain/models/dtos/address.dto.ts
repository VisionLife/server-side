import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Address {
    @ApiProperty({
      description: 'Company street',
      example: 'Av. X',
    })
    @IsNotEmpty()
    street: string;
  
    @ApiProperty({
      description: 'Company number',
      example: '20',
    })
    @IsNotEmpty()
    number: number;
  
    @ApiProperty({
      description: 'Company state',
      example: 'RS',
    })
    @IsNotEmpty()
    state: string;
  
    @ApiProperty({
      description: 'Company city',
      example: 'Lajeado',
    })
    @IsNotEmpty()
    city: string;

    @ApiProperty({
      description: 'Company city',
      example: 'Lajeado',
    })
    @IsNotEmpty()
    zipCode: string;
  }