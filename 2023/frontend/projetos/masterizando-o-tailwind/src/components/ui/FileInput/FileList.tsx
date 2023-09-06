'use client'

import * as React from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FileItem } from './FileItem'
import { useFileInput } from './Root'

function FileList() {
  const { files } = useFileInput()

  const [parent] = useAutoAnimate()

  return (
    <div ref={parent} className="mt-4 space-y-3">
      {files.map((file) => (
        <FileItem key={file.name} file={file} state="complete" />
      ))}
    </div>
  )
}

export { FileList }
