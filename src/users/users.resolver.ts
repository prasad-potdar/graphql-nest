import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { User } from './entitites/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Mutation((returns) => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.userService.create(createUserInput);
    return user;
  }

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userService.update(
      updateUserInput.id,
      updateUserInput,
    );
    return user;
  }

  @Mutation((returns) => User)
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    const user = this.userService.findOne(id);
    this.userService.remove(id);
    return user;
  }
}
