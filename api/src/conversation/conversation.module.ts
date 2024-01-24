import { Module } from '@nestjs/common';
import { MessageRepository } from './repositories/message.repository';
import { ConversationRepository } from './repositories/conversation.repository';

@Module({
  providers: [MessageRepository, ConversationRepository],
})
export class ConversationModule {}
