import { FC } from 'react'
import { FiChevronRight } from 'react-icons/fi'

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
      className="card1 text-ens-light-text-primary outline-blue-500 hover:bg-ens-light-background-secondary/20 flex items-center gap-1.5 p-6 no-underline transition-all hover:outline-2"
      {...props}
    >
      <div className="not-prose text-ens-light-text-primary hover:bg-ens-light-background-secondary/20 flex w-full items-center gap-1.5 no-underline transition-all">
        <span className="flex w-full flex-col">
          <span className="font-bold">{title}</span>
          <span className="font-normal">{description}</span>
        </span>

        {tag && (
          <span className="bg-ens-light-yellow-surface text-ens-light-yellow-active ml-2 rounded-full px-2 text-xs">
            {tag}
          </span>
        )}
        <FiChevronRight className="text-2xl" />
      </div>
    </Card>
  )
}
