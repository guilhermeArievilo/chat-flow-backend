import { ObjectId } from 'bson';

interface EntityProps {
  id?: string;
  createdAt?: Date;
}

export class Entity {
  private _id: string;
  private _createdAt: Date;

  constructor({ id, createdAt }: EntityProps) {
    this._id = id ?? new ObjectId().toHexString();
    this._createdAt = createdAt ?? new Date();
  }

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
}
