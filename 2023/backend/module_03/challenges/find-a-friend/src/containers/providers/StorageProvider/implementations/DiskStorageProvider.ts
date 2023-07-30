import fs from 'node:fs'
import path from 'node:path'
import { StorageProvider } from '../storage-provider'

const TMP_FOLDER = path.resolve('tmp')

function getPathFolder(folder: string): string {
  return path.resolve('tmp', folder)
}

class DiskStorageProvider implements StorageProvider {
  public async saveFile(file: string, folder: string): Promise<string> {
    const arrayPaths = folder.split('/')

    let finalPath = TMP_FOLDER

    // create folder tree
    arrayPaths.forEach(async (path) => {
      finalPath += `/${path}`

      if (!fs.existsSync(getPathFolder(finalPath))) {
        fs.mkdirSync(getPathFolder(finalPath))
      }
    })

    // move file fo folder
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(finalPath, file),
    )

    return file
  }

  public async deleteFile(file: string, folder = ''): Promise<void> {
    // const filePath = resolve(uploadConfig.tmpFolder, folder, file)
    // try {
    //   await fs.promises.stat(filePath)
    // } catch {
    //   return
    // }
    // await fs.promises.unlink(filePath)
  }
}

export { DiskStorageProvider }
