import { PropsWithChildren } from 'react'

import { cn } from '../../lib/utils'

type Props = PropsWithChildren<
  | ({
      as: 'a'
    } & React.AnchorHTMLAttributes<HTMLLinkElement>)
  | ({
      as: 'div'
    } & React.HTMLAttributes<HTMLDivElement>)
>

export function Card({ as = 'div', children, className, ...props }: Props) {
  const Component = as as React.ElementType

  return (
    <Component
      className={cn('rounded-lg border border-grey-light p-6', className)}
      {...props}
    >
      {children}
    </Component>
  )
}
