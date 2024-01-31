import { Message } from './Message';

export class Friend {
  constructor(
    public first_name = '',
    public last_name = '',
    public image = '',
    public active: boolean,
    public discussion: Message[]
  ) {}
}
