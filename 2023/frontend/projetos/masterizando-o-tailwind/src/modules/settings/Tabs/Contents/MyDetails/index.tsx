import * as React from 'react'
import { IconFlag, IconMail } from '@tabler/icons-react'
import { CountrySelect } from '@/components/structure'
import { Input, FileInput, Select } from '@/components/ui'

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
        {/* ---- Name ---- */}
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
              <Input.Control id="lastName" defaultValue="Henrique" />
            </Input.Root>
          </div>
        </div>

        {/* ---- Email ---- */}
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
              autoComplete="email"
              defaultValue="pedro.lg.cs@gmail.com"
            />
          </Input.Root>
        </div>

        {/* ---- Photo ---- */}
        <div className="grid grid-cols-form gap-3 py-5">
          <label className="text-sm font-medium text-zinc-700" htmlFor="photo">
            Your photo
            <span className="mt-0.5 block text-sm font-normal text-zinc-500">
              This will be displayed on your profile.
            </span>
          </label>

          <FileInput.Root id="photo" className="flex items-start gap-5">
            <FileInput.ImagePreview />
            <FileInput.Trigger>
              SVG, PNG, JPG or GIF (max. 800x400px)
            </FileInput.Trigger>
            <FileInput.Control />
          </FileInput.Root>
        </div>

        {/* ---- Role ---- */}
        <div className="grid grid-cols-form gap-3 py-5">
          <label htmlFor="role" className="text-sm font-medium text-zinc-700">
            Role
          </label>

          <Input.Root>
            <Input.Control id="role" defaultValue="CTO" />
          </Input.Root>
        </div>

        {/* ---- Country ---- */}
        <div className="grid grid-cols-form gap-3 py-5">
          <label
            htmlFor="country"
            className="text-sm font-medium text-zinc-700"
          >
            Country
          </label>

          {/* <CountrySelect /> */}
          <div></div>
        </div>

        {/* ---- Timezone ---- */}
        <div className="grid grid-cols-form gap-3 py-5">
          <label
            htmlFor="timezone"
            className="text-sm font-medium text-zinc-700"
          >
            Timezone
          </label>

          {/* <Select.Root name="timezone">
            <Select.Trigger>
              <Select.Value placeholder="Select your timezone..." />
            </Select.Trigger>

            <Select.Content>
              <Select.Item value="America/Sao_Paulo">
                <Select.ItemText>
                  <Select.ItemPrefix>
                    <IconFlag />
                  </Select.ItemPrefix>
                  America / Sao Paulo
                </Select.ItemText>
              </Select.Item>
            </Select.Content>
          </Select.Root> */}
        </div>

        {/* ---- Bio ---- */}
        <div className="grid grid-cols-form gap-3 py-5">
          <label htmlFor="bio" className="text-sm font-medium text-zinc-700">
            Bio
            <span className="mt-0.5 block text-sm font-normal text-zinc-500">
              Write a short introduction.
            </span>
          </label>

          <Input.Root>
            <Input.Control id="bio" defaultValue="Born in Brazil" />
          </Input.Root>
        </div>

        {/* ---- Portfolio projects ---- */}
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

          <FileInput.Root id="projects">
            <FileInput.Trigger />
            <FileInput.Control multiple />
            <FileInput.FileList />
          </FileInput.Root>
        </div>

        {/* ---- Action buttons ---- */}
        <div className="flex items-center justify-end gap-2 py-5">
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
