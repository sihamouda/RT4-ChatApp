import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserCreateDto } from '../user/dto/user-create.dto';

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
  async register(@Body() userCreateDto: UserCreateDto) {
    try {
      await this.userService.create(userCreateDto);
      return { success: true };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
