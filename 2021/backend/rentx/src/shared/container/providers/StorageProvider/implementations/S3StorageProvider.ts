import { S3 } from 'aws-sdk';
import { resolve } from 'path';
import fs from 'fs';
import mime from 'mime';

// config
import uploadConfig from '@config/upload';

// interfaces
import { IStorageProvider } from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  public async saveFile(file: string, folder: string): Promise<string> {
    const originalName = resolve(uploadConfig.tmpFolder, file);

    const fileBuffer = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileBuffer,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalName);

    return file;
  }

  public async deleteFile(file: string, folder?: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
