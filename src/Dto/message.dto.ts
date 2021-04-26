/* eslint-disable prettier/prettier */
import { Field, ObjectType,  } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class MessageDto {
    @Field()
    messageId: string
    @Field()
    create_at: string
    @Field()
    text_message: string
    @Field()
    send_by: string
}
