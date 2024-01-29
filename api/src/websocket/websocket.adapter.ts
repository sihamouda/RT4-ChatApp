import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { LoggerService } from '../logger/logger.service';

export class WebSocketAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private readonly loggerService: LoggerService,
    private isProduction: boolean,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    if (!this.isProduction) {
      const clientPort = parseInt(process.env.CLIENT_PORT);

      const cors = {
        origin: [`http://localhost:${clientPort}`],
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
