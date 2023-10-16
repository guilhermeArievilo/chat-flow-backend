import { Chat } from '@application/entities/chat';
import { ChatRepository } from '@application/repositories/chat-repository';
import { Injectable } from '@nestjs/common';

interface findByidRequest {
  chatId: string;
}

interface findByidResponse {
  chat: Chat;
}
@Injectable()
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
