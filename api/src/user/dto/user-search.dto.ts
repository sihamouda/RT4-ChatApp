import { UserCreateDto } from './user-create.dto';
import { PartialType, PickType } from '@nestjs/mapped-types';

export class UserSearchDto extends PartialType(
  PickType(UserCreateDto, ['email', 'username'] as const),
) {}
