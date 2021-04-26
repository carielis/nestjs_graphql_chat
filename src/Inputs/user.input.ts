/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class InputCreateUser {
  @Field()
  readonly login: string;
  @Field()
  readonly password: string;
}
