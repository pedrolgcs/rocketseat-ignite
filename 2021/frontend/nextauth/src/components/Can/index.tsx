import { ReactNode } from 'react';

// hooks
import { useCan } from '../../hooks/useCan';

type CanProps = {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
};

function Can({ permissions, roles, children }: CanProps) {
  const userCanSeeComponent = useCan({
    permissions,
    roles,
  });

  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
}

export { Can };
