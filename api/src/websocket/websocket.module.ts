import { Module } from '@nestjs/common';
import { ConversationGateway } from './conversation/conversation.gateway';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
  imports: [ConversationModule],
  providers: [ConversationGateway],
})
export class WebsocketModule {}
