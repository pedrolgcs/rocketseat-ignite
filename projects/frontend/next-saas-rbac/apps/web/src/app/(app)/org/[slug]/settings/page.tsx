import { Billing } from '@/features/billing'
import { ShutdownOrganization } from '@/features/shutdown-organization'
import { UpdateOrganization } from '@/features/update-organization'

export default async function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        <UpdateOrganization />

        <Billing />

        <ShutdownOrganization />
      </div>
    </div>
  )
}
