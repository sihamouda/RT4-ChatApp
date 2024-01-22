import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{ schema: UserSchema, name: User.name }]),
  ],
  controllers: [UserController],
})
export class UserModule {}
