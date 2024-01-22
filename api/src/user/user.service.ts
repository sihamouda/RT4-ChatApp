import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserCreateDto as UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto as UserUpdateDto } from './dto/user-update.dto';
import { UserRepository } from './user.repository';
import { BaseService } from '../utils/generics/service.generic';

@Injectable()
export class UserService extends BaseService<
  User,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsernameQuery(username);
  }
}
