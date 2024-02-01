export type UserRegistration = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: object;
};

export type UserLogin = {
  username: string;
  password: string;
};
