import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ChatRepository } from '@application/repositories/chat-repository';
import { PrismaChatRepository } from './prisma/repositories/prisma-chat-repository';
@Module({
  providers: [
    PrismaService,
    {
      provide: ChatRepository,
      useClass: PrismaChatRepository,
    },
  ],
  exports: [ChatRepository],
})
export class DatabaseModule {}
