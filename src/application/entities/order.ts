import { Entity } from './entitiy';

export interface OrderProps {
  status: string;
  value: number;
  chat: string;
}

export class Order extends Entity {
  private props: OrderProps;

  constructor(props: OrderProps, id?: string, createdAt?: Date) {
    super({ id, createdAt });
    this.props = props;
  }

  public get status(): string {
    return this.props.status;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get value(): number {
    return this.props.value;
  }

  public set value(value: number) {
    this.props.value = value;
  }

  public get chat(): string {
    return this.props.chat;
  }

  public set chat(chat: string) {
    this.props.chat = chat;
  }
}
