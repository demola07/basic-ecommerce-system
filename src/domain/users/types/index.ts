import { CreateUserPayload, IUser } from 'src/interfaces';

export interface IUserService {
  createUser(payload: CreateUserPayload): Promise<IUser>;
  //Please provide definition for the remaining implemented class methods
}
