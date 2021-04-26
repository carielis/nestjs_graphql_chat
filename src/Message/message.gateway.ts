/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Server } from "socket.io";
import {
    MessageBody,
  OnGatewayConnection,
    SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { MessageEntity } from "src/Entity/message.entity";
import { Repository } from "typeorm";
import { Body, UseGuards } from "@nestjs/common";
import { Context } from "@nestjs/graphql";
import { AuthGuard } from "src/Auth/auth.guard";

@WebSocketGateway(4000)
export class MessageGateway implements OnGatewayConnection {
  constructor(
    @InjectRepository(MessageEntity)
    private repository: Repository<MessageEntity>
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection() {
      const messages = ""
  }

  @SubscribeMessage('create')
  @UseGuards(new AuthGuard())
  async createMessage( @Context("user") user: any, @Body() @MessageBody() data : any) {
        const creator = user.login
        const saved = await this.repository.create({send_by: creator, text_message: data.text})
        await this.repository.save(saved)
    }

  async getMessages(): Promise<any> {
      return this.repository.find()
  }
}
