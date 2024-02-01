import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '@nestjs/config';

export class WebSocketAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private readonly loggerService: LoggerService,
    private configService: ConfigService,
  ) {
    super(app);
  }

  isProduction = this.configService.get<boolean>('isProduction');
  clientPort = this.configService.get<number>('frontend');

  createIOServer(port: number, options?: ServerOptions) {
    if (!this.isProduction) {
      const cors = {
        origin: [`http://localhost:${this.clientPort}`],
      };

      this.loggerService.log(
        `Configuring websockets with CORS options ${cors}`,
        WebSocketAdapter.name,
      );

      options.cors = cors;
    }

    return super.createIOServer(port, options);
  }
}
