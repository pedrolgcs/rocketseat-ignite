import { redirect } from 'next/navigation'

import { ability } from '@/features/authenticate'
import { CreateProjectForm } from '@/features/create-project'

export default async function CreateProject() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create project</h1>
      <CreateProjectForm />
    </div>
  )
}