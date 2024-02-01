import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserCreateDto as UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto as UserUpdateDto } from './dto/user-update.dto';
import { UserRepository } from './user.repository';
import { BaseService } from '../utils/generics/service.generic';
import { MinioService } from 'nestjs-minio-client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService extends BaseService<
  User,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly minioService: MinioService,
    private readonly eventEmitter: EventEmitter2,
    private configService: ConfigService,
  ) {
    super(userRepository);
  }

  bucket = this.configService.get<string>('minio.bucket');

  async create(user: UserCreateDto, file: Express.Multer.File): Promise<User> {
    const fileName = Date.now() + file.originalname;
    const filePath = 'avatars/' + fileName;
    await this.minioService.client.putObject(
      this.bucket,
      filePath,
      file.buffer,
    );

    const newUser = await this.userRepository.createQuery({
      ...user,
      imagePath: filePath,
    });
    this.eventEmitter.emit('create-conversation', newUser.id);

    return newUser;
  }

  async updateOne(
    id: string,
    userUpdate: UserUpdateDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    if (file) {
      const fileName = Date.now() + file.originalname;
      const filePath = 'avatars/' + fileName;
      await this.minioService.client.putObject(
        this.bucket,
        filePath,
        file.buffer,
      );

      userUpdate.imagePath = filePath;
    }
    return await this.userRepository.updateOneQuery(id, userUpdate);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsernameQuery(username);
  }
}
