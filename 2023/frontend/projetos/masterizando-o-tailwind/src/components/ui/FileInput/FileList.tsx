'use client'

import * as React from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { IconCloudUpload, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui'
import { formatBytes } from '@/utils/format-bytes'
import { useFileInput } from './Root'

function FileList() {
  const { files, onRemoveFile } = useFileInput()

  const [parent] = useAutoAnimate()

  const handleRemoveFile = (file: File) => {
    onRemoveFile(file)
  }

  return (
    <div ref={parent} className="mt-4 space-y-3">
      {files.map((file) => (
        <div
          key={file.name}
          className="group flex items-start gap-4 rounded-lg border border-zinc-200 p-4"
        >
          <div className="rounded-full border-4 border-violet-100 bg-violet-200 p-2 text-violet-600">
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
          >
            <IconTrash className="h-5 w-5 text-zinc-500" />
          </Button>
        </div>
      ))}
    </div>
  )
}

export { FileList }
