import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { User } from '../user/schema/user.schema';

@Injectable()
export class MinIOInterceptor implements NestInterceptor {
  transformUrl(data: User) {
    const isProduction = process.env.NODE_ENV.toLowerCase().includes('prod');
    let minioDomain = process.env.MINIO_DOMAIN;
    if (!isProduction) {
      minioDomain = 'localhost';
    }
    data.imagePath = `http://${minioDomain}:${process.env.MINIO_PORT}/${process.env.MINIO_DEFAULT_BUCKETS}/${data.imagePath}`;
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
