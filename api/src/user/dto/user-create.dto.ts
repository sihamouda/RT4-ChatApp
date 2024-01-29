import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import Timezone from 'timezone-enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  // @IsNotEmpty()
  // @IsEnum(Timezone)
  // timzeone: string;

  imagePath?: string;
}
