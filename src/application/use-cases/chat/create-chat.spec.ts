import { Chat } from '@application/entities/chat';
import { makeAttendant } from '@test/factories/attendant-factory';
import { makeCustomer } from '@test/factories/customer-factory';
import { InMemoryChatRepository } from '@test/repositories/in-memory-chat-repository';
import { CreateChat } from './create-chat';

describe('Create chat', () => {
  it('Shold be1 able to create a chat', async () => {
    const chatRespository = new InMemoryChatRepository();
    const createChat = new CreateChat(chatRespository);

    const chat = new Chat({
      attendants: [makeAttendant().id],
      customers: [makeCustomer().id],
    });

    await createChat.execute(chat);

    expect(chatRespository.chats).toHaveLength(1);
  });

  it('Shold be able to create a broadcast list', async () => {
    const chatRespository = new InMemoryChatRepository();
    const createChat = new CreateChat(chatRespository);

    const chat = new Chat({
      attendants: [makeAttendant().id],
      customers: [makeCustomer().id, makeCustomer().id, makeCustomer().id],
    });

    const createdChat = await createChat.execute(chat);

    expect(createdChat.chat.isBroadcastList).toBeTruthy();
  });

  it('shold be able create a chat that is not broadcast list', async () => {
    const chatRespository = new InMemoryChatRepository();
    const createChat = new CreateChat(chatRespository);

    const chat = new Chat({
      attendants: [makeAttendant().id],
      customers: [makeCustomer().id],
    });

    const createdChat = await createChat.execute(chat);

    expect(createdChat.chat.isBroadcastList).toBeFalsy();
  });
});
