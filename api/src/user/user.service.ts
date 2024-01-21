import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/utils/service.generic';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { SearchUserDto } from './dto/search-user.dto';
import { UserStatus } from 'aws-sdk/clients/rekognition';

@Injectable()
export class UserService extends BaseService < User, CreateUserDto, UpdateUserDto> {

    constructor(userRepository : UserRepository){
        super(userRepository);
    }

    
    async searchUsers(query: SearchUserDto): Promise<User[]> {
        const emailRegexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
    
        if (emailRegexExp.test(query.email)) {
            try {
                return await this.find({ email: query.email });
            } catch (error) {
                console.error("Error searching by email:", error);
                throw error;
            }
        } else {
            try {
                return await this.find({ username: query.username });
            } catch (error) {
                console.error("Error searching by username:", error);
                throw error;
            }
        }
    }

    async createUser (user : CreateUserDto): Promise<User> {
        return this.userRepository.registerUser()
    }

    async chengeStatus (id: number, status: UserStatus): Promise<User> {
        return this.userRepository.chanegUserStatus(id, status)
    }
    
    
}
