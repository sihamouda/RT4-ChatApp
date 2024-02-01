import { Global, Module } from '@nestjs/common';
import { MinioModule, MinioService } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          endPoint: configService.get<string>('minio.domain'),
          port: configService.get<number>('minio.port'),
          useSSL: false,
          accessKey: configService.get<string>('minio.access_key'),
          secretKey: configService.get<string>('minio.secret_key'),
        };
      },
    }),
  ],
  providers: [MinioService],
  exports: [MinioService],
})
export class BucketModule {}
