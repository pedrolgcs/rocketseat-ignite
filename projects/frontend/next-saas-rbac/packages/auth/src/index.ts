import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { User } from './models'
import { permissions } from './permissions'
import {
  billingSubject,
  inviteSubject,
  organizationSubject,
  projectSubject,
  userSubject,
} from './subjects'

export * from './models'
export * from './subjects'

const appAbilitiesSchema = z.union([
  userSubject,
  projectSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>

const createAppAbility: CreateAbility<AppAbility> = createMongoAbility

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  const permissionsForRole = permissions[user.role]

  if (typeof permissionsForRole !== 'function') {
    throw new Error(`Permissions for role ${user.role} is not defined.`)
  }

  permissionsForRole(user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  return ability
}
