// Recreate the typography styles from Vocs so we can match it in other components
import { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../lib/utils'

type HeadingProps = PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>

export function H1({ className, ...props }: HeadingProps) {
  return <h1 className={cn('vocs_H1 vocs_Heading', className)} {...props} />
}

export function H2({ className, ...props }: HeadingProps) {
  return <h2 className={cn('vocs_H2 vocs_Heading', className)} {...props} />
}

export function H3({ className, ...props }: HeadingProps) {
  return <h3 className={cn('vocs_H3 vocs_Heading', className)} {...props} />
}

export function P({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return <p className={cn('vocs_Paragraph', className)} {...props} />
}

export function A({
  className,
  ...props
}: PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <a
      className={cn(
        'vocs_Anchor vocs_Link vocs_Link_accent_underlined',
        className
      )}
      {...props}
    />
  )
}

export function UL({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) {
  return (
    <ul className={cn('vocs_List vocs_List_unordered', className)} {...props} />
  )
}

export function LI({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLLIElement>>) {
  return <li className={cn('vocs_ListItem', className)} {...props} />
}

export function Code({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return <code className={cn('vocs_Code', className)} {...props} />
}

// Code block from Vocs with no syntax highlighting and a title section
export function CodeBlock({
  title,
  children,
  className,
}: PropsWithChildren<{
  title?: string
  className?: string
}>) {
  return (
    <div className={cn('vocs_CodeBlock', className)}>
      {title && (
        <div className="border-b border-[var(--vocs-color\_codeInlineBorder)] bg-grey-surface px-5 py-2 font-normal">
          {title}
        </div>
      )}
      <div className="vocs_Pre_wrapper">
        <pre
          tabIndex={0}
          className="shiki shiki-themes github-light github-dark-dimmed vocs_Pre"
        >
          <code className="vocs_Code">
            <span className="line vocs_Span">
              <span className="vocs_Span">{children}</span>
            </span>
          </code>
        </pre>
      </div>
    </div>
  )
}
