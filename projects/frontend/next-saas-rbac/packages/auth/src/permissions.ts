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
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  BILLING: () => {},
}
