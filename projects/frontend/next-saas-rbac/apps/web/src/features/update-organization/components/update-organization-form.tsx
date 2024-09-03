'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetOrganizationBySlugQuery } from '@/http/hooks/use-get-organization-by-slug'
import { cn } from '@/lib/utils'

import { useUpdateOrganizationMutation } from '../http/hooks/use-update-organization-mutation'
import { InputErro } from './ui/input-error'

const updateOrganizationSchema = z
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

type UpdateOrganization = z.infer<typeof updateOrganizationSchema>

type UpdateOrganizationFormProps = {
  slug: string
}

export function UpdateOrganizationForm({ slug }: UpdateOrganizationFormProps) {
  const {
    data: organizationData,
    isLoading: isLoadingOnGetOrganization,
    isError: isErrorOnGetOrganization,
  } = useGetOrganizationBySlugQuery({ slug })

  const {
    mutate: updateOrganizationMutate,
    isError: isErrorOnUpdateOrganization,
    isPending: isPendingOnUpdateOrganization,
    error,
  } = useUpdateOrganizationMutation()

  const { handleSubmit, register, control, formState } =
    useForm<UpdateOrganization>({
      resolver: zodResolver(updateOrganizationSchema),
      values: {
        name: organizationData?.organization.name || '',
        domain: organizationData?.organization.domain || '',
        shouldAttachUsersByDomain:
          organizationData?.organization.shouldAttachUsersByDomain || false,
      },
    })

  const handleUpdateOrganization = (data: UpdateOrganization) => {
    const { name, domain, shouldAttachUsersByDomain } = data

    updateOrganizationMutate({
      name,
      organizationSlug: slug,
      domain,
      shouldAttachUsersByDomain,
    })
  }

  if (isErrorOnGetOrganization) {
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
    <div
      className={cn(
        'space-y-4',
        isLoadingOnGetOrganization && 'animate-pulse cursor-wait',
      )}
    >
      <form
        onSubmit={handleSubmit(handleUpdateOrganization)}
        className="space-y-4"
      >
        {isErrorOnUpdateOrganization && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Create organization failed</AlertTitle>
            <AlertDescription>
              <p>{error.message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Organization name</Label>
          <Input
            type="text"
            id="name"
            placeholder="name of your organization"
            {...register('name')}
          />

          {formState.errors.name?.message && (
            <InputErro error={formState.errors.name.message} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="domain">E-mail domain</Label>
          <Input
            type="text"
            inputMode="url"
            id="domain"
            placeholder="example.com"
            {...register('domain')}
          />

          {formState.errors.domain?.message && (
            <InputErro error={formState.errors.domain.message} />
          )}
        </div>

        <div className="space-y-2">
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

        {isPendingOnUpdateOrganization ? (
          <Button type="submit" className="w-full" disabled>
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
