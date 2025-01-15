import { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../lib/utils'

type HeadingProps = PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>

export function H1({ className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn('text-3xl sm:text-4xl font-semibold', className)}
      {...props}
    />
  )
}
