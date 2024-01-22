import { PipeTransform } from '@nestjs/common';
import { UserSearchDto } from '../user/dto/user-search.dto';

type Username = { username: string };
type Email = { email: string };

// type guards
function isUsername(username: Username | Email): username is Username {
  return (username as Username).username !== undefined;
}

function isEmail(email: Username | Email): email is Email {
  return (email as Email).email !== undefined;
}

export class UserSearchQueryPipe
  implements PipeTransform<Username | Email, UserSearchDto>
{
  transform(value: Username | Email) {
    if (isUsername(value)) {
      return value as UserSearchDto;
    }
    if (isEmail(value)) {
      return value as UserSearchDto;
    } else return undefined;
  }
}
