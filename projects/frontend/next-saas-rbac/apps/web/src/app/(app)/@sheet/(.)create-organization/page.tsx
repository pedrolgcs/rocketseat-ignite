import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { CreateOrganizationForm } from '@/modules/organization/create-organization'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
          <SheetDescription>Fill in the organization details</SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <CreateOrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
