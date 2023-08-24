import * as React from 'react'
import { IconMail } from '@tabler/icons-react'
import { Input } from '@/components/ui'

function MyDetails() {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex items-center justify-between">
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
        className="flex w-full flex-col divide-y divide-zinc-200 border-t border-zinc-200"
      >
        <div className="grid grid-cols-form gap-3 py-5">
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

        <div className="grid grid-cols-form gap-3 py-5">
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

        <div className="grid grid-cols-form gap-3 py-5">
          <label htmlFor="photo" className="text-sm font-medium text-zinc-700">
            Your photo
            <span className="mt-0.5 block text-sm font-normal text-zinc-500">
              This will be displayed on your profile.
            </span>
          </label>

          <div></div>
        </div>

        <div className="grid grid-cols-form gap-3 py-5">
          <label htmlFor="role" className="text-sm font-medium text-zinc-700">
            Role
          </label>

          <Input.Root>
            <Input.Control id="role" defaultValue="CTO" />
          </Input.Root>
        </div>

        <div className="grid grid-cols-form gap-3 py-5">
          <label
            htmlFor="country"
            className="text-sm font-medium text-zinc-700"
          >
            Country
          </label>

          <div></div>
        </div>

        <div className="grid grid-cols-form gap-3 py-5">
          <label
            htmlFor="timezone"
            className="text-sm font-medium text-zinc-700"
          >
            Timezone
          </label>

          <div></div>
        </div>

        <div className="grid grid-cols-form gap-3 py-5">
          <label htmlFor="bio" className="text-sm font-medium text-zinc-700">
            Bio
            <span className="mt-0.5 block text-sm font-normal text-zinc-500">
              Write a short introduction.
            </span>
          </label>

          <div></div>
        </div>

        <div className="grid grid-cols-form gap-3 py-5">
          <label
            htmlFor="projects"
            className="text-sm font-medium text-zinc-700"
          >
            Portfolio projects
            <span className="mt-0.5 block text-sm font-normal text-zinc-500">
              Share a few snippets of your work.
            </span>
          </label>

          <div></div>
        </div>

        <div className="flex items-center justify-end gap-2 py-5">
          <div />
          <div />
          <div className="flex justify-end gap-3">
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
      </form>
    </div>
  )
}

export { MyDetails }
