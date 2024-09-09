import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ability } from '@/modules/users/authenticate'
import { getCurrentOrganization } from '@/utils/get-current-organization'

import { BillingTable } from './billing-table'

export async function Billing() {
  const permissions = await ability()

  const currentOrganization = await getCurrentOrganization()

  const cannotGetBilling = permissions?.cannot('get', 'Billing')

  if (!currentOrganization) return null

  if (cannotGetBilling) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>Update your billing details</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-md font-medium text-muted-foreground">
            You don't have permission to get billing
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>
          Information about your organization costs
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Separator />

        <BillingTable slug={currentOrganization} />
      </CardContent>
    </Card>
  )
}
