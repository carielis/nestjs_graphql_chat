import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "src/Entity/message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private repository: Repository<MessageEntity>
  ) {}

  async getAllMessage() {
    return await this.repository.find();
  }

  async createMessage(text_message, user) {
    const login = user.login;
    const create = this.repository.create({ send_by: user, text_message });
    await this.repository.save(create);
    return create;
  }
}
