import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { MessageStatus, MessageType } from '../../utils/const';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MessageCreateDto {
  @ApiProperty({ enum: MessageType })
  @IsEnum(MessageType)
  @IsNotEmpty()
  type: MessageType;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  sender: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  conversation: string;

  @ApiProperty({ enum: MessageStatus })
  @IsEnum(MessageStatus)
  @IsNotEmpty()
  status: MessageStatus;
}

export class MessageUpdateDto {
  @ApiPropertyOptional({ enum: MessageStatus })
  @IsEnum(MessageStatus)
  @IsOptional()
  status: MessageStatus;
}
