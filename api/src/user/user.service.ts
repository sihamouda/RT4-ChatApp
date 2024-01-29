import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserCreateDto as UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto as UserUpdateDto } from './dto/user-update.dto';
import { UserRepository } from './user.repository';
import { BaseService } from '../utils/generics/service.generic';
import { MinioService } from 'nestjs-minio-client';
import path from 'path';

@Injectable()
export class UserService extends BaseService<
  User,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(private readonly userRepository: UserRepository, private readonly minioService: MinioService) {
    super(userRepository);
  }

  async create(user: UserCreateDto, file:Express.Multer.File): Promise<User> {
    const fileName = Date.now()+file.originalname
    const filePath = "avatars/"+fileName
    await this.minioService.client.putObject(process.env.MINIO_DEFAULT_BUCKETS,filePath,file.buffer)
    
    return await this.userRepository.createQuery({...user , imagePath: filePath})    
  }

  async updateOne(id: string, userUpdate: UserUpdateDto, file?:Express.Multer.File): Promise<User> {
    if(file){
      const fileName = Date.now()+file.originalname
      const filePath = "avatars/"+fileName
      await this.minioService.client.putObject(process.env.MINIO_DEFAULT_BUCKETS,filePath,file.buffer)

      userUpdate.imagePath = filePath
    }
    return await this.userRepository.updateOneQuery(id,userUpdate)
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsernameQuery(username);
  }
}
