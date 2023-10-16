import { Chat } from '@application/entities/chat';
import {
  ChatRepository,
  PaginationProps,
  PaginationResponse,
} from '@application/repositories/chat-repository';
import { PrismaService } from '../prisma.service';
import { Chat as RawChat } from '@prisma/client';
import { PrismaChatMapper } from '../mappers/prisma-chat-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaChatRepository implements ChatRepository {
  constructor(private prisma: PrismaService) {}

  async create(chat: Chat): Promise<Chat> {
    const attendants = chat.attendants.map((attendant) => ({
      attendantId: attendant,
    }));
    const customers = chat.customers.map((attendant) => ({
      customerId: attendant,
    }));
    const raw = PrismaChatMapper.toPrisma(chat);
    try {
      const chat = await this.prisma.chat.create({
        data: {
          ...raw,
          interlocutors: {
            create: [...attendants, ...customers],
          },
        },
      });

      return PrismaChatMapper.toDomain(chat);
    } catch (e) {
      throw new Error('[Prisma Chat Repository] - CREATE chat error');
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
      throw new Error('[Prisma Chat Repository] - FINDBYID chat error');
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
      throw new Error('[Prisma Chat Repository] - GET chat error');
    }
  }

  async findByCustomer(customerId: string): Promise<Chat[] | null> {
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
      throw new Error('[Prisma Chat Repository] - GET chat error');
    }
  }

  async findChatByExternalChatId(externalChatId: string): Promise<Chat | null> {
    try {
      const raw = await this.prisma.chat.findUnique({
        where: {
          externalChatId,
        },
      });

      if (!raw) return null;

      return PrismaChatMapper.toDomain(raw);
    } catch (e) {
      throw new Error('[Prisma Chat Repository] - GET chat error');
    }
  }
}
