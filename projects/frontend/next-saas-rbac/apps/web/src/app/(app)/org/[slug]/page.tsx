import { ability } from '@/features/authenticate'

export default async function OrganizationProject() {
  const permissions = await ability()

  const canGetProjects = permissions?.can('get', 'Project')

  if (!canGetProjects) {
    return (
      <p className="text-md font-medium text-muted-foreground">
        You don't have permission to view projects
      </p>
    )
  }

  return (
    <div className="space-y-4 py-4">
      <main className="mx-auto w-full max-w-[1200px]">Projects</main>
    </div>
  )
}
