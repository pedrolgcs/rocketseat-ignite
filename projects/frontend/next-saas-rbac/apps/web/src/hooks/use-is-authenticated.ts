import { useEffect, useState } from 'react'

import { isAuthenticated } from '@/modules/users/authenticate'

export function useIsAuthenticated() {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    async function getToken() {
      const token = await isAuthenticated()
      setAuthenticated(!!token)
    }

    getToken()

    return () => setAuthenticated(false)
  }, [])

  return { authenticated }
}
