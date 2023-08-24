'use client'

import * as React from 'react'
import { useFileInput } from './Root'

type ControlProps = React.ComponentProps<'input'>

function Control({ multiple, ...props }: ControlProps) {
  const { id, onFilesSelected } = useFileInput()

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return
    }

    const files = Array.from(event.target.files)

    onFilesSelected(files, multiple)
  }

  return (
    <input
      type="file"
      className="sr-only"
      id={id}
      onChange={handleFilesSelected}
      multiple={multiple}
      {...props}
    />
  )
}

export { Control }
export type { ControlProps }
