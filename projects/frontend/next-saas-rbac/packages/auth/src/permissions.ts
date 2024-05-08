import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from './index'
import { User } from './models/user'
import { Role } from './role'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (user, { can }) => {
    can('manage', 'all')
  },
  MEMBER: (user, { can }) => {
    can('manage', 'Project')
  },
  BILLING: () => {},
}
