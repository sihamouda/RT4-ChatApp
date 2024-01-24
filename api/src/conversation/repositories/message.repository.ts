import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../utils/generics/repositoy.generic';
import { MessageCreateDto, MessageUpdateDto } from '../dto/message.dto';
import { Message } from '../schema/message.schema';
import { Model } from 'mongoose';

export class MessageRepository extends BaseRepository<
  Message,
  MessageCreateDto,
  MessageUpdateDto
> {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
  ) {
    super(messageModel);
  }
}
