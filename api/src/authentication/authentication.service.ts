import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && compareSync(password, user.password)) {
      return user.id;
    }
    return null;
  }
}
