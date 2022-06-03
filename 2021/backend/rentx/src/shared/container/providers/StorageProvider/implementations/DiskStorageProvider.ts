import fs from 'fs';
import { resolve } from 'path';

// config
import uploadConfig from '@config/upload';

// interface
import { IStorageProvider } from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string, folder: string): Promise<string> {
    const arrayPaths = folder.split('/');

    let finalPath = uploadConfig.tmpFolder;

    arrayPaths.forEach(async path => {
      finalPath += `/${path}`;

      if (!fs.existsSync(uploadConfig.getPathFolder(finalPath))) {
        fs.mkdirSync(uploadConfig.getPathFolder(finalPath));
      }
    });

    // move file fo folder
    await fs.promises.rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(finalPath, file),
    );

    return file;
  }

  public async deleteFile(file: string, folder = ''): Promise<void> {
    const filePath = resolve(uploadConfig.tmpFolder, folder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export { DiskStorageProvider };
