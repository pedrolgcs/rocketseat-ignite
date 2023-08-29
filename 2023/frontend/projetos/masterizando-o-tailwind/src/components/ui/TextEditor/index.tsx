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
import BulletList from '@tiptap/extension-bullet-list'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type TextEditorProps = {
  onValueChange: (value: string) => void
}

const TextEditor = ({ onValueChange }: TextEditorProps) => {
  const editor = useEditor({
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
    content:
      "I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.",
    editorProps: {
      attributes: {
        class:
          'rounded-lg border border-zinc-300 px-4 py-3 font-normal text-zinc-900 outline-none max-h-48',
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
    <div className="gap- flex flex-col">
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 transition hover:bg-zinc-100"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <IconBold className="h-5 w-5 text-zinc-400" />
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-zinc-100"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <IconItalic className="h-5 w-5 text-zinc-400" />
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-zinc-100"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <IconUnderline className="h-5 w-5 text-zinc-400" />
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-zinc-100"
          onClick={toggleLink}
        >
          <IconLink className="h-5 w-5 text-zinc-400" />
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-zinc-100"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <IconList className="h-5 w-5 text-zinc-400" />
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-zinc-100"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <IconListNumbers className="h-5 w-5 text-zinc-400" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

export { TextEditor }
