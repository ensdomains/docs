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
      className="border-grey-light mb-2 flex w-full gap-2 rounded-lg border p-4"
    >
      <div className="pt-0.5">
        <FiGithub />
      </div>
      <div className="flex flex-col gap-1 leading-none">
        <span className="font-medium">{src}</span>
        <p className="text-sm">{description}</p>
      </div>
    </a>
  )
}
