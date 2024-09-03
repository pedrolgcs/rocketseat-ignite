'use client'

import { getCookie } from 'cookies-next'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { UseGetProjectsQueryKey } from '@/features/select-current-project'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from '../actions/create-project'
import { InputErro } from './ui/input-error'

export function CreateProjectForm() {
  const [state, handleSubmit, isPending] = useFormState(
    createProjectAction,
    () => {
      const organizationSlug = getCookie('@saas:org')

      toast.success('Success on create project!')

      if (organizationSlug) {
        const projectsQueryKey: UseGetProjectsQueryKey = [
          'organization-projects',
          organizationSlug,
        ]

        queryClient.refetchQueries({
          queryKey: projectsQueryKey,
        })
      }
    },
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!state.success && state.message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Create project failed</AlertTitle>
            <AlertDescription>
              <p>{state.message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Project name</Label>
          <Input name="name" type="text" id="name" />

          {state.errors?.name && <InputErro error={state.errors.name[0]} />}
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            placeholder="Describe your project"
          />

          {state.errors?.description && (
            <InputErro error={state.errors.description[0]} />
          )}
        </div>

        {isPending ? (
          <Button type="submit" className="w-full" disabled={isPending}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button type="submit" className="w-full ">
            Save project
          </Button>
        )}
      </form>
    </div>
  )
}
