import { Chat } from '@application/entities/chat';
import { Chat as RawChat } from '@prisma/client';
export class PrismaChatMapper {
  static toPrisma(chat: Chat): RawChat {
    const { id, createdAt, isBroadcastList } = chat;
    return {
      id,
      createdAt,
      isBroadcastList,
    };
  }

  static toDomain(raw: RawChat): Chat {
    const { id, createdAt, isBroadcastList } = raw;
    return new Chat(
      {
        isBroadcastList: isBroadcastList ?? false,
      },
      String(id),
      createdAt,
    );
  }
}
