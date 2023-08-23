import * as React from 'react'
import { IconMail } from '@tabler/icons-react'
import { Input } from '@/components/ui'

function MyDetails() {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Personal Info</h2>
          <span className="text-sm text-zinc-500">
            Update your photo and personal details here.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
            form="settings-form"
          >
            Save
          </button>
        </div>
      </div>

      <form
        id="settings-form"
        className="flex w-full flex-col gap-5 divide-y divide-zinc-200"
      >
        <div className="grid-cols-form grid gap-3">
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-zinc-700"
          >
            Name
          </label>

          <div className="grid grid-cols-2 gap-6">
            <Input.Root>
              <Input.Control id="firstName" defaultValue="Pedro" />
            </Input.Root>

            <Input.Root>
              <Input.Control defaultValue="Henrique" />
            </Input.Root>
          </div>
        </div>

        <div className="grid-cols-form grid gap-3 pt-5">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email address
          </label>

          <Input.Root>
            <Input.Prefix>
              <IconMail className="h-5 w-5 text-zinc-500" />
            </Input.Prefix>
            <Input.Control
              id="email"
              type="email"
              defaultValue="pedro.lg.cs@gmail.com"
            />
          </Input.Root>
        </div>
      </form>
    </div>
  )
}

export { MyDetails }
