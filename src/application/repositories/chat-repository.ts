import { Chat } from '../entities/chat';

export interface PaginationProps {
  limit?: number;
  start?: number;
}

export interface PaginationResponse {
  total: number;
}

export abstract class ChatRepository {
  abstract create(chat: Chat): Promise<Chat>;
  abstract findByid(id: string): Promise<Chat | null>;
  abstract get(
    pagination: PaginationProps,
  ): Promise<{ data: Chat[]; pagination: PaginationResponse } | null>;
  abstract findByCustomer(customerId: string): Promise<Chat[] | null>;
  abstract findChatByExternalChatId(
    externalChatId: string,
  ): Promise<Chat | null>;
}
