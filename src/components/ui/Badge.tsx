import { PropsWithChildren } from 'react'

import { cn } from '../../lib/utils'

const variantStyles = {
  primary: 'border border-grey-light text-blue font-medium',
  secondary: 'text-blue bg-blue-surface',
}

type BadgeProperties = PropsWithChildren<{
  variant?: keyof typeof variantStyles
}>

export function Badge({ children, variant = 'primary' }: BadgeProperties) {
  return (
    <div
      className={cn(
        'block w-fit rounded-full px-2.5 py-1.5 leading-none',
        variantStyles[variant]
      )}
    >
      {children}
    </div>
  )
}
