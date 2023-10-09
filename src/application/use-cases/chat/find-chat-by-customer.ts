import { Chat } from '@application/entities/chat';
import { ChatRepository } from '@application/repositories/chat-repository';

interface FindChatByCustomerRequest {
  customerId: string;
}

interface FindChatByCustomerResponse {
  chats: Chat[];
}

export class FindChatByCustomer {
  constructor(private chatRepository: ChatRepository) {}
  async execute(
    request: FindChatByCustomerRequest,
  ): Promise<FindChatByCustomerResponse | null> {
    const { customerId } = request;

    const chat = await this.chatRepository.findByCostumer(customerId);

    if (!chat) return null;

    return {
      chats: chat,
    };
  }
}
