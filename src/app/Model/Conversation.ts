import { Message } from './Message';

export class Conversation {
  constructor(
    public id: string,
    public members: string[],
    public messages: Message[]
  ) {}
}
