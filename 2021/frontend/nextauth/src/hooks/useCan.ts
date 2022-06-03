// contexts
import { useAuth } from '../contexts/AuthContext';

// utils
import { validateUserPermissions } from '../utils/auth/validateUserPermissions';

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

function useCan({ permissions, roles }: UseCanParams) {
  const { user } = useAuth();

  // auth
  if (!user) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
}

export { useCan };
