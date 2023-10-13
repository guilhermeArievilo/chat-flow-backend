import { Chat } from '@application/entities/chat';
import { Chat as RawChat } from '@prisma/client';
export class PrismaChatMapper {
  static toPrisma(chat: Chat): RawChat {
    const { id, createdAt, isBroadcastList, externalChatId } = chat;
    return {
      id,
      createdAt,
      isBroadcastList,
      externalChatId: externalChatId ?? null,
    };
  }

  static toDomain(
    raw: RawChat,
    attendants: string[] = [],
    customers: string[] = [],
  ): Chat {
    const { id, createdAt, isBroadcastList } = raw;
    return new Chat(
      {
        isBroadcastList: isBroadcastList ?? false,
        attendants,
        customers,
      },
      String(id),
      createdAt,
    );
  }
}
