import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypt from 'crypto';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;

  getPathFolder(folder: string): string;

  multer: {
    upload(): { storage: StorageEngine };
  };

  config: {
    disk: Record<string, unknown>;
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tmpFolder: path.resolve(__dirname, '..', '..', 'tmp'),

  getPathFolder(folder: string): string {
    return path.resolve(__dirname, '..', '..', 'tmp', folder);
  },

  multer: {
    upload(): { storage: StorageEngine } {
      return {
        storage: multer.diskStorage({
          destination: path.resolve(__dirname, '..', '..', 'tmp'),
          filename: (request, file, cb) => {
            const fileHash = crypt.randomBytes(16).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`.replace(
              /\s/g,
              '',
            );
            return cb(null, fileName);
          },
        }),
      };
    },
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUploadConfig;
