import { Entity } from './entitiy';

interface ProfilePicThumbObjProps {
  eurl?: string;
  id?: string;
  img?: string;
  imgFull?: string;
  tag?: string;
}

export interface CustomerProps {
  contact: string;
  profilePicThumbObjProps?: ProfilePicThumbObjProps;
  name?: string;
}

export class Costumer extends Entity {
  private props: CustomerProps;

  constructor(props: CustomerProps, id?: string, createdAt?: Date) {
    super({ id, createdAt });
    this.props = props;
  }

  public get name(): string | undefined {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get contact(): string {
    return this.props.contact;
  }

  public set contact(contact: string) {
    this.props.contact = contact;
  }

  public get profilePicThumbObjProps(): ProfilePicThumbObjProps | undefined {
    return this.props.profilePicThumbObjProps;
  }

  public set profilePicThumbObjProps(profilePic: ProfilePicThumbObjProps) {
    this.props.profilePicThumbObjProps = profilePic;
  }
}
