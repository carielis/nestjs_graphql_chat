/* eslint-disable prettier/prettier */
import { Field, ObjectType,  } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class CreateUser {
  @Field()
  readonly userId: string;

  @Field()
  @IsNotEmpty()
  readonly login: string;

  @Field()
  @IsNotEmpty()
  readonly password: string;
}
