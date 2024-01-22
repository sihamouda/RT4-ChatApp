import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import Timezone from 'timezone-enum';

export class UserCreateDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsEnum(Timezone)
  timzeone: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  imagePath: string;
}
