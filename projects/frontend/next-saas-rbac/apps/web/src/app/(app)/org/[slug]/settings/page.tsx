import { Billing } from '@/modules/organization/billing'
import { ShutdownOrganization } from '@/modules/organization/shutdown-organization'
import { UpdateOrganization } from '@/modules/organization/update-organization'

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
