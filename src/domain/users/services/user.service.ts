import { Injectable } from '@nestjs/common';
import { CreateUserPayload } from 'src/interfaces';
import { IUserService } from '../types';
import { User } from 'src/application/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {} // private readonly departmentService: DepartmentService, // private readonly emailService: EmailService, // private readonly repository: UserRepository,

  // async createUser(userData: CreateUserPayload): Promise<IUserService> {
  async createUser(userData: CreateUserPayload): Promise<string> {
    // const data = await this.repository.createOne(userData);
    // await this.emailService.sendWelcomeEmail(data.email, data.firstName);
    return 'data';
  }
}
