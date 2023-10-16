import { Content } from '@application/entities/content';
import { Message } from '@application/entities/message';
import { MessageRepository } from '@application/repositories/message-repository';
import { Injectable } from '@nestjs/common';

interface CreateMessageRequest {
  content: Content;
  chat: string;
  author: string;
  externalChatId: string;
  recipient: string;
}

interface CreateMessageResponse {
  message?: Message;
  error?: string;
}
@Injectable()
export class CreateMessage {
  constructor(private messageRepository: MessageRepository) {}
  async execute(request: CreateMessageRequest): Promise<CreateMessageResponse> {
    const { content, chat, author, externalChatId, recipient } = request;

    const message = new Message({
      author,
      content,
      chat: chat,
      externalChatId,
      recipient,
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
