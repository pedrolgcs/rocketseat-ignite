type User = {
  permissions: string[];
  roles: string[];
};

type ValidateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
};

function validateUserPermissions({
  user,
  permissions = [],
  roles = [],
}: ValidateUserPermissionsParams): Boolean {
  // permissions (must have all permissions)
  if (permissions.length) {
    return permissions.every((permission) =>
      user?.permissions.includes(permission)
    );
  }

  // roles (must have one role)
  if (roles.length) {
    return roles.some((role) => user?.roles.includes(role));
  }

  return false;
}

export { validateUserPermissions };
