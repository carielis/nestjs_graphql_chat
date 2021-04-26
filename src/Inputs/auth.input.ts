/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class InputValidateUser {
  @Field()
  readonly login: string;
  @Field()
  readonly password: string;
}
