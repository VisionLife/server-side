import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Address } from './address.dto';

export class DomainDTO {

  id: number;

  @ApiProperty({
    description: 'The company name of the Domain',
    example: 'Ótica X LTDA',
  })
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    description: 'The trading name of the Domain',
    example: 'Ótica X',
  })
  @IsNotEmpty()
  tradingName: string;

  @ApiProperty({
    description: 'Company CNPJ',
    example: 'XX.XXX.XXX/XXXX-XX',
  })
  @IsNotEmpty()
  cnpj: string;

  address: string;
  managerId: number;
}
