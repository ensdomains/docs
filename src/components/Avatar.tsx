import { cn } from '../lib/utils'

type Properties = {
  name: string
  width: number
  rounded?: boolean
}

// Keeping this in case we ever want to revert back to an RPC instead of Greg's API
// export function Avatar({ name, width, rounded }: Properties) {
//   const { data: ensAvatar } = useEnsAvatar({ name, chainId: 1 })

//   return (
//     <object
//       data={ensAvatar ?? '/img/fallback-avatar.svg'}
//       type="image/jpeg"
//       width={width}
//       height={width}
//       className={cn('aspect-square object-cover', rounded && 'rounded-full')}
//     >
//       <img src="/fallback-avatar.svg" />
//     </object>
//   )
// }

export function Avatar({ name, width, rounded }: Properties) {
  return (
    <img
      src={`https://ens-api.gregskril.com/avatar/${name}?width=${width * 2}`}
      width={width}
      height={width}
      className={cn('aspect-square object-cover', rounded && 'rounded-full')}
    />
  )
}
