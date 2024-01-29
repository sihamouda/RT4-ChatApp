import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PageQueryDto } from '../utils/pagination/pagination-query.dto';
import { LoggerService } from '../logger/logger.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserSearchDto } from './dto/user-search.dto';
import { PageQueryPipe } from '../utils/pagination/pagination-query.pipe';
import { UserSearchQueryPipe } from '../utils/user-search-query.pipe';
import { User } from './schema/user.schema';
import { SessionAuthenticationGuard } from '../authentication/guards/session-authentication.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinIOInterceptor } from '../utils/minio.interceptor';

@UseGuards(SessionAuthenticationGuard)
@UseInterceptors(MinIOInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  async findPage(
    @Query(PageQueryPipe) pageQuery: PageQueryDto,
    @Query('search', UserSearchQueryPipe) search?: UserSearchDto,
  ) {
    if (!search) return await this.userService.findPage(pageQuery);
    let docs: User[];
    if (search.username) {
    }
    docs = await this.userService.find({ username: search.username });
    if (search.email)
      docs = await this.userService.find({ username: search.email });
    if (!docs) {
      this.logger.error(`Unable to find User`);
      throw new NotFoundException(`User not found`);
    }
    return docs;
  }

  @Get('count')
  async count() {
    return {
      count: await this.userService.countAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const doc = await this.userService.findOne(id);
    if (!doc) {
      this.logger.error(`Unable to find User by id ${id}`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return doc;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateOne(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() userUpdate: UserUpdateDto,
  ) {
    const result = await this.userService.updateOne(id, userUpdate, file);
    if (!result) {
      this.logger.error(`Unable to update User by id ${id}`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    const result = await this.userService.deleteOne(id);
    if (result.deletedCount === 0) {
      this.logger.error(`Unable to delete User by id ${id}`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return result;
  }
}
