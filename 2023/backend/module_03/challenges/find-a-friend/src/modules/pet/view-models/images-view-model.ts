import { uploadConfig } from '@/config/upload'
import { env } from '@/env'
import { Image } from '@/modules/pet/entities'

class ImagesViewModel {
  static toHTTP(images: Image[]) {
    const driverConfig = uploadConfig[env.STORAGE_DRIVER]

    return images.map((item) => {
      return {
        id: item.id,
        name: item.name,
        url: `${driverConfig.baseURL}/pets/${item.petId}/${item.name}`,
      }
    })
  }
}

export { ImagesViewModel }
