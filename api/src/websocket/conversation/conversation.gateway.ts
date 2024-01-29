import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LoggerService } from '../../logger/logger.service';
import { Namespace, Socket } from 'socket.io';
import { MessageCreateDto } from '../../conversation/dto/message.dto';
import { UserService } from '../../user/user.service';
import { MessageService } from '../../conversation/services/message.service';

@WebSocketGateway({ namespace: 'conversation' })
export class ConversationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly logger: LoggerService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  @WebSocketServer() io: Namespace;

  afterInit(): void {
    this.logger.log('Websocket Gateway initialized', ConversationGateway.name);
  }
  handleConnection(client: Socket): void {
    this.logger.log(
      `user with client id: ${client.id} is connected`,
      ConversationGateway.name,
    );
    this.logger.debug(
      `number of users connected:${this.io.sockets.size}`,
      ConversationGateway.name,
    );
  }
  handleDisconnect(client: Socket) {
    this.logger.log(
      `user with client id: ${client.id} has disconnected`,
      ConversationGateway.name,
    );
    this.logger.debug(
      `number of users connected:${this.io.sockets.size}`,
      ConversationGateway.name,
    );
  }

  @SubscribeMessage('messageToServer')
  async handleMessage(client: Socket, message: MessageCreateDto) {
    const { conversation } = message;

    const messageSaved = await this.messageService.create(message);

    client.to(conversation).emit('messageToClient', messageSaved);
  }
}
