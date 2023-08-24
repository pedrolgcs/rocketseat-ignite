'use client'

import * as React from 'react'
import { IconUser } from '@tabler/icons-react'
import { useFileInput } from './Root'

function ImagePreview() {
  const { files } = useFileInput()

  const previewURL = React.useMemo(() => {
    if (files.length === 0) {
      return null
    }

    return URL.createObjectURL(files[0])
  }, [files])

  if (!previewURL) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-50">
        <IconUser className="h-8 w-8 text-violet-500" />
      </div>
    )
  }

  return (
    <img
      src={previewURL}
      alt=""
      className="h-16 w-16 rounded-full object-cover"
    />
  )
}

export { ImagePreview }
