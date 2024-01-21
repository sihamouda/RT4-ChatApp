import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Theme } from 'src/utils/const';



@Schema({ timestamps: true })
export class Conversation {
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true }])
  members: ObjectId[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Message' }])
  messages?: ObjectId[];

  @Prop({
    type: Object,
  })
  nicknames?: [ObjectId, string][];

  @Prop({
    type: String,
    required: true,
    default: Theme['DEFAULT'],
    enum: Theme,
  })
  theme: Theme;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
