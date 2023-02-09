import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User Email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Users full name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Defines whether the user is an admin',
    default: false,
  })
  @IsBoolean()
  admin: boolean;
}
