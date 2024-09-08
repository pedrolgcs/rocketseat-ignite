import { Header } from '@/components/header'
import { CreateOrganizationForm } from '@/modules/organization/create-organization'

export default function CreateOrganizationPage() {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto h-full w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Create organization</h1>
        <CreateOrganizationForm />
      </main>
    </div>
  )
}
