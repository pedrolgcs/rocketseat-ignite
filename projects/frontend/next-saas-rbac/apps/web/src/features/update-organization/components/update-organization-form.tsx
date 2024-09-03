'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  USE_GET_ORGANIZATIONS_QUERY_KEY,
  type UseGetOrganizationsQueryKey,
} from '@/features/select-current-project'
import { useFormState } from '@/hooks/use-form-state'
import {
  USE_GET_ORGANIZATION_BY_SLUG_QUERY_KEY,
  useGetOrganizationBySlugQuery,
  type UseGetOrganizationBySlugQueryKey,
} from '@/http/hooks/queries/use-get-organization-by-slug'
import { queryClient } from '@/lib/react-query'

import { updateOrganizationAction } from '../actions/update-organization'
import { InputErro } from './ui/input-error'
import { UpdateOrganizationSkeleton } from './update-organization-skeleton'

type UpdateOrganizationFormProps = {
  slug: string
}

export function UpdateOrganizationForm({ slug }: UpdateOrganizationFormProps) {
  const { data, isError, isLoading } = useGetOrganizationBySlugQuery({ slug })

  const [state, handleSubmit, isPending] = useFormState(
    updateOrganizationAction,
    () => {
      toast.success('Success on update organization!')

      const getOrganizationBySlugKey: UseGetOrganizationBySlugQueryKey = [
        USE_GET_ORGANIZATION_BY_SLUG_QUERY_KEY,
        slug,
      ]

      queryClient.refetchQueries({
        queryKey: getOrganizationBySlugKey,
      })

      const getOrganizationsKey: UseGetOrganizationsQueryKey = [
        USE_GET_ORGANIZATIONS_QUERY_KEY,
      ]

      queryClient.refetchQueries({
        queryKey: getOrganizationsKey,
      })
    },
  )

  if (isLoading) return <UpdateOrganizationSkeleton />

  if (isError) {
    return (
      <div className="flex items-center">
        <AlertTriangle className="size-4 text-rose-400 dark:text-rose-300" />
        <p className="ml-2 text-sm font-medium text-rose-400 dark:text-rose-300">
          Failed on fetching organization
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!state.success && state.message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Create organization failed</AlertTitle>
            <AlertDescription>
              <p>{state.message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Organization name</Label>
          <Input
            name="name"
            type="text"
            id="name"
            defaultValue={data?.organization.name}
          />

          {state.errors?.name && <InputErro error={state.errors.name[0]} />}
        </div>

        <div className="space-y-1">
          <Label htmlFor="domain">E-mail domain</Label>
          <Input
            name="domain"
            type="text"
            id="domain"
            inputMode="url"
            placeholder="example.com"
            defaultValue={data?.organization.domain || ''}
          />

          {state.errors?.domain && <InputErro error={state.errors.domain[0]} />}
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              name="shouldAttachUsersByDomain"
              id="shouldAttachUsersByDomain"
              defaultChecked={data?.organization.shouldAttachUsersByDomain}
            />
            <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
              <span className="text-sm font-medium leading-none">
                Auth-join new members
              </span>
            </label>
          </div>

          <p className="text-sm text-muted-foreground">
            This will automatically invite all members with same e-mail domain
            to this organization
          </p>

          {state.errors?.shouldAttachUsersByDomain && (
            <InputErro error={state.errors.shouldAttachUsersByDomain[0]} />
          )}
        </div>

        {isPending ? (
          <Button type="submit" className="w-full" disabled={isPending}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button type="submit" className="w-full ">
            Update organization
          </Button>
        )}
      </form>
    </div>
  )
}
