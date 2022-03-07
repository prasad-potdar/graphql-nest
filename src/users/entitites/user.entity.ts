/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field((type) => Int, { nullable: true })
  age?: number;
}
