import { Message } from '@application/entities/message';

export abstract class MessageRepository {
  abstract create(message: Message): Promise<Message | null>;
}
