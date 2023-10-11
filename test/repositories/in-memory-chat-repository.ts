import { Chat } from '@application/entities/chat';
import {
  ChatRepository,
  PaginationProps,
  PaginationResponse,
} from '@application/repositories/chat-repository';

export class InMemoryChatRepository implements ChatRepository {
  public chats: Chat[] = [];

  async create(chat: Chat): Promise<void> {
    await this.chats.push(chat);
  }

  async findByid(id: string): Promise<Chat | null> {
    const chat = await this.chats.find((chat) => chat.id === id);
    if (!chat) return null;
    return chat;
  }

  async get(
    pagination: PaginationProps,
  ): Promise<{ data: Chat[]; pagination: PaginationResponse } | null> {
    const { limit, start = 0 } = pagination;

    if (!limit) {
      return {
        data: await this.chats.filter((item, index) => {
          if (index >= start) return item;
          return false;
        }),
        pagination: {
          total: this.chats.length,
        },
      };
    }

    const partial = await this.chats.filter((item, index) => {
      if (index >= start) return item;
      return false;
    });

    return {
      data: await partial.filter((item, index) => {
        if (index < limit) return item;
        return false;
      }),
      pagination: {
        total: this.chats.length,
      },
    };
  }

  async findByCostumer(customerId: string): Promise<Chat[] | null> {
    const chat = await this.chats.filter((chat) => {
      return chat.customers?.find((customer) => customer === customerId);
    });
    if (!chat) return null;
    return chat;
  }
}
