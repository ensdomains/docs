import { FC } from 'react'
import { FiChevronRight } from 'react-icons/fi'

import { cn } from '../lib/utils'
import { Card } from './ui/Card'

type Props = {
  title: string
  tag?: string
  description: string
} & React.AnchorHTMLAttributes<HTMLLinkElement>

export const EmbedLink: FC<Props> = ({ title, description, tag, ...props }) => {
  return (
    <Card
      as="a"
      className={cn(
        'flex items-center gap-1.5 transition-all',
        props.className
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-1.5">
        <div className="flex w-full flex-col">
          <span className="font-bold">{title}</span>
          <span className="font-normal">{description}</span>
        </div>

        {tag && (
          <span className="ml-2 rounded-full bg-yellow-surface px-2 text-xs text-yellow-active">
            {tag}
          </span>
        )}

        <FiChevronRight className="text-2xl" />
      </div>
    </Card>
  )
}
