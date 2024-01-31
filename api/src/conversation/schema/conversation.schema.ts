import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Theme } from 'src/utils/const';
import { Message } from './message.schema';

@Schema({ timestamps: true })
export class Conversation {
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true }])
  members: string[];

  messages?: Message[];

  @Prop({
    type: Object,
  })
  nicknames?: Record<string, string>;

  @Prop({
    type: String,
    required: true,
    default: Theme['DEFAULT'],
    enum: Theme,
  })
  theme: Theme;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'conversation',
});
