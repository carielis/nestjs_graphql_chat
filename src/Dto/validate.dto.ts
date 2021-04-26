/* eslint-disable prettier/prettier */
import { Field, ObjectType,  } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class ValidateUser {
    @Field()
    readonly userId: string;

    @Field()
    @IsNotEmpty()
    readonly login: string;

    @Field({nullable: true})
    readonly token: string;

}
