import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'

import { getMembership } from '../http/get-membership'

export function isAuthenticated() {
  return !!cookies().get('@saas:token')?.value
}

function getCurrentOrganization() {
  return cookies().get('@saas:org')?.value ?? null
}

async function getCurrentMembership() {
  const currentOrganization = getCurrentOrganization()

  if (!currentOrganization) {
    return null
  }

  const { membership } = await getMembership({
    organizationSlug: currentOrganization,
  })

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) return null

  const ability = defineAbilityFor({
    __typename: 'User',
    id: membership.userId,
    role: membership.role,
  })

  return ability
}
