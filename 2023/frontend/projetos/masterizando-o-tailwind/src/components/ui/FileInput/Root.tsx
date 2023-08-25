'use client'

import * as React from 'react'

type FileInputContentType = {
  id: string
  files: File[]
  onFilesSelected: (files: File[], isMultiple?: boolean) => void
  onRemoveFile: (file: File) => void
}

const defaultValue: FileInputContentType = {
  id: '',
  files: [],
  onFilesSelected: () => {},
  onRemoveFile: () => {},
}

const FileInputContext = React.createContext<FileInputContentType>(defaultValue)

type RootProps = React.ComponentProps<'div'>

function Root(props: RootProps) {
  const [files, setFiles] = React.useState<File[]>([])

  const id = React.useId()

  const onFilesSelected = React.useCallback(
    (files: File[], isMultiple?: boolean) => {
      if (isMultiple) {
        setFiles((state) => [...state, ...files])
      } else {
        setFiles(files)
      }
    },
    [],
  )

  const onRemoveFile = React.useCallback((file: File) => {
    setFiles((state) => state.filter((f) => f !== file))
  }, [])

  return (
    <FileInputContext.Provider
      value={{ id, files, onFilesSelected, onRemoveFile }}
    >
      <div {...props} />
    </FileInputContext.Provider>
  )
}

const useFileInput = () => React.useContext(FileInputContext)

export { Root, useFileInput }
export type { RootProps }
