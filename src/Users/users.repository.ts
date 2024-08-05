import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
/* import _ from 'lodash'; */

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async getUsers(page: number, limit: number) {
    const start = (page - 1) * limit;

    const users = await this.usersRepository.find({
      take: limit,
      skip: start,
    });
    // const usersDb = users.map((user) => _.omit(user, ['password']));
    const usersDb = users.map(
      ({ password, isAdmin, ...userWithoutPassword }) => {
        console.log(password, isAdmin);
        return userWithoutPassword;
      },
    );
    return usersDb;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (!user) return 'User not found';

    /* const userWithoutSensitiveInfo = _.omit(user, ['password', 'isAdmin']); */
    const { password, isAdmin, ...userWithoutSensitiveInfo } = user;
    console.log(password, isAdmin);

    return userWithoutSensitiveInfo;
  }

  async createUser(user: Partial<Users>) {
    const newUser = await await this.usersRepository.save(user);
    console.log(newUser);
    /* const userWithoutSensitiveInfo = _.omit(newUser, ['password', 'isAdmin']); */
    return newUser;
  }

  async updateUser(user: Partial<Users>, id: string) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    /* const userWithoutSensitiveInfo = _.omit(newUser, ['password', 'isAdmin']); */
    const { password, isAdmin, ...userWithoutSensitiveInfo } = updatedUser;
    console.log(password, isAdmin);

    return userWithoutSensitiveInfo;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.delete(user);
    /* const userWithoutSensitiveInfo = _.omit(user, ['password', 'isAdmin']); */

    const { password, isAdmin, ...userWithoutSensitiveInfo } = user;
    console.log(password, isAdmin);
    return userWithoutSensitiveInfo;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
