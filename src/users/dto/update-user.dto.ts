/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field((type) => Int)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field((type) => Int, { nullable: true })
  age?: number;
}
