import { Friend } from './friend';

export class User {
  constructor(
    public id = '',
    public first_name = '',
    public last_name = '',
    public username = '',
    public imagePath = '',
    public status = '',
    public friends: Friend[]
  ) {}
}
