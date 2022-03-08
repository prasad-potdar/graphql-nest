import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { User } from './entitites/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private userService: UsersService) { }

  @Mutation((returns) => User)
  async createUser(
    @Args('first_name') first_name: String,
    @Args('last_name') last_name: String,
    @Args('email') email: String
  ): Promise<User> {
    const createUserInput = {
      first_name,
      last_name,
      email
    };
    const user = await this.userService.create(createUserInput);
    return user;
  }

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Query((returns) => User)
  async user(@Args('id') id: String): Promise<User> {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args('id') id: String,
    @Args('first_name') first_name: String,
    @Args('last_name') last_name: String,
    @Args('email') email: String
  ): Promise<User> {
    const updateUserInput = {
      first_name,
      last_name,
      email
    };
    const user = await this.userService.update(
      id,
      updateUserInput
    );
    return user;
  }

  @Mutation((returns) => User)
  async removeUser(@Args('id') id: String): Promise<User> {
    const user = this.userService.findOne(id);
    this.userService.remove(id);
    return user;
  }
}
