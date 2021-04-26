import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "src/Entity/message.entity";
import { MessageGateway } from "./message.gateway";
import { MessageResolver } from "./message.resolver";
import { MessageService } from "./message.service";

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessageService, MessageResolver, MessageGateway],
})
export class MessageModule {}
