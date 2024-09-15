import { defineAbilityFor } from '@saas/auth'

import { getMembership } from '@/http/requests/get-membership'
import { getCookie } from '@/lib/cookies'
import { getCurrentOrganization } from '@/utils/get-current-organization'

export function isAuthenticated() {
  return getCookie('@saas:token')
}

async function getCurrentMembership() {
  const currentOrganization = await getCurrentOrganization()

  if (!currentOrganization) return null

  const { membership } = await getMembership({
    slug: currentOrganization,
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
