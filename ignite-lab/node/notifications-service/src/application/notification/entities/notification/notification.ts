import { Replace } from '@/helpers/Replace';
import { BaseEntity } from '../base-entity';
import { Content } from './validate';

interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
}

export class Notification extends BaseEntity {
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    super({});
    this.props = {
      ...props,
    };
  }

  public get recipientId() {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
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

  public set category(category: string) {
    this.props.category = category;
  }

  public get readAt() {
    return this.props.readAt;
  }

  public set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }
}
