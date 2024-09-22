'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateOrganizationMutation } from '@/http/hooks/use-create-organization-mutation'

import { InputErro } from './ui/input-error'

const createOrganizationSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Please, include at least 4 characters.' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (!value) return true
          const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
          return domainRegex.test(value)
        },
        { message: 'Please, provide a valid domain.' },
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === 'on' || value === true)
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }
      return true
    },
    {
      message: 'Domain is required when auto-join is enabled',
      path: ['domain'],
    },
  )

type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>

export function CreateOrganizationForm() {
  const {
    mutate: createOrganization,
    isPending: isPendingOnCreateOrganization,
    isError: isErrorOnCreateOrganization,
    error: errorOnCreateOrganization,
  } = useCreateOrganizationMutation()

  const { handleSubmit, register, control, formState } =
    useForm<CreateOrganizationSchema>({
      resolver: zodResolver(createOrganizationSchema),
    })

  const handleCreateOrganization = (data: CreateOrganizationSchema) => {
    const { name, domain, shouldAttachUsersByDomain } = data

    createOrganization(
      {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
      {
        onSuccess: () => toast.success('Create organization successful!'),
      },
    )
  }

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit(handleCreateOrganization)}
        className="space-y-4"
      >
        {isErrorOnCreateOrganization && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Create organization failed</AlertTitle>
            <AlertDescription>
              <p>{errorOnCreateOrganization.message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Organization name</Label>
          <Input type="text" id="name" {...register('name')} />

          {formState.errors.name?.message && (
            <InputErro error={formState.errors.name.message} />
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="domain">E-mail domain</Label>
          <Input
            type="text"
            id="domain"
            inputMode="url"
            placeholder="example.com"
            {...register('domain')}
          />

          {formState.errors.domain?.message && (
            <InputErro error={formState.errors.domain.message} />
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="shouldAttachUsersByDomain"
              render={({ field }) => (
                <Checkbox
                  name="shouldAttachUsersByDomain"
                  id="shouldAttachUsersByDomain"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
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

          {formState.errors.shouldAttachUsersByDomain?.message && (
            <InputErro
              error={formState.errors.shouldAttachUsersByDomain.message}
            />
          )}
        </div>

        {isPendingOnCreateOrganization ? (
          <Button type="submit" className="w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button type="submit" className="w-full ">
            Save organization
          </Button>
        )}
      </form>
    </div>
  )
}
