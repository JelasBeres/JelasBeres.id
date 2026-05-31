"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, AlignLeft,
  AlignCenter, AlignRight, Link as LinkIcon, Image as ImageIcon,
  Undo, Redo
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCallback, useEffect } from 'react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const btnClass = "p-2 rounded text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
  const activeBtnClass = "p-2 rounded bg-surface-hover text-foreground transition-colors font-bold"

  return (
    <div className="flex flex-wrap gap-1 border border-border p-2 rounded-t-md bg-surface items-center">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? activeBtnClass : btnClass}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? activeBtnClass : btnClass}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? activeBtnClass : btnClass}
        title="Underline"
      >
        <UnderlineIcon size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? activeBtnClass : btnClass}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>
      
      <div className="w-px h-6 bg-border mx-1"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? activeBtnClass : btnClass}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? activeBtnClass : btnClass}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? activeBtnClass : btnClass}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </button>

      <div className="w-px h-6 bg-border mx-1"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? activeBtnClass : btnClass}
        title="Bullet List"
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? activeBtnClass : btnClass}
        title="Ordered List"
      >
        <ListOrdered size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? activeBtnClass : btnClass}
        title="Quote"
      >
        <Quote size={16} />
      </button>

      <div className="w-px h-6 bg-border mx-1"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? activeBtnClass : btnClass}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? activeBtnClass : btnClass}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? activeBtnClass : btnClass}
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>

      <div className="w-px h-6 bg-border mx-1"></div>

      <button type="button" onClick={setLink} className={editor.isActive('link') ? activeBtnClass : btnClass} title="Insert Link">
        <LinkIcon size={16} />
      </button>
      <button type="button" onClick={addImage} className={btnClass} title="Insert Image">
        <ImageIcon size={16} />
      </button>

      <div className="w-px h-6 bg-border mx-1 flex-1"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={cn(btnClass, !editor.can().chain().focus().undo().run() && "opacity-50 cursor-not-allowed")}
        title="Undo"
      >
        <Undo size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={cn(btnClass, !editor.can().chain().focus().redo().run() && "opacity-50 cursor-not-allowed")}
        title="Redo"
      >
        <Redo size={16} />
      </button>
    </div>
  )
}

export function RichTextEditor({ 
  content, 
  onChange 
}: { 
  content: string, 
  onChange: (content: string) => void 
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Write your article here...' })
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none focus:outline-none min-h-[300px] p-4 bg-background border border-border border-t-0 rounded-b-md prose-invert',
      },
    },
  })

  // Allow setting initial content properly when it's loaded asynchronously
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className="w-full relative z-0">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
