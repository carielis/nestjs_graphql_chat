import { MessageEntity } from "src/Entity/message.entity";
import { CreateMessageDto } from './createMessageDto.dto';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {
  async createMessage(createMessage: CreateMessageDto): Promise<MessageEntity> {
    const { send_by, text_message } = createMessage;

    const message = this.create()

    message.send_by = send_by
    message.text_message = text_message

    await message.save()

    return message;
  }
}
