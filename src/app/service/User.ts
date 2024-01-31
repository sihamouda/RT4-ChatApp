export class User {
  constructor(
    public id = '',
    public first_name = '',
    public last_name = '',
    public username = '',
    public email = '',
    public password = '',
    public imagePath = '',
    public timezone = '',
    public status = '',
    public friendsWith: any[],
    public conversations: any[],
    public createdAt = '',
    public updatedAt = ''
  ) {}
}
