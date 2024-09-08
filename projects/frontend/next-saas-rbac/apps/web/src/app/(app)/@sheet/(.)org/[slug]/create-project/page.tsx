import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { CreateProjectForm } from '@/modules/projects/create-project'

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
          <SheetDescription>Fill in the project details</SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <CreateProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
