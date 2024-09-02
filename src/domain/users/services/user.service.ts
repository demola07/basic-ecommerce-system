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
import { BanUserDto, CreateUserDto } from '../dtos';
import { UserRepository } from '../repository';
import { FindOptionsWhere } from 'typeorm';
@Injectable()
export class UserService {
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

  async findOne(conditions: FindOptionsWhere<User>): Promise<User> {
    const user = await this.userRepo.findOne({
      where: conditions,
    });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user;
  }

  async findAll(conditions?: FindOptionsWhere<User>) {
    if (conditions) {
      return this.userRepo.find({
        where: conditions,
      });
    } else {
      return this.userRepo.find();
    }
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

  async banUser(id: number, data: BanUserDto) {
    const user = await this.findOne({ id });
    const updatedUser = Object.assign(user, data);
    return await this.userRepo.save(updatedUser);
  }
}
