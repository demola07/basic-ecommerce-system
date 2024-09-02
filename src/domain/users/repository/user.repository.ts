import { User } from 'src/application/entities';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {}
