import { ObjectId } from 'bson';
import { Content } from '@application/entities/content';
import { Message, MessageProps } from '@application/entities/message';

type Override = Partial<MessageProps>;

export function makeMessage(override: Override = {}) {
  return new Message({
    author: new ObjectId().toHexString(),
    recipient: new ObjectId().toHexString(),
    chat: new ObjectId().toHexString(),
    messageId: new ObjectId().toHexString(),
    externalChatId: new ObjectId().toHexString(),
    content: new Content({
      type: 'text',
      isMedia: false,
      content: 'Olá mundo.',
    }),
    ...override,
  });
}
