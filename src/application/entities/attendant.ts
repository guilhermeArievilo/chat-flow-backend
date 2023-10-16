import { Entity } from './entitiy';
import { UserProps } from './user';

export interface AttendantProps extends UserProps {
  name: string;
  photoUrl?: string;
}

export class Attendant extends Entity {
  private props: AttendantProps;

  constructor(props: AttendantProps, id?: string, createdAt?: Date) {
    super({ id, createdAt });
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get photoUrl(): string | undefined {
    return this.props.photoUrl;
  }

  public get hash(): string {
    return this.props.hash;
  }
}
