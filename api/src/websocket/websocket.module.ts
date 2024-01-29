import { Module } from '@nestjs/common';
import { ConversationGateway } from './conversation/conversation.gateway';
import { ConversationModule } from '../conversation/conversation.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ConversationModule, UserModule],
  providers: [ConversationGateway],
})
export class WebsocketModule {}
