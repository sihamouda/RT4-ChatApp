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
import { MessageService } from '../../conversation/services/message.service';

@WebSocketGateway({ namespace: 'conversation' })
export class ConversationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly logger: LoggerService,
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

  @SubscribeMessage('leaveAllRooms')
  handleLeaveAllRooms(client: Socket) {
    const rooms = Object.keys(client.rooms);

    rooms.forEach((room) => {
      if (room !== client.id) {
        client.leave(room);
        this.logger.log(
          `Client ${client.id} left room: ${room}`,
          ConversationGateway.name,
        );
      }
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    this.logger.log(`Client ${client.id} joined room: ${room}`);
  }

  @SubscribeMessage('messageToServer')
  async handleMessage(client: Socket, message: MessageCreateDto) {
    const { conversation } = message;

    const messageSaved = await this.messageService.create(message);

    this.io.to(conversation).emit('messageToClient', messageSaved);
  }
}
