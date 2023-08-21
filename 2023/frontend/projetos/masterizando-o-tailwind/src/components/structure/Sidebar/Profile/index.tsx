import { IconLogout } from '@tabler/icons-react'

function Profile() {
  return (
    <div className="flex items-center gap-3">
      <div>Hello</div>

      <div className="flex flex-1 flex-col truncate">
        <span className="text-sm font-semibold text-zinc-700">Pedro H.</span>
        <span className="truncate text-sm text-zinc-500">
          pedro.lg.csewqeqweqweqweqwedsadsadasdads@gmail.com
        </span>
      </div>

      <button
        type="button"
        className="ml-auto rounded-md p-2 transition hover:bg-zinc-50"
      >
        <IconLogout className="h-5 w-5 text-zinc-500" />
      </button>
    </div>
  )
}

export { Profile }
