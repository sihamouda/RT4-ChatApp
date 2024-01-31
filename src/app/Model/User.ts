import { Friend } from './friend';

export class Person {
  constructor(
    public first_name = '',
    public last_name = '',
    public image = '',
    public friends: Friend[]
  ) {}
}
