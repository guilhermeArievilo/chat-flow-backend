import { Entity } from './entitiy';

export interface ChatProps {
  name?: string;
  attendants: string[];
  customers: string[];
  isBroadcastList?: boolean;
  order?: string;
}

export class Chat extends Entity {
  private props: ChatProps;

  constructor(props: ChatProps, id?: string, createdAt?: Date) {
    super({ id, createdAt });
    this.props = props;

    if (this.customers.length > 1) {
      this.props.isBroadcastList = true;
    } else {
      this.props.isBroadcastList = false;
    }
  }

  public get name(): string | undefined {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get attendants(): string[] {
    return this.props.attendants;
  }

  public set attendants(attendants: string[]) {
    this.props.attendants = attendants;
  }

  public get customers(): string[] {
    return this.props.customers;
  }

  public set customers(customers: string[]) {
    this.props.customers = customers;
  }

  public get isBroadcastList(): boolean {
    if (!this.props.isBroadcastList) return false;
    return true;
  }

  public get order(): string | undefined {
    return this.props.order;
  }

  public set order(order: string) {
    this.props.order = order;
  }
}
