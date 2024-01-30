import { IsNotEmpty, IsOptional } from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Theme } from '../../utils/const';

export class ConversationCreateDto {
  @ApiProperty({ type: Array })
  @IsNotEmpty()
  members: string[];
}

export class ConversationUpdateDto extends PartialType(ConversationCreateDto) {
  @ApiPropertyOptional({ type: Array })
  @IsOptional()
  messages?: string[];

  @ApiPropertyOptional({ type: Array })
  @IsOptional()
  nicknames?: Record<string, string>;

  @ApiPropertyOptional({ enum: Theme })
  @IsOptional()
  theme: Theme;
}
