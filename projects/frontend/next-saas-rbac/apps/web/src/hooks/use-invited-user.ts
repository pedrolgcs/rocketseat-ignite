import { useEffect, useState } from 'react'

import { getCookie } from '@/lib/cookies'

export function useInvitedUser() {
  const [isInvited, setIsInvited] = useState<boolean>(false)
  const [inviteId, setInviteId] = useState<string | null>(null)

  useEffect(() => {
    async function getInvitedToken() {
      const token = await getCookie('@saas:invited-id')

      if (token) setInviteId(token)
      setIsInvited(!!token)
    }

    getInvitedToken()

    return () => {
      setIsInvited(false)
      setInviteId(null)
    }
  }, [])

  return { isInvited, inviteId }
}
