'use client'

import { XCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useGetCurrentOrganization } from '@/hooks/use-get-current-organization'

import { useShutdownOrganizationMutation } from '../hooks/use-shutdown-organization-mutation'

export function ShutdownOrganizationButton() {
  const router = useRouter()

  const { slug } = useGetCurrentOrganization()

  const {
    mutateAsync: shutdownOrganization,
    isPending,
    error,
  } = useShutdownOrganizationMutation()

  const handleShutdownOrganization = async () => {
    if (!slug) return
    await shutdownOrganization({ organizationSlug: slug })
    router.push('/')
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <Alert className="w-full" variant="destructive">
          <AlertTitle>Ops! Something went wrong, please try again</AlertTitle>

          <AlertDescription>
            <p>{error.message}</p>
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="button"
        variant="destructive"
        className="w-56"
        onClick={handleShutdownOrganization}
        disabled={isPending}
      >
        <XCircleIcon className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </div>
  )
}
