import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './logger/logger.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { WebsocketModule } from './websocket/websocket.module';
import idPlugin from './utils/mongoose/id.plugin';
import { MinioModule } from 'nestjs-minio-client';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB,
      connectionFactory: (connection) => {
        connection.plugin(idPlugin);
        return connection;
      },
    }),
    UserModule,
    ConversationModule,
    LoggerModule,
    AuthenticationModule,
    MinioModule.register({
      endPoint: process.env.MINIO_DOMAIN,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: false,
      accessKey: process.env.MINIO_ROOT_USER,
      secretKey: process.env.MINIO_ROOT_PASSWORD,
      isGlobal: true,
    }),
    WebsocketModule,
    EventEmitterModule.forRoot({ global: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
