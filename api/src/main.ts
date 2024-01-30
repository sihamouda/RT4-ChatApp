import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { WebSocketAdapter } from './websocket/websocket.adapter';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const isProduction = process.env.NODE_ENV.toLowerCase().includes('prod');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  /** 
    activate express session middleware 
   **/
  app.use(
    session({
      name: 'session_id',
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.HTTPS_ENABLED === 'true',
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
      origin: [`http://localhost:${parseInt(process.env.CLIENT_PORT)}`],
    });
  }

  const loggerService = app.get(LoggerService);
  app.useWebSocketAdapter(
    new WebSocketAdapter(app, loggerService, isProduction),
  );

  /** 
    open http adaptater on port 3000 
   **/
  await app.listen(3000);
}
bootstrap();
