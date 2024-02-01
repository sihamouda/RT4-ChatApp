import { Conversation } from './Conversation';
import { DisplayMessage } from './DisplayMessage';

export class Friend {
  constructor(
    public id = '',
    public first_name = '',
    public last_name = '',
    public image = '',
    public active: boolean,
    public discussion: DisplayMessage[],
    public conversation: Conversation
  ) {}
}
