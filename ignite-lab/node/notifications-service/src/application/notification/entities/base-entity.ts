import { randomUUID } from 'node:crypto';
import { Replace } from '@/helpers/Replace';

interface BaseEntityProps {
  createdAt: Date;
}

export class BaseEntity {
  private _id: string;
  private _createdAt: Date;

  constructor(props: Replace<BaseEntityProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this._createdAt = props.createdAt ?? new Date();
  }

  public get id() {
    return this._id;
  }

  public get createdAt() {
    return this._createdAt;
  }
}
