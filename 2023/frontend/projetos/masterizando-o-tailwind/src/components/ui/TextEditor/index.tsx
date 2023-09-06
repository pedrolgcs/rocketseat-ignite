'use client'

import * as React from 'react'
import {
  IconBold,
  IconItalic,
  IconLink,
  IconList,
  IconListNumbers,
  IconUnderline,
} from '@tabler/icons-react'
import { Editor } from '@tiptap/core'
import BulletList from '@tiptap/extension-bullet-list'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui'
import { cn } from '@/lib/tw-merge'

type TextEditorProps = {
  name: string
  onChangeContent?: (value: string) => void
  defaultContent?: Content
}

const TextEditor = ({
  name,
  defaultContent,
  onChangeContent,
}: TextEditorProps) => {
  const handleChangeTextEditorContent = (editor: Editor) => {
    if (onChangeContent) onChangeContent(editor.getHTML())
  }

  const editor = useEditor({
    onCreate: ({ editor }) => {
      handleChangeTextEditorContent(editor)
    },
    onUpdate: ({ editor }) => {
      handleChangeTextEditorContent(editor)
    },
    content: defaultContent,
    extensions: [
      StarterKit,
      ListItem,
      Link.configure({
        autolink: false,
        protocols: ['http', 'https', 'mailto', 'tel'],
        HTMLAttributes: {
          class:
            'text-violet-500 transition hover:text-violet-700 underline cursor-pointer italic',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc pl-8 py-4',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal pl-8 py-4',
        },
      }),
      Underline,
    ],
    editorProps: {
      attributes: {
        class: cn(
          'rounded-lg border border-zinc-300 px-4 py-3 font-normal text-zinc-900 outline-none focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100',
          'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus-within:border-violet-500 dark:focus-within:ring-violet-500/20',
        ),
      },
    },
  })

  const toggleLink = React.useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href

    if (previousUrl) {
      return editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    }

    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    }

    if (url === '') {
      return editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return <div>loading...</div>
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <IconBold className="h-5 w-5 text-zinc-400" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <IconItalic className="h-5 w-5 text-zinc-400" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <IconUnderline className="h-5 w-5 text-zinc-400" />
        </Button>

        <Button type="button" variant="ghost" onClick={toggleLink}>
          <IconLink className="h-5 w-5 text-zinc-400" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <IconList className="h-5 w-5 text-zinc-400" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <IconListNumbers className="h-5 w-5 text-zinc-400" />
        </Button>
      </div>

      <EditorContent editor={editor} name={name} />
    </div>
  )
}

export { TextEditor }
