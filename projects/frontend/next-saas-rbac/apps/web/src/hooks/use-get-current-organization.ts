import { useEffect, useState } from 'react'

import { getCurrentOrganization } from '@/utils/get-current-organization'

export function useGetCurrentOrganization() {
  const [slug, setSlug] = useState<string | null>(null)

  useEffect(() => {
    async function getOrganization() {
      const organization = await getCurrentOrganization()
      if (!organization) return null
      setSlug(organization.toString())
    }

    getOrganization()

    return () => setSlug(null)
  }, [])

  return { slug }
}
