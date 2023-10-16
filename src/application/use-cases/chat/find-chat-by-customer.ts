import { Chat } from '@application/entities/chat';
import { ChatRepository } from '@application/repositories/chat-repository';
import { Injectable } from '@nestjs/common';

interface FindChatByCustomerRequest {
  customerId: string;
}

interface FindChatByCustomerResponse {
  chats: Chat[];
}
@Injectable()
export class FindChatByCustomer {
  constructor(private chatRepository: ChatRepository) {}
  async execute(
    request: FindChatByCustomerRequest,
  ): Promise<FindChatByCustomerResponse | null> {
    const { customerId } = request;

    const chat = await this.chatRepository.findByCustomer(customerId);

    if (!chat) return null;

    return {
      chats: chat,
    };
  }
}
