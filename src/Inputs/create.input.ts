/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class Send_By {
  @Field()
  readonly login: string;
  @Field()
  readonly userId: string;
}
