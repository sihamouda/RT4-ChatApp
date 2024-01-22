import { BaseRepository } from 'src/utils/generics/repositoy.generic';
import { User } from './schema/user.schema';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserStatus } from 'src/utils/const';

export class UserRepository extends BaseRepository<
  User,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  async findByUsernameQuery(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  async changeUserStatus(id: number, status: UserStatus): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true },
    );
  }
}
