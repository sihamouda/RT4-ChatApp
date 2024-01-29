import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {
    return { success: true };
  }

  @Post('logout')
  logout(@Req() req) {
    req.session.destroy((error) => {
      if (error) {
        this.logger.error(error);
        throw new BadRequestException();
      }
    });

    return { success: true };
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(@UploadedFile() file: Express.Multer.File , @Body() userCreateDto: UserCreateDto) {
    try {
      if(!file){
        throw new BadRequestException("No avatar uploaded")
      }
      await this.userService.create(userCreateDto, file);
      return { success: true };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
