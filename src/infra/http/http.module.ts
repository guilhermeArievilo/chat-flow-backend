import { SendText } from '@application/services/whatsapp-conector/use-cases/send/send-text';
import { CreateAttendant } from '@application/use-cases/attendant/create-attendant';
import { FindChatByCustomer } from '@application/use-cases/chat/find-chat-by-customer';
import { FindChatById } from '@application/use-cases/chat/find-chats-by-id';
import { GetChats } from '@application/use-cases/chat/get-chats';
import { AuthModule } from '@infra/auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [
    FindChatByCustomer,
    FindChatById,
    GetChats,
    SendText,
    CreateAttendant,
  ],
})
export class HttpModule {}
