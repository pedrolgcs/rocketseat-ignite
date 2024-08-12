import type { AppAbility } from '@saas/auth'
import { useEffect, useState } from 'react'

import { ability as _ability } from '@/features/authenticate'

export function useAbility() {
  const [ability, setAbility] = useState<AppAbility | null>(null)

  useEffect(() => {
    async function getAbility() {
      const response = await _ability()
      setAbility(response)
    }

    getAbility()
  }, [])

  return { ability }
}
