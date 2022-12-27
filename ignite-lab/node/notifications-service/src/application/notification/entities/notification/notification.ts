import { BaseEntity } from '../base-entity';
import { Content } from './validate';

export interface NotificationProps {
  id?: string;
  recipientId: string;
  content: Content;
  category: string;
  canceledAt?: Date | null;
  readAt?: Date | null;
  createdAt?: Date;
}

export class Notification extends BaseEntity {
  private props: NotificationProps;

  constructor(props: NotificationProps) {
    super({ id: props.id, createdAt: props.createdAt });

    this.props = {
      ...props,
    };
  }

  public get recipientId() {
    return this.props.recipientId;
  }

  public set recipientId(recipientId) {
    this.props.recipientId = recipientId;
  }

  public get content() {
    return this.props.content;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get category() {
    return this.props.category;
  }

  public set category(category) {
    this.props.category = category;
  }

  public get readAt() {
    return this.props.readAt;
  }

  public get canceledAt() {
    return this.props.canceledAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }
}
