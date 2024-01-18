import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcryptjs';
import { ObjectId } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    maxLength: 255,
    default: 'GMT',
  })
  timezone: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
  friendsWith: ObjectId[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Conversation' }])
  conversations: ObjectId[];

  messages?: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  if (!this.password) {
    return next();
  }

  try {
    const salt: number = parseInt(process.env.SALT_LENGTH, 10) || 10;
    const hashedPassword = hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'sender',
});
