import { Module } from '@nestjs/common';
import { MessageRepository } from './repositories/message.repository';
import { ConversationRepository } from './repositories/conversation.repository';
import { Message, MessageSchema } from './schema/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from './schema/conversation.schema';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';
import { UserModule } from '../user/user.module';
import { ConversationController } from './controllers/conversation.controller';
import { MessageController } from './controllers/message.controller';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { schema: MessageSchema, name: Message.name },
      { schema: ConversationSchema, name: Conversation.name },
    ]),
  ],
  providers: [
    MessageRepository,
    ConversationRepository,
    MessageService,
    ConversationService,
  ],
  controllers: [MessageController, ConversationController],
  exports: [MessageService],
})
export class ConversationModule {}
