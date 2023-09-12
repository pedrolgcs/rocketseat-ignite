import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AttachmentProps {
  title: string
  link: string
}

class Attachment extends Entity<AttachmentProps> {
  private constructor(props: AttachmentProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(props: AttachmentProps, id?: UniqueEntityID): Attachment {
    const attachment = new Attachment(props, id)

    return attachment
  }

  get title(): string {
    return this.props.title
  }

  get link(): string {
    return this.props.link
  }
}

export { Attachment }
