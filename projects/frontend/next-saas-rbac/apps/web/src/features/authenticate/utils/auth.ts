import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'

import { getCurrentOrganization } from '@/utils/get-current-organization'

import { getMembership } from '../http/get-membership'

export function isAuthenticated() {
  return !!cookies().get('@saas:token')?.value
}

async function getCurrentMembership() {
  const currentOrganization = await getCurrentOrganization()

  if (!currentOrganization) return null

  const { membership } = await getMembership({
    organizationSlug: currentOrganization,
  })

  return membership
}

export async function ability() {
  try {
    const membership = await getCurrentMembership()

    if (!membership) return null

    const ability = defineAbilityFor({
      __typename: 'User',
      id: membership.userId,
      role: membership.role,
    })

    return ability
  } catch (error) {
    return null
  }
}
