import { Chat } from '@application/entities/chat';
import { makeAttendant } from '@test/factories/attendant-factory';
import { makeCustomer } from '@test/factories/customer-factory';
import { InMemoryChatRepository } from '@test/repositories/in-memory-chat-repository';
import { CreateChat } from './create-chat';
import { GetChats } from './get-chats';

describe('Get chats with pagination', () => {
  it('Shold be able to get chats', async () => {
    const chatRespository = new InMemoryChatRepository();
    const createChat = new CreateChat(chatRespository);

    for (let i = 0; i < 10; i++) {
      const chat = new Chat({
        attendants: [makeAttendant().id],
        customers: [makeCustomer().id],
      });

      await createChat.execute(chat); //create chat
    }

    const getChats = new GetChats(chatRespository);

    const res = await getChats.execute({});

    expect(res.pagination.total).toBeTruthy();
  });

  it('Shold be able to get chats with limit of 5', async () => {
    const chatRespository = new InMemoryChatRepository();
    const createChat = new CreateChat(chatRespository);

    for (let i = 0; i < 10; i++) {
      const chat = new Chat({
        attendants: [makeAttendant().id],
        customers: [makeCustomer().id],
      });

      await createChat.execute(chat); //create chat
    }

    const getChats = new GetChats(chatRespository);

    const res = await getChats.execute({ limit: 5 });

    expect(res.pagination.total).toEqual(10);
    expect(res.pagination.limit).toEqual(5);
  });

  it('Shold be able to get chats with skip of 3', async () => {
    const chatRespository = new InMemoryChatRepository();
    const createChat = new CreateChat(chatRespository);

    for (let i = 0; i < 10; i++) {
      const chat = new Chat({
        attendants: [makeAttendant().id],
        customers: [makeCustomer().id],
      });

      await createChat.execute(chat); //create chat
    }

    const getChats = new GetChats(chatRespository);

    const res = await getChats.execute({ start: 3 });

    expect(res.pagination.total).toEqual(10);
    expect(res.data.length).toEqual(7);
  });

  it('Shold be able to get chats with skip of 1 and limit of 5', async () => {
    const chatRespository = new InMemoryChatRepository();
    const createChat = new CreateChat(chatRespository);

    for (let i = 0; i < 10; i++) {
      const chat = new Chat({
        attendants: [makeAttendant().id],
        customers: [makeCustomer().id],
      });

      await createChat.execute(chat); //create chat
    }

    const getChats = new GetChats(chatRespository);

    const res = await getChats.execute({ start: 1, limit: 5 });

    expect(res.pagination.total).toEqual(10);
    expect(res.data[0].id).not.toEqual(chatRespository.chats[0].id);
    expect(res.data.length).toEqual(5);
  });
});
