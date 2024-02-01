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
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      // imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<'string'>('database.uri'),
        dbName: configService.get<'string'>('database.host'),
        connectionFactory: (connection) => {
          connection.plugin(idPlugin);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ConversationModule,
    LoggerModule,
    AuthenticationModule,
    // TODO: make MINIO MODULE ASYNC AND READ FROM CONFIG
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
