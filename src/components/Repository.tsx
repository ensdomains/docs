import { FC } from 'react'
import { FiGithub } from 'react-icons/fi'

type RepositoryType = {
  src: string
  description?: string
}

export const Repository: FC<RepositoryType> = ({ src, description }) => {
  return (
    <a
      href={`https://github.com/${src}`}
      target="_blank"
      className="mb-2 flex w-full gap-2 rounded-lg border border-grey-light p-4"
    >
      <div className="pt-0.5">
        <FiGithub />
      </div>
      <div className="space-y-1 leading-none">
        <span className="font-medium">{src}</span>
        <p className="text-sm">{description}</p>
      </div>
    </a>
  )
}
