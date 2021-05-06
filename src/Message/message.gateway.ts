import { CreateMessageDto } from './createMessageDto.dto';
import { ValidationPipe } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageRepository } from './message.repository';
import { Server } from 'socket.io';
import { Body } from '@nestjs/common';
@WebSocketGateway(4000)
export class ChatGateWay implements OnGatewayConnection {
  constructor(
    private msgRepository : MessageRepository
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection() {
    const messages = await this.getMessages()
      this.server.emit('init', messages)
  }

  @SubscribeMessage('create')
  async createMessage(
    @Body(ValidationPipe) @MessageBody() data: CreateMessageDto) {
      const author = data.send_by

      await this.msgRepository.createMessage({send_by: author, text_message : data.text_message})

      const messages = await this.getMessages()
      this.server.emit('init', messages)
    }

    async getMessages() {
      return this.msgRepository.find()
    }
}