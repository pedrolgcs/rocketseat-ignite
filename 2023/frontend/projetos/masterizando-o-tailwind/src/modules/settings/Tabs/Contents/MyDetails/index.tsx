import * as React from 'react'
import { IconMail, IconWorld } from '@tabler/icons-react'
import Flag from 'react-world-flags'
import { Input, FileInput, Select, TextEditor, Button } from '@/components/ui'
import { countriesSelectOptions } from '@/utils/countries'
import { timezonesSelectOptions } from '@/utils/timezones'

function MyDetails() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900">Personal Info</h2>
          <span className="text-sm text-zinc-500">
            Update your photo and personal details here.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" type="button">
            Cancel
          </Button>

          <Button type="submit" form="settings-form">
            Save
          </Button>
        </div>
      </div>

      <form
        id="settings-form"
        className="flex w-full flex-col divide-y divide-zinc-200 border-t border-zinc-200"
      >
        {/* ---- Name ---- */}
        <div className="flex flex-col gap-3 py-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-zinc-700"
          >
            Name
          </label>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
            <Input.Root>
              <Input.Control id="firstName" defaultValue="Pedro" />
            </Input.Root>

            <div className="flex flex-col gap-3 lg:block">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-zinc-700 lg:sr-only"
              >
                Last name
              </label>

              <Input.Root>
                <Input.Control id="lastName" defaultValue="Henrique" />
              </Input.Root>
            </div>
          </div>
        </div>

        {/* ---- Email ---- */}
        <div className="flex flex-col gap-3 py-5 lg:grid lg:grid-cols-form">
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
        <div className="flex flex-col gap-3 py-5 lg:grid lg:grid-cols-form">
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
        <div className="flex flex-col gap-3 py-5 lg:grid lg:grid-cols-form">
          <label htmlFor="role" className="text-sm font-medium text-zinc-700">
            Role
          </label>

          <Input.Root>
            <Input.Control id="role" defaultValue="CTO" />
          </Input.Root>
        </div>

        {/* ---- Country ---- */}
        <div className="flex flex-col gap-3 py-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="country"
            className="text-sm font-medium text-zinc-700"
          >
            Country
          </label>

          <Select.Root name="country" autoComplete="country">
            <Select.Trigger id="country">
              <Select.Value placeholder="Select an option" />
            </Select.Trigger>

            <Select.Content>
              {countriesSelectOptions.map(({ value, label }) => (
                <Select.Item key={value} value={value}>
                  <Select.ItemText>
                    <Select.ItemPrefix>
                      <Flag
                        code={value}
                        className="h-5 w-5 rounded-full object-cover object-center"
                      />
                    </Select.ItemPrefix>

                    {label}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        {/* ---- Timezone ---- */}
        <div className="flex flex-col gap-3 py-5 lg:grid lg:grid-cols-form">
          <label
            htmlFor="timezone"
            className="text-sm font-medium text-zinc-700"
          >
            Timezone
          </label>

          <Select.Root name="timezone">
            <Select.Trigger id="timezone">
              <Select.Value placeholder="Select your timezone..." />
            </Select.Trigger>

            <Select.Content>
              {timezonesSelectOptions.map(({ value, label }) => (
                <Select.Item key={value} value={value}>
                  <Select.ItemText>
                    <Select.ItemPrefix>
                      <IconWorld className="h-5 w-5" stroke={1} />
                    </Select.ItemPrefix>
                    {label.name}
                    <Select.ItemSuffix>{label.utc}</Select.ItemSuffix>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        {/* ---- Bio ---- */}
        <div className="flex flex-col gap-3 py-5 lg:grid lg:grid-cols-form">
          <label htmlFor="bio" className="text-sm font-medium text-zinc-700">
            Bio
            <span className="mt-0.5 block text-sm font-normal text-zinc-500">
              Write a short introduction.
            </span>
          </label>

          <TextEditor
            name="bio"
            defaultContent="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
          />
        </div>

        {/* ---- Portfolio projects ---- */}
        <div className="flex flex-col gap-3 py-5 lg:grid lg:grid-cols-form">
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
            <Button type="button" variant="outline">
              Cancel
            </Button>

            <Button type="submit" form="settings-form">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export { MyDetails }
