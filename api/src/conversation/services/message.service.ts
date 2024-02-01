import { Injectable } from '@nestjs/common';
import { BaseService } from '../../utils/generics/service.generic';
import { MessageCreateDto, MessageUpdateDto } from '../dto/message.dto';
import { Message } from '../schema/message.schema';
import { MessageRepository } from '../repositories/message.repository';
import { MinioService } from 'nestjs-minio-client';
import { MessageType } from '../../utils/const';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessageService extends BaseService<
  Message,
  MessageCreateDto,
  MessageUpdateDto
> {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly minioService: MinioService,
    private configService: ConfigService,
  ) {
    super(messageRepository);
  }

  bucket = this.configService.get<string>('minio.bucket');

  async create(message: MessageCreateDto): Promise<Message> {
    if (message.type === MessageType['PHOTO']) {
      const fileName = Date.now() + message.sender;
      const filePath = 'messages/' + message.conversation + fileName;
      await this.minioService.client.putObject(
        this.bucket,
        filePath,
        message.message,
      );
      message.message = filePath;
    }

    return await this.messageRepository.createQuery(message);
  }
}
