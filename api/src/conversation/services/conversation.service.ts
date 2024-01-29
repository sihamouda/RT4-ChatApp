import { Injectable } from '@nestjs/common';
import { BaseService } from '../../utils/generics/service.generic';
import {
  ConversationCreateDto,
  ConversationUpdateDto,
} from '../dto/conversation.dto';
import { Conversation } from '../schema/conversation.schema';
import { ConversationRepository } from '../repositories/conversation.repository';
import { OnEvent } from '@nestjs/event-emitter';
import { UserService } from '../../user/user.service';

@Injectable()
export class ConversationService extends BaseService<
  Conversation,
  ConversationCreateDto,
  ConversationUpdateDto
> {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly userService: UserService,
  ) {
    super(conversationRepository);
  }

  @OnEvent('create-conversation')
  async createAll(userId: string): Promise<void> {
    const allUsers = await this.userService.findAll();
    const otherUsers = allUsers.filter((user) => user.id !== userId);
    if (otherUsers.length > 0) {
      await Promise.all(
        otherUsers.map(async (user) => {
          await this.conversationRepository.createQuery({
            members: [userId, user.id],
          });
        }),
      );
    }
  }
}
