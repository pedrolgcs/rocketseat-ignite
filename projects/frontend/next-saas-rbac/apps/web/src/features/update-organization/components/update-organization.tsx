import { Alert } from '@/components/ui/alert'
import { getCurrentOrganization } from '@/utils/get-current-organization'

import { UpdateOrganizationForm } from './update-organization-form'

export async function UpdateOrganization() {
  const currentOrganization = await getCurrentOrganization()

  if (!currentOrganization) {
    return <Alert variant="destructive">No organization found.</Alert>
  }

  return <UpdateOrganizationForm slug={currentOrganization} />
}
