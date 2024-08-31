export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};
