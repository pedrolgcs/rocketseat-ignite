import { container } from 'tsyringe';

// Implementations
import { DayJsDateProvider } from './implementations/DayJsDateProvider';

// interface
import { IDateProvider } from './models/IDateProvider';

const providers = {
  dayJs: DayJsDateProvider,
};

container.registerSingleton<IDateProvider>('DateProvider', providers.dayJs);
