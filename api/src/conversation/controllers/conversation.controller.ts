import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from '../services/conversation.service';
import { SessionAuthenticationGuard } from '../../authentication/guards/session-authentication.guards';
import { LoggerService } from '../../logger/logger.service';
import { ConversationUpdateDto } from '../dto/conversation.dto';
import { PageQueryPipe } from '../../utils/pagination/pagination-query.pipe';
import { PageQueryDto } from '../../utils/pagination/pagination-query.dto';

@UseGuards(SessionAuthenticationGuard)
@Controller('conversation')
export class ConversationController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  async findPage(@Query(PageQueryPipe) pageQuery: PageQueryDto) {
    const docs = await this.conversationService.findPage(pageQuery, 'messages');

    if (!docs) {
      this.logger.error(`Unable to find Conversation`);
      throw new NotFoundException(`Conversation not found`);
    }
    return docs;
  }

  @Get('count')
  async count() {
    return {
      count: await this.conversationService.countAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const doc = await this.conversationService.findOne(id);
    if (!doc) {
      this.logger.error(`Unable to find Conversation by id ${id}`);
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }
    return doc;
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() conversationUpdate: ConversationUpdateDto,
  ) {
    const result = await this.conversationService.updateOne(
      id,
      conversationUpdate,
    );
    if (!result) {
      this.logger.error(`Unable to update Conversation by id ${id}`);
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }
    return result;
  }
}
