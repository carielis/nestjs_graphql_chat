/* eslint-disable prettier/prettier */
import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver, Subscription,Query } from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";
import { AuthGuard } from "src/Auth/auth.guard";
import { MessageDto } from "src/Dto/message.dto";
import { User } from "src/graphql";
import { MessageService } from "./message.service";

const pubSub = new PubSub();
@Resolver()
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Query()
  //@UseGuards(new AuthGuard())
  async getMessage() {
      const messages = await this.messageService.getAllMessage()
      return messages
  }

  
  @Mutation()
  @UseGuards(new AuthGuard())
  async createMessage( @Args("message") message: string) {
    const newMessage =  this.messageService.createMessage(message, "Arkhip")
    pubSub.publish(`watchMessage`, { message });
    return newMessage;
  }

  @Subscription(() => MessageDto, {
      name: 'wathMessage',
  })
  //@UseGuards(new AuthGuard())
  wathMessage() {
    return pubSub.asyncIterator(`watchMessages`)
  }
}
