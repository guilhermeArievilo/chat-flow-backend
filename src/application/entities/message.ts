import { Content } from './content';
import { Entity } from './entitiy';

export interface MessageProps {
  author: string;
  recipient: string;
  content: Content;
  chat: string;
  isBroadcast?: boolean;
  messageId?: string;
  externalChatId?: string;
}

export class Message extends Entity {
  private props: MessageProps;

  constructor(props: MessageProps, id?: string, createdAt?: Date) {
    super({ id, createdAt });
    this.props = props;
  }

  public get author(): string {
    return this.props.author;
  }

  public get recipient(): string {
    return this.props.recipient;
  }

  public get content(): Content {
    return this.props.content;
  }

  public get chat(): string {
    return this.props.chat;
  }

  public get isBroadcast(): boolean {
    if (!this.props.isBroadcast) return false;
    return this.props.isBroadcast;
  }

  public get messageId(): string | undefined {
    return this.props.messageId;
  }

  public get externalChatId(): string | undefined {
    return this.props.externalChatId;
  }
}
