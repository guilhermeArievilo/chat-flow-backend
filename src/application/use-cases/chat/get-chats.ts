import { Chat } from '@application/entities/chat';
import {
  ChatRepository,
  PaginationProps,
} from '@application/repositories/chat-repository';

interface getChatsRequest extends PaginationProps {}

interface getChatsResponse {
  data: Chat[];
  pagination: {
    total: number;
    limit: number | null;
    start: number;
  };
}

export class GetChats {
  constructor(private chatRepository: ChatRepository) {}
  async execute(request: getChatsRequest): Promise<getChatsResponse> {
    const res = await this.chatRepository.get(request);

    if (!res)
      return {
        data: [],
        pagination: {
          total: 0,
          limit: request.limit ?? null,
          start: request.start ?? 0,
        },
      };

    return {
      data: res.data,
      pagination: {
        total: res.pagination.total,
        limit: request.limit ?? null,
        start: request.start ?? 0,
      },
    };
  }
}
