import { IconCloudUpload, IconTrash } from '@tabler/icons-react'
import { tv, VariantProps } from 'tailwind-variants'
import { Button } from '@/components/ui'
import { formatBytes } from '@/utils/format-bytes'
import { useFileInput } from './Root'

const fileItem = tv({
  slots: {
    container:
      'group flex items-start gap-4 rounded-lg border border-zinc-200 p-4',
    icon: 'rounded-full border-4 border-violet-100 bg-violet-200 p-2 text-violet-600',
    deleteButton: '',
  },

  variants: {
    state: {
      progress: {
        container: '',
      },
      complete: {
        container: 'border-violet-500',
      },
      error: {
        container: 'border-error-300 bg-error-25',
        icon: 'border-error-50 bg-error-100 text-error-600',
        deleteButton: 'text-error-500 hover:text-error-700',
      },
    },
  },

  defaultVariants: {
    state: 'progress',
  },
})

type FileItemProps = VariantProps<typeof fileItem> & {
  file: File
}

function FileItem({ file, state }: FileItemProps) {
  const slots = fileItem({ state })

  const { onRemoveFile } = useFileInput()

  const handleRemoveFile = (file: File) => {
    onRemoveFile(file)
  }

  return (
    <div className={slots.container()}>
      <div className={slots.icon()}>
        <IconCloudUpload className="h-4 w-4" />
      </div>

      <div className="flex flex-1 flex-col items-start gap-1">
        <div className="flex flex-col text-sm">
          <span className="font-medium text-zinc-700">{file.name}</span>
          <span className="text-zinc-500">{formatBytes(file.size)}</span>
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={() => handleRemoveFile(file)}
        className={slots.deleteButton()}
      >
        <IconTrash className="h-5 w-5" />
      </Button>
    </div>
  )
}

export { FileItem }
