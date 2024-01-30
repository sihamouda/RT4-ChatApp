import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { MessageStatus, MessageType } from 'src/utils/const';

@Schema({ timestamps: true })
export class Message {
  @Prop({
    type: String,
    required: true,
    enum: MessageType,
  })
  type: MessageType;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  sender: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  })
  conversation: string;

  @Prop({
    type: String,
    required: true,
    enum: MessageStatus,
  })
  status: MessageStatus;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
