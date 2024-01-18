import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

enum MessageStatus {
  SENT = 'sent',
  DELIVIERED = 'deliviered',
  SEEN = 'seen',
}
enum MessageType {
  TEXT = 'text',
}

@Schema({ timestamps: true })
export class Message {
  @Prop({
    type: String,
    required: true,
    enum: MessageType,
  })
  type: MessageType;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  sender: ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  })
  conversation: ObjectId;

  @Prop({
    type: String,
    required: true,
    enum: MessageStatus,
  })
  status: MessageStatus;
}

export const MessageSchema = SchemaFactory.createForClass(Message);