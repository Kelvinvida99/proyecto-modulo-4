import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page, limit) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  createUser(user: Users) {
    return this.usersRepository.createUser(user);
  }

  updateUser(user, id: string) {
    return this.usersRepository.updateUser(user, id);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
