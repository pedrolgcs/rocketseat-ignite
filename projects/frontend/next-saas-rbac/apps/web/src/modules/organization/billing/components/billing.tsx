import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ability } from '@/modules/users/authenticate'

export async function Billing() {
  const permissions = await ability()

  const cannotGetBilling = permissions?.cannot('get', 'Billing')

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
        <CardDescription>Update your billing details</CardDescription>
      </CardHeader>

      <CardContent>
        <div>Billing</div>
      </CardContent>
    </Card>
  )
}
