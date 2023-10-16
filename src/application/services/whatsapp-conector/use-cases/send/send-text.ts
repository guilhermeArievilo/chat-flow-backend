import { ChatRepository } from '@application/repositories/chat-repository';
import { SendModuleTemplate } from '../../template/send-module-template';
import { Chat } from '@application/entities/chat';
import { MessageRepository } from '@application/repositories/message-repository';
import { Content } from '@application/entities/content';
import { Message } from '@application/entities/message';
import { Injectable } from '@nestjs/common';

interface SendTextRequest {
  attendant: string;
  contacts: string[];
  content: string;
}

interface SendTextResponse {
  chatId?: string;
  status: string;
  error?: string;
}
@Injectable()
export class SendText {
  constructor(
    private sendModule: SendModuleTemplate,
    private chatRepository: ChatRepository,
    private messageRepository: MessageRepository,
  ) {}

  async execute(request: SendTextRequest): Promise<SendTextResponse> {
    const { contacts, content, attendant } = request;
    const isBroadcast = contacts.length > 1;

    try {
      if (isBroadcast) {
        const tasks = contacts.map((contact) => {
          return new Promise(async () => {
            const { chatId } = await this.sendModule.sendText(contact, content);

            let chat =
              await this.chatRepository.findChatByExternalChatId(chatId);

            if (!chat) {
              chat = await this.chatRepository.create(
                new Chat({
                  externalChatId: chatId,
                  attendants: [attendant],
                  customers: contacts,
                }),
              );
            }

            const res = await this.messageRepository.create(
              new Message({
                content: new Content({
                  isMedia: false,
                  type: 'text',
                  content,
                }),
                chat: chat.id,
                author: attendant,
                externalChatId: chatId,
                recipient: contact,
              }),
            );

            if (!res)
              throw new Error(
                '[Send Text Broadcast List Error] - Create a new Message Error',
              );

            return res;
          });
        });

        Promise.all(tasks);

        const { id } = await this.chatRepository.create(
          new Chat({
            isBroadcastList: true,
            attendants: [attendant],
            customers: contacts,
          }),
        );

        return {
          chatId: id,
          status: 'success',
        };
      }

      const { chatId } = await this.sendModule.sendText(contacts[0], content);

      let chat = await this.chatRepository.findChatByExternalChatId(chatId);

      if (!chat) {
        chat = await this.chatRepository.create(
          new Chat({
            externalChatId: chatId,
            attendants: [attendant],
            customers: contacts,
          }),
        );
      }

      const res = await this.messageRepository.create(
        new Message({
          content: new Content({
            isMedia: false,
            type: 'text',
            content,
          }),
          chat: chat.id,
          author: attendant,
          externalChatId: chatId,
          recipient: contacts[0],
        }),
      );

      if (!res)
        throw new Error('[Send Text Error] - Create a new Message Error');

      return {
        chatId: chat.id,
        status: 'success',
      };
    } catch (e) {
      return {
        status: 'Error',
        error: `[Send Text] - ${e}`,
      };
    }
  }
}
