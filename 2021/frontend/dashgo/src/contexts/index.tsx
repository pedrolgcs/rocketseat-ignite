import { ReactNode } from 'react';

// contexts
import { SidebarDrawerProvider } from './SidebarDrawerContext';

type GlobalProvidersProps = {
  children: ReactNode;
};

function GlobalProviders({ children }: GlobalProvidersProps) {
  return (
    <SidebarDrawerProvider>
      {children}
    </SidebarDrawerProvider>
  );
}

export { GlobalProviders };
