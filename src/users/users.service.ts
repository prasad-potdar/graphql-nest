import { Injectable } from '@nestjs/common';
import { User } from './entitites/user.entity';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class UsersService {
  private readonly users = [] as User[];

  /**
   * Method To Create User
   * @param userInput {CreateUserInput}
   * @returns {User}
   */
  async create(userInput): Promise<User> {
    const user = new User();
    user.id = uuidv4();
    user.first_name = userInput.first_name;
    user.last_name = userInput.last_name;
    user.email = userInput.email;

    this.users.push(user);
    return user;
  }

  /**
   * Method To Get All Users
   * @returns {[User]}
   */
  async findAll(): Promise<User[]> {
    return this.users;
  }

  /**
   * Get User By Id
   * @param id {number}
   * @returns {User}
   */
  async findOne(id): Promise<User> {
    return this.users[this.users.findIndex((x) => x.id === id)];
  }

  /**
   * Update User
   * @param id {Number}
   * @param userInput {UpdateUserInput}
   * @returns {User}
   */
  async update(id, userInput): Promise<User> {
    const index = this.users.findIndex((x) => x.id === id);

    this.users[index].first_name = userInput.first_name;
    this.users[index].last_name = userInput.last_name;
    this.users[index].email = userInput.email;

    return this.users[index];
  }

  /**
   * Remove User
   */
  async remove(id): Promise<boolean> {
    const index = this.users.findIndex((x) => x.id === id);
    this.users.splice(index, 1);
    return true;
  }
}
