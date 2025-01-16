import { PropsWithChildren } from 'react'

import { cn } from '../../lib/utils'

type Props = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>

export function Card({ children, className, ...props }: Props) {
  return (
    <div
      className={cn('rounded-lg border border-grey-light px-4 py-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}
