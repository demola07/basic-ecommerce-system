import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { CreateUserPayload } from 'src/interfaces';
import { User } from 'src/application/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_NOT_FOUND, USERS_ALREADY_EXISTS } from 'src/shared/errors';
import { CreateUserDto } from '../dtos';
import { UserRepository } from '../repository';
@Injectable()
export class UserService {
  // constructor(
  //   private readonly logger: Logger,
  //   @InjectRepository(User) private userRepo: Repository<User>,
  // ) {}

  constructor(
    private readonly logger: Logger,
    @InjectRepository(User)
    private readonly userRepo: UserRepository,
  ) {}

  public async findOneByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user;
  }

  async findAll() {
    return this.userRepo.find({});
  }

  public async createOne(user: CreateUserDto) {
    const { email } = user;
    const existingUser = await this.userRepo.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException(USERS_ALREADY_EXISTS);
    }
    const hashedPassword = await this.hashPassword(user.password);
    const newUser = this.userRepo.create({
      ...user,
      password: hashedPassword,
      email: user.email.toLowerCase(),
    });
    const savedUser = await this.userRepo.save(newUser);
    this.logger.log(`user created successfully ${JSON.stringify(savedUser)}`);
    return savedUser.toSafeObject();
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
