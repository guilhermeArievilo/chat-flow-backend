import { Message } from '@application/entities/message';
import { MessageRepository } from '@application/repositories/message-repository';

export class InMemoryMessageRepository implements MessageRepository {
  public messages: Message[] = [];
  async create(message: Message): Promise<Message | null> {
    this.messages.push(message);

    return message;
  }
}
