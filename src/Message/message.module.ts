import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "src/Entity/message.entity";
import { MessageService } from "./message.service";

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessageService],
})
export class MessageModule {}
