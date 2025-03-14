import { PropsWithChildren } from 'react'

const Properties = ({ children }: PropsWithChildren) => {
  return <ul className="list-none divide-y divide-grey-light">{children}</ul>
}

const Property = ({
  name,
  type,
  children,
}: PropsWithChildren<{ name: string; type: string }>) => {
  return (
    <li className="py-4 text-sm first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd className="rounded border border-grey-light bg-grey-surface px-1">
          <code className="text-sm">{name}</code>
        </dd>
        <dt className="sr-only">Type</dt>
        <dd className="font-mono text-xs">{type}</dd>
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}

Properties.Property = Property

export { Properties }
