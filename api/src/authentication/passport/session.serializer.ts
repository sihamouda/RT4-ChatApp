import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../../user/schema/user.schema';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthenticationSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: { id: string }) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: { id: string },
    done: (err: Error, user: User) => void,
  ) {
    const user = await this.userService.findOne(payload.id);
    user ? done(null, user) : done(null, null);
  }
}
