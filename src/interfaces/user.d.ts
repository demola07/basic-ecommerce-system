export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  toSafeObject(): Omit<IUser, 'password'>;
}

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};
