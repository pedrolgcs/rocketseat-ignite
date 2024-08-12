import { getCookie } from '@/lib/cookies'

export async function getCurrentOrganization() {
  return getCookie('@saas:org')
}
