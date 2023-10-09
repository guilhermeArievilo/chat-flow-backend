import { InMemoryMessageRepository } from '@test/repositories/in-memory-message-repository';
import { CreateMessage } from './create-message';
import { makeMessage } from '@test/factories/message-factory';
import { makeCustomer } from '@test/factories/customer-factory';
import { makeAttendant } from '@test/factories/attendant-factory';
import { Chat } from '@application/entities/chat';
import { InMemorySendModuleTemplate } from '@test/services/whatsapp/template/in-memory-send-module-template';
import { SendText } from '@application/services/whatsapp-conector/use-cases/send/send-text';
import { ObjectId } from 'bson';

describe('Create message', () => {
  it('Shold be able to create a chat', async () => {
    const messageRepository = new InMemoryMessageRepository();
    const createMessage = new CreateMessage(messageRepository);

    const chat = new Chat({
      attendants: [makeAttendant().id],
      customers: [makeCustomer().id],
    });

    const message = makeMessage();

    await createMessage.execute({
      author: message.author,
      chat: chat,
      content: message.content,
      externalChatId: new ObjectId().toHexString(),
    });

    expect(messageRepository.messages).toHaveLength(1);
  });

  it('Shold be able to create a text message and send', async () => {
    const messageRepository = new InMemoryMessageRepository();
    const sendModule = new InMemorySendModuleTemplate();
    const createMessage = new CreateMessage(messageRepository);
    const sendText = new SendText(sendModule);

    const chat = new Chat({
      attendants: [makeAttendant().id],
      customers: [makeCustomer().id],
    });

    const message = makeMessage();
    await sendText.execute({
      contact: chat.customers[0],
      content: message.content.content || '',
    });

    await createMessage.execute({
      author: message.author,
      chat: chat,
      content: message.content,
      externalChatId: new ObjectId().toHexString(),
    });

    expect(messageRepository.messages).toHaveLength(1);
    expect(sendModule.chats).toHaveLength(1);
  });

  it('Shold be able to create a text message and send to broadcast list', async () => {
    const messageRepository = new InMemoryMessageRepository();
    const sendModule = new InMemorySendModuleTemplate();
    const createMessage = new CreateMessage(messageRepository);
    const sendText = new SendText(sendModule);

    const chat = new Chat({
      attendants: [makeAttendant().id],
      customers: [makeCustomer().id, makeCustomer().id, makeCustomer().id],
    });

    const message = makeMessage();

    const tasks = chat.customers.map((customer) => {
      return new Promise(async () => {
        const { chatId } = await sendText.execute({
          contact: customer,
          content: message.content.content || '',
        });

        await createMessage.execute({
          author: message.author,
          chat: chat,
          content: message.content,
          externalChatId: chatId || '',
        });
      });
    });

    Promise.all(tasks);

    expect(messageRepository.messages).toBeTruthy();
    expect(sendModule.chats).toBeTruthy();
  });
});
