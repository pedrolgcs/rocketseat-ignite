import { Entity } from '@/core/domain'

export type ImageProps = {
  name: string
  petId: string
}

class Image extends Entity<ImageProps> {
  private constructor(props: ImageProps, id?: string) {
    super(props, id)
  }

  public static create(props: ImageProps, id?: string) {
    return new Image(
      {
        ...props,
      },
      id,
    )
  }

  get name(): string {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  get petId(): string {
    return this.props.petId
  }

  set petId(value: string) {
    this.props.petId = value
  }
}

export { Image }
