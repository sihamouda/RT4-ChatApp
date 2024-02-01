import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { WebSocketAdapter } from './websocket/websocket.adapter';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);

  const isProduction = configService.get<boolean>('isProduction');

  app.useGlobalPipes(new ValidationPipe());

  /** 
    activate express session middleware 
   **/
  app.use(
    session({
      name: 'session_id',
      secret: configService.get<string>('session_secret'),
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: configService.get<boolean>('isHTTPS'),
        path: '/',
        maxAge: isProduction
          ? 1000 * 60 * 60 * 24 //prod 24h
          : 1000 * 60 * 60, //dev 1h
      },
    }),
  );

  /** 
    activate passport middleware 
   **/
  app.use(passport.initialize());
  app.use(passport.session());

  if (!isProduction) {
    /** 
    expose swagger documentation for dev env only on /docs
   **/
    const config = new DocumentBuilder()
      .setTitle('Chat App')
      .setDescription('Chat App API documentation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    /** 
    enable cors
   **/
    app.enableCors({
      origin: [`http://localhost:${configService.get<string>('frontend')}`],
      credentials: true,
    });
  }

  app.useWebSocketAdapter(
    new WebSocketAdapter(app, loggerService, configService),
  );

  /** 
    open http adaptater on port 3000 
   **/
  await app.listen(3000);
}
bootstrap();
