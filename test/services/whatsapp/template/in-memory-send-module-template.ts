import { Content } from '@application/entities/content';
import { Message } from '@application/entities/message';
import {
  SendModuleTemplate,
  SendResponse,
} from '@application/services/whatsapp-conector/template/send-module-template';
import { makeMessage } from '@test/factories/message-factory';
import { ObjectId } from 'bson';

interface ChatWhatsModel {
  contact: string;
  messages: Message[];
  chatId: string;
}

export class InMemorySendModuleTemplate implements SendModuleTemplate {
  public chats: ChatWhatsModel[] = [];
  async sendText(contact: string, content: string): Promise<SendResponse> {
    const isExistChat = this.chats.findIndex(
      (chat) => chat.contact === contact,
    );

    if (isExistChat === -1) {
      const chat: ChatWhatsModel = {
        contact,
        messages: [],
        chatId: new ObjectId().toHexString(),
      };

      const message = makeMessage({
        author: 'me',
        content: new Content({
          isMedia: false,
          type: 'text',
          content,
        }),
        chat: chat.chatId,
      });

      chat.messages.push(message);

      this.chats.push(chat);
      console.log('Mensagem enviada para: ', chat.contact);

      return {
        contact: chat.contact,
        chatId: chat.chatId,
      };
    }

    const message = makeMessage({
      author: 'me',
      content: new Content({
        isMedia: false,
        type: 'text',
        content,
      }),
      chat: this.chats[isExistChat].chatId,
    });

    this.chats[isExistChat].messages.push(message);
    console.log('Mensagem enviada para: ', this.chats[isExistChat].contact);

    return {
      contact: this.chats[isExistChat].contact,
      chatId: this.chats[isExistChat].chatId,
    };
  }
}
