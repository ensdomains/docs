export const DNSUsageExamples = () => {
  return (
    <div
      className="grid w-full grid-cols-1 gap-2 md:grid-cols-3"
      style={{ gridAutoRows: '1fr' }}
    >
      {[
        [
          'Lens',
          'The Social Layer for Web3',
          '.lens.xyz',
          '/img/apps/lens-logo.svg',
          'rgb(255, 235, 184)',
          'rgb(39, 46, 41)',
        ],
        [
          'Coinbase Wallet',
          'Self-custody crypto wallet built by Coinbase',
          '.cb.id',
          '/img/apps/coinbase-wallet-logo.svg',
          'rgb(20, 21, 25)',
          'rgb(88, 138, 245)',
        ],
        [
          'Argent',
          'zk-sync & starknet powered smart-contract wallet',
          '.argent.xyz',
          '/img/apps/argent-logo.svg',
          '#000',
          '#FF875B',
        ],
      ].map(([title, description, domain, logo, bgColor, fgColor], index) => (
        <LinkCard
          key={index}
          title={title}
          description={description}
          domain={domain}
          logo={logo}
          bgColor={bgColor}
          fgColor={fgColor}
        />
      ))}
    </div>
  )
}

type Properties = {
  title: string
  description: string
  domain?: string
  logo: string
  bgColor: string
  fgColor: string
}

export const LinkCard = ({
  title,
  description,
  domain,
  logo,
  bgColor,
  fgColor,
}: Properties) => {
  return (
    <div
      className="flex w-full flex-col rounded-lg p-4"
      style={{
        borderColor: bgColor,
        outlineColor: fgColor,
        background: `${bgColor}`,
        color: fgColor,
      }}
    >
      <div className="mb-2 flex justify-between">
        <div className="flex aspect-square w-8 items-center">
          <img src={logo} alt={title} className="w-full" />
        </div>
        {domain && (
          <div
            className="my-auto size-fit px-2 text-xs"
            style={{ background: fgColor, color: bgColor }}
          >
            {domain}
          </div>
        )}
      </div>
      <div className="font-bold">{title}</div>
      <div className="leading-5">{description}</div>
    </div>
  )
}
