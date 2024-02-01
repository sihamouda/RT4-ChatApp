import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from '../user/schema/user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinIOInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  isProduction = this.configService.get<boolean>('isProduction');
  bucket = this.configService.get<string>('minio.bucket');
  minioPort = this.configService.get<string>('minio.port');
  minioDomain = this.isProduction
    ? this.configService.get<string>('minio.domain')
    : 'localhost';

  transformUrl(data: User) {
    data.imagePath = `http://${this.minioDomain}:${this.minioPort}/${this.bucket}/${data.imagePath}`;
    return data;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<User | User[]> {
    return next.handle().pipe(
      map((data: User[] | User) => {
        if (Array.isArray(data)) {
          data = data.map((element) => this.transformUrl(element));
        } else {
          data = this.transformUrl(data);
        }
        return data;
      }),
    );
  }
}
