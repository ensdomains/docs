import { ComponentProps, FC, PropsWithChildren } from 'react'

import { cn } from '../../lib/utils'

const ArrowIcon: FC<ComponentProps<'svg'>> = (properties) => {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...properties}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  )
}

const variantStyles = {
  primary: 'bg-blue text-white hover:bg-blue-bright',
  disabled: 'bg-grey-light text-grey',
  destructive: 'bg-red text-white hover:bg-red-bright',
  success: 'bg-green text-white hover:bg-green-bright',
  outline:
    'ring-2 ring-inset ring-grey-active text-grey-active hover:ring-grey hover:text-grey',
}

type HrefProperties = {
  href: string
  target?: string
}

type ButtonProperties = {
  onClick: () => void
  disabled?: boolean
}

export const Button: FC<
  {
    variant?: keyof typeof variantStyles
    className?: string
    arrow?: 'left' | 'right'
    width?: 'full' | string
  } & (HrefProperties | ButtonProperties) &
    PropsWithChildren
> = ({ variant = 'primary', className, children, arrow, ...properties }) => {
  const disabled = 'disabled' in properties ? properties.disabled : false

  className = cn(
    'py-3 px-5 rounded-lg inline-flex justify-center gap-0.5 overflow-hidden text-sm font-medium transition',
    'hover:-translate-y-[1px]',
    'active:translate-y-0',
    variantStyles[variant],
    disabled &&
      'bg-grey-light text-grey hover:bg-grey-light hover:translate-y-0 hover:cursor-not-allowed',
    className
  )

  const arrowIcon = (
    <ArrowIcon
      className={cn(
        'mt-0.5 h-5 w-5',
        arrow === 'left' && '-ml-1 rotate-180',
        arrow === 'right' && '-mr-1'
      )}
    />
  )

  if ('href' in properties) {
    return (
      <a className={className} {...properties}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} {...properties}>
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </button>
  )
}
