import { Chat } from '@application/entities/chat';
import { Content } from '@application/entities/content';
import { Message } from '@application/entities/message';
import { MessageRepository } from '@application/repositories/message-repository';

interface CreateMessageRequest {
  content: Content;
  chat: Chat;
  author: string;
  externalChatId: string;
}

interface CreateMessageResponse {
  message?: Message;
  error?: string;
}

export class CreateMessage {
  constructor(private messageRepository: MessageRepository) {}
  async execute(request: CreateMessageRequest): Promise<CreateMessageResponse> {
    const { content, chat, author, externalChatId } = request;

    const message = new Message({
      author,
      recipient: chat.customers[0],
      content,
      chat: chat.id,
      externalChatId,
    });

    try {
      await this.messageRepository.create(message);

      return {
        message,
      };
    } catch (e) {
      return {
        message,
        error: `[Create Message] - ${e}`,
      };
    }
  }
}
