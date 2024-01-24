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
  login(): { status: string } {
    return { status: 'ok' };
  }

  @Post('logout')
  logout(@Req() req) {
    req.session.destroy((error) => {
      if (error) {
        this.logger.error(error);
        throw new BadRequestException();
      }
    });

    return { status: 'ok' };
  }

  @Post('signup')
  async signup(@Body() userCreateDto: UserCreateDto) {
    try {
      await this.userService.create(userCreateDto);
      return { success: true };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
