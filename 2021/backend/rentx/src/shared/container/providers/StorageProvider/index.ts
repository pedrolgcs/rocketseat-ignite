import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

// interfaces
import { IStorageProvider } from './models/IStorageProvider';

// Implementations
import { DiskStorageProvider } from './implementations/DiskStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
