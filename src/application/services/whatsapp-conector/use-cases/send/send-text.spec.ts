import { InMemorySendModuleTemplate } from '@test/services/whatsapp/template/in-memory-send-module-template';
import { SendText } from './send-text';
import { InMemoryMessageRepository } from '@test/repositories/in-memory-message-repository';
import { InMemoryChatRepository } from '@test/repositories/in-memory-chat-repository';
import { makeAttendant } from '@test/factories/attendant-factory';

describe('Send Text', () => {
  it('Shold be able to send a text message', async () => {
    const messageRepository = new InMemoryMessageRepository();
    const chatRespository = new InMemoryChatRepository();
    const sendModule = new InMemorySendModuleTemplate();
    const sendText = new SendText(
      sendModule,
      chatRespository,
      messageRepository,
    );

    await sendText.execute({
      contacts: ['557499854861@c.us'],
      content: 'Hello World!',
      attendant: makeAttendant().id,
    });

    expect(sendModule.chats).toHaveLength(1);
  });
});
