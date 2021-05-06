import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "src/Entity/message.entity";
import { ChatGateWay } from "./message.gateway";
import { MessageRepository } from "./message.repository";

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  providers: [ChatGateWay],
})
export class MessageModule {}
