import { Chat } from '@application/entities/chat';
import { makeAttendant } from '@test/factories/attendant-factory';
import { makeCustomer } from '@test/factories/customer-factory';
import { InMemoryChatRepository } from '@test/repositories/in-memory-chat-repository';
import { CreateChat } from './create-chat';
import { FindChatByCustomer } from './find-chat-by-customer';

describe('Find chat by id customer', () => {
  it('Shold be able to find a chat by customrer id', async () => {
    const chatRespository = new InMemoryChatRepository();
    const createChat = new CreateChat(chatRespository);

    const chat = new Chat({
      attendants: [makeAttendant().id],
      customers: [makeCustomer().id],
    });

    await createChat.execute(chat);

    const findChatByCustomer = new FindChatByCustomer(chatRespository);

    const customerId = chatRespository.chats[0].customers[0];
    const res = await findChatByCustomer.execute({ customerId });

    expect(res?.chats).toHaveLength(1);
  });
});
