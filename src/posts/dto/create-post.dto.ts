import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Posts title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Posts content' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Users email' })
  @IsEmail()
  authorEmail: string;
}
