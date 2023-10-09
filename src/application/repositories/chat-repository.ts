import { Chat } from '../entities/chat';

export interface PaginationProps {
  limit?: number;
  start?: number;
}

export interface PaginationResponse {
  total: number;
}

export abstract class ChatRepository {
  abstract create(chat: Chat): Promise<void>;
  abstract findByid(id: string): Promise<Chat | null>;
  abstract get(
    pagination: PaginationProps,
  ): Promise<{ data: Chat[]; pagination: PaginationResponse } | null>;
  abstract findByCostumer(customerId: string): Promise<Chat[] | null>;
}
