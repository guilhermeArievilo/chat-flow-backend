import { Chat } from '@application/entities/chat';
import { makeAttendant } from '@test/factories/attendant-factory';
import { makeCustomer } from '@test/factories/customer-factory';
import { InMemoryChatRepository } from '@test/repositories/in-memory-chat-repository';
import { CreateChat } from './create-chat';
import { FindChatById } from './find-chats-by-id';

describe('Find Chat by id', () => {
  it('Shold be able to find a chat by id', async () => {
    const chatRespository = new InMemoryChatRepository();
    const createChat = new CreateChat(chatRespository);

    const chat = new Chat({
      attendants: [makeAttendant().id],
      customers: [makeCustomer().id],
    });

    await createChat.execute(chat); //create chat

    const id = chatRespository.chats[0].id;

    const findByid = new FindChatById(chatRespository);

    const chatFound = await findByid.execute({ chatId: id }); //find chat by chatId

    expect(chatFound).toBeTruthy();
  });
});
