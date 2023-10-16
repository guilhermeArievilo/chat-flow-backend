import { Chat } from '@application/entities/chat';
import { ChatRepository } from '@application/repositories/chat-repository';
import { Injectable } from '@nestjs/common';

interface CreateChatRequest {
  attendants: string[];
  customers: string[];
}

interface CreateChatResponse {
  chat: Chat;
}
@Injectable()
export class CreateChat {
  constructor(private chatRepository: ChatRepository) {}
  async execute(request: CreateChatRequest): Promise<CreateChatResponse> {
    const { attendants, customers } = request;

    const chat = new Chat({
      attendants,
      customers,
    });

    await this.chatRepository.create(chat);

    return {
      chat,
    };
  }
}
