import { Header } from '@/components/header'
import { CreateProjectForm } from '@/features/create-project'

export default function CreateProject() {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto h-full w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Create project</h1>

        <CreateProjectForm />
      </main>
    </div>
  )
}
