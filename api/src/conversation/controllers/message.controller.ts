import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SessionAuthenticationGuard } from '../../authentication/guards/session-authentication.guards';
import { LoggerService } from '../../logger/logger.service';
import { MessageService } from '../services/message.service';
import { MessageUpdateDto } from '../dto/message.dto';

@UseGuards(SessionAuthenticationGuard)
@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly logger: LoggerService,
  ) {}

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() messageUpdate: MessageUpdateDto,
  ) {
    const result = await this.messageService.updateOne(id, messageUpdate);
    if (!result) {
      this.logger.error(`Unable to update Message by id ${id}`);
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return result;
  }
}
