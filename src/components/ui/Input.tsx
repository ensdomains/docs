import { useEffect, useRef, useState } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { TbClipboardCopy } from 'react-icons/tb'

import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  copyButton?: boolean
  description?: string
  error?: boolean
}

export function Input(props: InputProps) {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={props.id}
        className="text-grey px-2 leading-none font-semibold"
      >
        {props.label}
      </label>

      <div className="relative">
        <input
          ref={ref}
          className={cn(
            'border-border disabled:bg-grey-light disabled:text-grey z-0 w-full rounded-md border px-4 py-3 leading-none font-normal transition-all outline-none focus-visible:border-[var(--vocs-color_borderAccent)]',
            props.copyButton && 'pr-12',
            props.error && '!border-red text-red',
            props.className
          )}
          {...props}
        />

        {props.copyButton && (
          <button
            className="!bg-background text-text-secondary hover:text-text border-border absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded border p-1 text-xs leading-none font-semibold !uppercase transition"
            onClick={async () => {
              try {
                console.log('clopied')
                await navigator.clipboard.writeText(ref.current?.value || '')
                setCopied(true)
              } catch (error) {
                console.error(error)
              }
            }}
          >
            {copied ? (
              <IoMdCheckmark size={18} />
            ) : (
              <TbClipboardCopy size={18} />
            )}
          </button>
        )}
      </div>

      {props.description && (
        <p className="px-2 text-sm font-normal">{props.description}</p>
      )}
    </div>
  )
}
