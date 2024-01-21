import { BaseRepository } from "src/utils/repositoy.generic";
import { User, UserSchema } from "./user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserStatus } from "src/utils/const";
import { HttpException, HttpStatus } from "@nestjs/common";


export class UserRepository extends BaseRepository<User , CreateUserDto , UpdateUserDto >{

    constructor(@InjectModel(User.name) private readonly userModel : Model<User>) {
        super(userModel)
    }

    async findByUsernameQuery(username: string): Promise<User> {
        return await this.userModel.findOne({ username }).exec();
      }

    async changeUserStatus(id: number, status: UserStatus) : Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, {
            status,
        }, {new: true})
    }

    async registerUser(userToCreate : CreateUserDto): Promise<User>{
        const { email } = userToCreate;
        const user = await this.userModel.findOne({ email });
        if (user) {
          throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(userToCreate);
        await createdUser.save();
        return createdUser;
    }
}