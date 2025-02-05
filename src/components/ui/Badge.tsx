import { PropsWithChildren } from 'react'

export function Badge({ children }: PropsWithChildren) {
  return (
    <div className="block w-fit rounded-full border border-grey-light p-2 font-medium leading-none text-blue">
      {children}
    </div>
  )
}
