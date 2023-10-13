import { CreateChat } from '@application/use-cases/chat/create-chat';
import { FindChatByCustomer } from '@application/use-cases/chat/find-chat-by-customer';
import { FindChatById } from '@application/use-cases/chat/find-chats-by-id';
import { GetChats } from '@application/use-cases/chat/get-chats';
import { Controller } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  constructor(
    private createChat: CreateChat,
    private findChatById: FindChatById,
    private findChatByCustomer: FindChatByCustomer,
    private getChats: GetChats,
  ) {}
}
