import fs from 'node:fs'
import path from 'node:path'
import { uploadConfig } from '@/config/upload'
import { StorageProvider } from '../storage-provider'

function getPathFolder(folder: string): string {
  return path.resolve('tmp', folder)
}

class DiskStorageProvider implements StorageProvider {
  public async saveFile(file: string, folder: string): Promise<string> {
    const arrayPaths = folder.split('/')

    let finalPath = uploadConfig.publicFolder

    // create folder tree
    arrayPaths.forEach(async (path) => {
      finalPath += `/${path}`

      if (!fs.existsSync(getPathFolder(finalPath))) {
        fs.mkdirSync(getPathFolder(finalPath))
      }
    })

    // move file fo folder
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(finalPath, file),
    )

    return file
  }

  public async deleteFile(file: string, folder = ''): Promise<void> {
    const filePath = path.resolve(uploadConfig.publicFolder, folder, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

export { DiskStorageProvider }
