import { Card } from './ui/Card'

export const DNSGrid = () => {
  return (
    <Card as="div">
      <div className="flex flex-wrap gap-3 p-4 pl-6 text-blue">
        {[
          '.com',
          '.xyz',
          '.nl',
          '.net',
          '.org',
          '.shop',
          '.photos',
          '.pizza',
          '.cash',
          '.money',
          '.news',
          '.info',
          '.gold',
          '.domains',
          '.social',
          '.de',
          '.city',
          '.lol',
          '.rip',
          '.company',
          '.es',
          '.network',
          '.me',
          '.us',
          '.id',
          '.fr',
          '.space',
          '.ninja',
          '.tools',
          '.wtf',
          '.capital',
          '.finance',
          '.vision',
          '.limo',
          '.link',
          '.uk',
          '.world',
          '.dev',
          '.day',
          '.fyi',
          '.cool',
        ].map((a) => (
          <span key={a}>{a}</span>
        ))}
        <span className="text-blue-light">
          and any other DNSSEC-compatible domain...
        </span>
      </div>
    </Card>
  )
}
