import { Image } from '@/modules/pet/entities'

class ImageBuilder {
  private image: Image

  constructor(id: string = crypto.randomUUID(), petId: string) {
    this.image = Image.create(
      {
        name: 'image.jpeg',
        petId,
      },
      id,
    )
  }

  public setName(name: string): this {
    this.image.name = name
    return this
  }

  public build(): Image {
    return this.image
  }
}

export { ImageBuilder }
