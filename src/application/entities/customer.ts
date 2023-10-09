import { Entity } from './entitiy';

interface ProfilePicThumbObjProps {
  eurl?: string;
  id?: string;
  img?: string;
  imgFull?: string;
  tag?: string;
}

export interface CustomerProps {
  savedContact: string;
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

  public get savedContact(): string {
    return this.props.savedContact;
  }

  public set savedContact(contact: string) {
    this.props.savedContact = contact;
  }

  public get profilePicThumbObjProps(): ProfilePicThumbObjProps | undefined {
    return this.props.profilePicThumbObjProps;
  }

  public set profilePicThumbObjProps(profilePic: ProfilePicThumbObjProps) {
    this.props.profilePicThumbObjProps = profilePic;
  }
}
