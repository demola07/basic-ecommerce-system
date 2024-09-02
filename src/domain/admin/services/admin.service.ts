import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/application/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/domain/users/services';
@Injectable()
export class AdminService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(User)
    private readonly userService: UserService,
  ) {}

  public async findAllUsers() {
    return this.userService.findAll();
  }

  async findUserById(id: number): Promise<User> {
    return await this.userService.findOne({ id });
  }
}
