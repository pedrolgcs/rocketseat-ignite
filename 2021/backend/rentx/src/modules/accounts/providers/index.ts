import { container } from 'tsyringe';

// Hash
import { IHashUser } from './HashUser/models/IHashUser';
import { BCryptHashUser } from './HashUser/implementations/BCryptHashUser';

container.registerSingleton<IHashUser>('HashUser', BCryptHashUser);
