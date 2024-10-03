'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type Role, roleSchema } from '@saas/auth'
import { LoaderCircleIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateMemberInviteMutation } from '@/http/hooks/use-create-member-invite-mutation'

import { InputErro } from './ui/input-error'

const createInviteSchema = z.object({
  email: z
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
  role: roleSchema,
})

type CreateInviteSchema = z.infer<typeof createInviteSchema>

const ROLES: Role[] = ['ADMIN', 'MEMBER', 'BILLING']

type CreateInviteProps = {
  organization: string
}

export function CreateInviteForm({ organization }: CreateInviteProps) {
  const { mutate: createMemberInvite, isPending: isPendingOnCreateInvite } =
    useCreateMemberInviteMutation()

  const { handleSubmit, register, control, formState } =
    useForm<CreateInviteSchema>({
      resolver: zodResolver(createInviteSchema),
    })

  const handleCreateInvite = (data: CreateInviteSchema) => {
    createMemberInvite(
      {
        email: data.email,
        role: data.role,
        organization,
      },
      {
        onSuccess: () => {
          toast.success('Create invite successful!')
        },
        onError(error) {
          toast.error(error.message)
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(handleCreateInvite)} className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="space-y-1">
          <Input
            type="email"
            id="email"
            placeholder="john@example.com"
            {...register('email')}
          />

          {formState.errors.email?.message && (
            <InputErro error={formState.errors.email.message} />
          )}
        </div>

        <div className="w-32 space-y-1">
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={ROLES[0]}>
                <SelectTrigger className="w-full" id="role">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {formState.errors.role?.message && (
            <InputErro error={formState.errors.role.message} />
          )}
        </div>

        <Button type="submit" disabled={isPendingOnCreateInvite}>
          {isPendingOnCreateInvite ? (
            <LoaderCircleIcon className="size-4 animate-spin" />
          ) : (
            'Sent invite'
          )}
        </Button>
      </div>
    </form>
  )
}
