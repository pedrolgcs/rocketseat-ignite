'use client'

import { XCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useGetCurrentOrganization } from '@/hooks/use-get-current-organization'

import { useShutdownOrganizationMutation } from '../hooks/use-shutdown-organization-mutation'

export function ShutdownOrganizationButton() {
  const router = useRouter()

  const { slug } = useGetCurrentOrganization()

  const {
    mutate: shutdownOrganization,
    isPending,
    error,
  } = useShutdownOrganizationMutation()

  const handleShutdownOrganization = () => {
    if (!slug) return

    shutdownOrganization(
      { organizationSlug: slug },
      {
        onSuccess: () => {
          router.push('/')
        },
      },
    )
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

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="button" variant="destructive" className="w-56">
            <XCircleIcon className="mr-2 size-4" />
            Shutdown organization
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              organization and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleShutdownOrganization}
              disabled={isPending}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
