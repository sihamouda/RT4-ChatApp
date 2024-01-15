import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB,
      connectionFactory: (connection) => {
        connection.plugin(idPlugin);
        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}