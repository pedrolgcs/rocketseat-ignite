'use client'

import * as React from 'react'
import { IconCloudUpload, IconTrash } from '@tabler/icons-react'
import { formatBytes } from '@/utils/format-bytes'
import { useFileInput } from './Root'

function FileList() {
  const { files, onRemoveFile } = useFileInput()

  const handleRemoveFile = (file: File) => {
    onRemoveFile(file)
  }

  return (
    <div className="mt-4 space-y-3">
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

            {/* Progress bar */}
            {/* <div className="flex w-full items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-zinc-100">
                <div className="h-2 w-4/5 rounded-full bg-violet-600" />
              </div>

              <span className="text-sm font-medium text-zinc-700">80%</span>
            </div> */}
          </div>

          <button
            type="button"
            className="rounded-md p-2 hover:bg-zinc-50"
            onClick={() => handleRemoveFile(file)}
          >
            <IconTrash className="h-5 w-5 text-zinc-500" />
          </button>
        </div>
      ))}
    </div>
  )
}

export { FileList }
