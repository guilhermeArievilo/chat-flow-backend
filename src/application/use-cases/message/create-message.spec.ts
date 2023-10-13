import { InMemoryMessageRepository } from '@test/repositories/in-memory-message-repository';
import { CreateMessage } from './create-message';
import { makeMessage } from '@test/factories/message-factory';
import { Chat } from '@application/entities/chat';
import { ObjectId } from 'bson';

describe('Create message', () => {
  it('Shold be able to create a chat', async () => {
    const messageRepository = new InMemoryMessageRepository();
    const createMessage = new CreateMessage(messageRepository);

    const message = makeMessage();

    const chat = new Chat({
      attendants: [message.author],
      customers: [message.recipient],
    });

    await createMessage.execute({
      author: message.author,
      chat: chat.id,
      content: message.content,
      externalChatId: new ObjectId().toHexString(),
      recipient: message.recipient,
    });

    expect(messageRepository.messages).toHaveLength(1);
  });
});
