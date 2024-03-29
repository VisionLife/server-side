import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../enums/user.enum';

export class UserDTO {
  @ApiProperty({
    description: 'The name of the User',
    example: 'Jhon Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'solidfy@gmail.com',
  })
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })

  isActive: boolean;
  
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The User role',
    example: 'admin',
  })
  @IsNotEmpty()
  role: UserRoles;

  @ApiProperty({
    description: 'The Domain ID',
    example: '1',
  })

  domainCnpj: string;
}
