export class Message {
  constructor(
    public message: string,
    public sender: string,
    public conversation: string,
    public createdAt: Date,
    private readonly type = 'text',
    private readonly status: 'sent'
  ) {}
}
