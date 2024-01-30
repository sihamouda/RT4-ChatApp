import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../utils/generics/repositoy.generic';
import {
  ConversationCreateDto,
  ConversationUpdateDto,
} from '../dto/conversation.dto';
import { Conversation } from '../schema/conversation.schema';
import { Model } from 'mongoose';

export class ConversationRepository extends BaseRepository<
  Conversation,
  ConversationCreateDto,
  ConversationUpdateDto
> {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Conversation>,
  ) {
    super(conversationModel);
  }
}
