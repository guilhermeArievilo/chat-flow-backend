import { Chat } from '@application/entities/chat';
import { ChatRepository } from '@application/repositories/chat-repository';

interface findByidRequest {
  chatId: string;
}

interface findByidResponse {
  chat: Chat;
}

export class FindChatById {
  constructor(private chatRepository: ChatRepository) {}
  async execute(request: findByidRequest): Promise<findByidResponse | null> {
    const { chatId } = request;

    const res = await this.chatRepository.findByid(chatId);

    if (!res) return null;

    return {
      chat: res,
    };
  }
}
