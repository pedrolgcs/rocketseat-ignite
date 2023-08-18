import { FiChevronDown } from 'react-icons/fi'

function ModuleSkeleton() {
  return (
    <div className="animate-pulse flex w-full items-center gap-3 bg-zinc-800 p-4">
      <div className="flex h-10 w-10 rounded-full items-center justify-center bg-slate-700" />

      <div className="flex flex-col flex-grow gap-2 text-left">
        <div className="h-3 w-[80%] bg-slate-700 rounded-lg" />
        <div className="h-2 w-[30%] bg-slate-700 rounded-lg" />
      </div>

      <FiChevronDown className="w-5 h-5 ml-auto text-slate-700" />
    </div>
  )
}

export { ModuleSkeleton }
