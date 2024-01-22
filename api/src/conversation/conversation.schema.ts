import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Theme } from 'src/utils/const';

@Schema({ timestamps: true })
export class Conversation {
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true }])
  members: string[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Message' }])
  messages?: string[];

  @Prop({
    type: Object,
  })
  nicknames?: [string, string][];

  @Prop({
    type: String,
    required: true,
    default: Theme['DEFAULT'],
    enum: Theme,
  })
  theme: Theme;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
