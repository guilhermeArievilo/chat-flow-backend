import { InMemorySendModuleTemplate } from '@test/services/whatsapp/template/in-memory-send-module-template';
import { SendText } from './send-text';

describe('Send Text', () => {
  it('Shold be able to send a text message', async () => {
    const sendModule = new InMemorySendModuleTemplate();
    const sendText = new SendText(sendModule);

    await sendText.execute({
      contact: '557499854861@c.us',
      content: 'Hello World!',
    });

    expect(sendModule.chats).toHaveLength(1);
  });
});
