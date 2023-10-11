import { Chat } from '@application/entities/chat';
import {
  ChatRepository,
  PaginationProps,
  PaginationResponse,
} from '@application/repositories/chat-repository';
import { PrismaService } from '../prisma.service';
import { Chat as RawChat } from '@prisma/client';
import { PrismaChatMapper } from '../mappers/prisma-chat-mapper';

export class PrismaChatRepository implements ChatRepository {
  constructor(private prisma: PrismaService) {}

  async create(chat: Chat): Promise<void> {
    const raw = PrismaChatMapper.toPrisma(chat);
    try {
      await this.prisma.chat.create({
        data: raw,
      });
    } catch (e) {
      console.error('[Prisma Chat Repository] - CREATE chat error');
    }
  }

  async findByid(id: string): Promise<Chat | null> {
    try {
      const raw = await this.prisma.chat.findUnique({
        where: {
          id,
        },
      });

      if (!raw) return null;

      return PrismaChatMapper.toDomain(raw);
    } catch (e) {
      console.error('[Prisma Chat Repository] - FINDBYID chat error');
      return null;
    }
  }

  async get(
    pagination: PaginationProps,
  ): Promise<{ data: Chat[]; pagination: PaginationResponse } | null> {
    const { limit, start = 0 } = pagination;
    try {
      const raws = await this.prisma.chat.findMany({
        skip: start,
        take: limit,
      });

      const total = await this.prisma.chat.count();

      if (!raws.length) return null;

      const toDomains = raws.map((raw) => {
        return PrismaChatMapper.toDomain(raw);
      });

      return {
        data: toDomains,
        pagination: {
          total,
        },
      };
    } catch (e) {
      console.error('[Prisma Chat Repository] - GET chat error');
      return null;
    }
  }

  async findByCostumer(customerId: string): Promise<Chat[] | null> {
    try {
      const chats = await this.prisma.chat.findMany({
        include: {
          interlocutors: {
            where: {
              customerId,
            },
          },
        },
      });

      if (!chats.length) return null;

      const chatToDomains = chats.map((raw) => {
        return PrismaChatMapper.toDomain(raw as RawChat);
      });

      return chatToDomains;
    } catch (e) {
      console.error('[Prisma Chat Repository] - GET chat error');
      return null;
    }
  }
}
