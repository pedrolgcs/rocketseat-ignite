import { redirect } from 'next/navigation'

import { CreateProjectForm } from '@/modules/projects/create-project'
import { ability } from '@/modules/users/authenticate'

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
