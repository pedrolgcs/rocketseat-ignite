'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useGetCurrentOrganization } from '@/hooks/use-get-current-organization'

import { useCreateProjectMutation } from '../http/hooks/use-create-project-mutation'
import { InputErro } from './ui/input-error'

const createProjectSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
  description: z.string({ message: 'Please, provide a description.' }),
})

type CreateProjectSchema = z.infer<typeof createProjectSchema>

export function CreateProjectForm() {
  const { slug } = useGetCurrentOrganization()

  const {
    mutate: createProjectMutate,
    isError: isErrorOnCreateProject,
    isPending: isPendingOnCreateProject,
    error,
  } = useCreateProjectMutation()

  const { register, handleSubmit, formState } = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
  })

  const handleCreateProject = (data: CreateProjectSchema) => {
    const { name, description } = data

    if (!slug) return

    createProjectMutate(
      {
        name,
        description,
        organizationSlug: slug,
      },
      {
        onSuccess: () => {
          toast.success('Create project successful!')
        },
      },
    )
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(handleCreateProject)} className="space-y-4">
        {isErrorOnCreateProject && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Create project failed</AlertTitle>
            <AlertDescription>
              <p>{error.message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Project name</Label>
          <Input type="text" id="name" {...register('name')} />

          {formState.errors.name?.message && (
            <InputErro error={formState.errors.name.message} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your project"
            {...register('description')}
          />

          {formState.errors.description?.message && (
            <InputErro error={formState.errors.description.message} />
          )}
        </div>

        {isPendingOnCreateProject ? (
          <Button type="submit" className="w-full" disabled>
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
