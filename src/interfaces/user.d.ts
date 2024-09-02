export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  toSafeObject(): Omit<IUser, 'password'>;
}

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};
