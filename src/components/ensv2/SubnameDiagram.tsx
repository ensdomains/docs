import { useId } from 'react'
import type { ReactNode } from 'react'

import { Card } from '../ui/Card'

const BLUE = 'var(--ens-blue-primary)'
const PERMISSION = 'currentColor'
const SURFACE = 'var(--vocs-color_background)'
const MUTED = 'var(--vocs-color_text2, currentColor)'

type Kind =
  | 'records'
  | 'default'
  | 'tokens'
  | 'registrar'
  | 'permissions'
  | 'delegation'
  | 'separate-resolvers'

const descriptions: Record<
  Kind,
  { title: string; caption: string; height: number }
> = {
  records: {
    title: 'Subnames stored as resolver records',
    caption:
      'One parent token points to one resolver. Full names, including deeper subnames, map to record bundles inside that resolver. The subnames have no tokens of their own.',
    height: 320,
  },
  default: {
    title: 'A shared default record bundle',
    caption:
      'Each name without its own bundle falls back to the default bundle. Giving a name any record of its own ends fallback for that entire name.',
    height: 300,
  },
  tokens: {
    title: 'Subnames with separate token owners',
    caption:
      'The parent points to a UserRegistry. Alice and Bob own separate tokens, each pointing to the same resolver. Token ownership does not automatically grant write access to that resolver.',
    height: 380,
  },
  registrar: {
    title: 'A registrar enforces your registration policy',
    caption:
      'A registrar contract holds registration and, optionally, renewal roles on the UserRegistry. It applies your rules before calling the registry. The registry holds the tokens, and the resolver holds the records.',
    height: 380,
  },
  permissions: {
    title: 'Root roles and permissions for individual text keys',
    caption:
      'A root text role covers every text key. A role scoped to the URL key lets the bot edit that key across this resolver’s records, but not the avatar key.',
    height: 350,
  },
  delegation: {
    title: 'A delegated writer can update one field across a resolver',
    caption:
      'The payment agent can update Bitcoin addresses in both record bundles. Its BTC role does not permit changes to Ethereum addresses, but it is not restricted to a single name.',
    height: 340,
  },
  'separate-resolvers': {
    title: 'Separate resolvers limit which names a writer can change',
    caption:
      'The agent has a BTC write role only on resolver A. Alice’s records use A, while Bob’s use B. Registry entries can also be reserved without owners when only separate routing is needed.',
    height: 390,
  },
}

function Label({
  x,
  y,
  children,
  small = false,
  color = MUTED,
  anchor = 'start',
}: {
  x: number
  y: number
  children: ReactNode
  small?: boolean
  color?: string
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize={small ? 12 : 14}
      textAnchor={anchor}
    >
      {children}
    </text>
  )
}

function Node({
  x,
  y,
  width,
  height = 68,
  title,
  lines = [],
  token = false,
  highlightLine,
}: {
  x: number
  y: number
  width: number
  height?: number
  title: string
  lines?: string[]
  token?: boolean
  highlightLine?: number
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={8} fill={SURFACE} />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        fill="none"
        stroke={token ? BLUE : 'currentColor'}
        strokeOpacity={token ? 0.9 : 0.25}
        strokeWidth={token ? 1.5 : 1}
      />
      <text
        x={x + 14}
        y={y + 25}
        fill="currentColor"
        fontSize={15}
        fontWeight={600}
      >
        {title}
      </text>
      {lines.map((line, i) => (
        <Label
          key={line}
          x={x + 14}
          y={y + 47 + i * 20}
          color={i === highlightLine ? PERMISSION : MUTED}
        >
          {line}
        </Label>
      ))}
    </g>
  )
}

function Frame({
  x,
  y,
  width,
  height,
  title,
}: {
  x: number
  y: number
  width: number
  height: number
  title: string
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill="currentColor"
        fillOpacity={0.025}
        stroke="currentColor"
        strokeOpacity={0.25}
        strokeDasharray="4 4"
      />
      <Label x={x + 16} y={y + 25}>
        {title}
      </Label>
    </g>
  )
}

/** Static diagrams share the SVG/Card presentation used by the registrar graph. */
export function SubnameDiagram({ kind }: { kind: Kind }) {
  const id = useId().replace(/:/g, '')
  const { title, caption, height } = descriptions[kind]
  const pointerId = `${id}-pointer`
  const permissionId = `${id}-permission`
  const arrow = (d: string, permission = false, fallback = false) => (
    <path
      d={d}
      fill="none"
      stroke={permission ? PERMISSION : BLUE}
      strokeWidth={1.5}
      strokeDasharray={permission || fallback ? '5 4' : undefined}
      markerEnd={`url(#${permission ? permissionId : pointerId})`}
    />
  )

  let drawing: ReactNode
  if (kind === 'records' || kind === 'default' || kind === 'delegation') {
    drawing = (
      <>
        <Frame
          x={250}
          y={12}
          width={450}
          height={height - 24}
          title="Permissioned Resolver"
        />
        <Node
          x={20}
          y={52}
          width={180}
          title="wallet.eth"
          lines={['Token owned by you']}
          token
        />
        {arrow('M200 86 H250')}
        <Label x={225} y={72} small anchor="middle">
          resolver
        </Label>
        {kind === 'records' && (
          <>
            {['pay.wallet.eth', 'blog.wallet.eth', 'l2.pay.wallet.eth'].map(
              (name, i) => (
                <g key={name}>
                  <Node
                    x={270}
                    y={71 + i * 82}
                    width={170}
                    height={40}
                    title={name}
                  />
                  {arrow(`M440 ${91 + i * 82} H490`)}
                  <Node
                    x={490}
                    y={60 + i * 82}
                    width={190}
                    title={`Record ${i + 1}`}
                    lines={
                      [['ETH address'], ['Contenthash'], ['Base address']][i]
                    }
                  />
                </g>
              )
            )}
          </>
        )}
        {kind === 'default' && (
          <>
            {['alice.wallet.eth', 'bob.wallet.eth', 'carol.wallet.eth'].map(
              (name, i) => (
                <g key={name}>
                  <Node
                    x={270}
                    y={71 + i * 70}
                    width={170}
                    height={40}
                    title={name}
                  />
                  {arrow(
                    `M440 ${91 + i * 70} C468 ${91 + i * 70} 463 163 490 163`,
                    false,
                    true
                  )}
                </g>
              )
            )}
            <Label x={585} y={112} small anchor="middle">
              Fallback for the whole name
            </Label>
            <Node
              x={490}
              y={128}
              width={190}
              height={90}
              title="Default bundle"
              lines={['Website + avatar', 'Empty name: 0x00']}
            />
          </>
        )}
        {kind === 'delegation' && (
          <>
            {['alice.wallet.eth', 'bob.wallet.eth'].map((name, i) => (
              <g key={name}>
                <Node
                  x={270}
                  y={71 + i * 138}
                  width={170}
                  height={40}
                  title={name}
                />
                {arrow(`M440 ${91 + i * 138} H490`)}
                <Node
                  x={490}
                  y={60 + i * 138}
                  width={190}
                  height={100}
                  title={`Record ${i + 1}`}
                  lines={['ETH: unchanged', 'BTC: writable']}
                  highlightLine={1}
                />
              </g>
            ))}
            <Node
              x={20}
              y={228}
              width={200}
              height={90}
              title="Payment agent"
              lines={['BTC address role', 'On this resolver']}
            />
            {arrow('M220 273 H236 V134 H490', true)}
            {arrow('M236 273 H490', true)}
          </>
        )}
      </>
    )
  } else if (kind === 'tokens' || kind === 'registrar') {
    drawing = (
      <>
        <Frame x={20} y={140} width={310} height={228} title="UserRegistry" />
        <Frame
          x={460}
          y={140}
          width={240}
          height={228}
          title="Permissioned Resolver"
        />
        <Node
          x={40}
          y={26}
          width={210}
          title="wallet.eth"
          lines={['Token owned by you']}
          token
        />
        {arrow('M145 94 V140')}
        <Label x={160} y={121} small>
          subregistry
        </Label>
        {['Alice', 'Bob'].map((owner, i) => (
          <g key={owner}>
            <Node
              x={40}
              y={186 + i * 96}
              width={260}
              title={`${owner.toLowerCase()}.wallet.eth`}
              lines={[`Token owned by ${owner}`]}
              token
            />
            {arrow(`M300 ${220 + i * 96} H480`)}
            <Label x={390} y={210 + i * 96} small anchor="middle">
              resolver
            </Label>
            <Node
              x={480}
              y={186 + i * 96}
              width={200}
              title={`Record ${i + 1}`}
              lines={[i === 0 ? 'ETH address + avatar' : 'ETH address + URL']}
            />
          </g>
        ))}
        {kind === 'registrar' && (
          <>
            <Node
              x={420}
              y={26}
              width={280}
              title="Registrar contract"
              lines={['Your pricing and eligibility rules']}
            />
            {arrow('M420 60 H360 V158 H330', true)}
            <Label x={380} y={120} small>
              Register / renew
            </Label>
          </>
        )}
      </>
    )
  } else if (kind === 'permissions') {
    drawing = (
      <>
        <Frame
          x={220}
          y={20}
          width={480}
          height={310}
          title="Permissioned Resolver"
        />
        <Node
          x={245}
          y={72}
          width={430}
          title="Root resource"
          lines={['ROLE_SET_TEXT + its admin role']}
        />
        <Node
          x={245}
          y={210}
          width={195}
          title="Key: avatar"
          lines={['Avatar text records']}
        />
        <Node
          x={480}
          y={210}
          width={195}
          title="Key: url"
          lines={['URL text records']}
        />
        <Node
          x={20}
          y={72}
          width={170}
          title="Owner"
          lines={['All text keys']}
        />
        {arrow('M190 106 H245', true)}
        {arrow('M342 140 V210', true)}
        {arrow('M578 140 V210', true)}
        <Label x={460} y={179} small anchor="middle">
          Root role covers both keys
        </Label>
        <Node
          x={20}
          y={220}
          width={170}
          title="Status bot"
          lines={['URL text role']}
        />
        {arrow('M190 254 H210 V306 H578 V278', true)}
      </>
    )
  } else {
    drawing = (
      <>
        <Frame x={20} y={140} width={280} height={238} title="UserRegistry" />
        <Frame x={450} y={140} width={250} height={108} title="Resolver A" />
        <Frame
          x={450}
          y={270}
          width={250}
          height={108}
          title="Resolver B: no agent role"
        />
        <Node
          x={40}
          y={26}
          width={210}
          title="wallet.eth"
          lines={['Token owned by you']}
          token
        />
        {arrow('M145 94 V140')}
        <Label x={160} y={121} small>
          subregistry
        </Label>
        <Node
          x={450}
          y={26}
          width={250}
          title="Payment agent"
          lines={['BTC address role on A only']}
        />
        {arrow('M575 94 V140', true)}
        <Label x={590} y={121} small>
          Write permission
        </Label>
        {['Alice', 'Bob'].map((owner, i) => (
          <g key={owner}>
            <Node
              x={40}
              y={180 + i * 130}
              width={240}
              height={60}
              title={`${owner.toLowerCase()}.wallet.eth`}
              lines={[`Token owned by ${owner}`]}
              token
            />
            {arrow(`M280 ${210 + i * 130} H470`)}
            <Label x={375} y={200 + i * 130} small anchor="middle">
              resolver
            </Label>
            <Node
              x={470}
              y={180 + i * 130}
              width={210}
              height={60}
              title="Record 1"
              lines={[i === 0 ? 'BTC: writable by agent' : 'BTC: unchanged']}
              highlightLine={i === 0 ? 0 : undefined}
            />
          </g>
        ))}
      </>
    )
  }

  return (
    <figure className="my-6" aria-labelledby={`${id}-caption`}>
      <Card>
        <div
          className="overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label={`${title}. Scroll horizontally on small screens.`}
        >
          <svg
            role="img"
            aria-labelledby={`${id}-title ${id}-description`}
            viewBox={`0 0 720 ${height}`}
            width="720"
            height={height}
            style={{
              display: 'block',
              width: '100%',
              minWidth: '640px',
              height: 'auto',
            }}
          >
            <title id={`${id}-title`}>{title}</title>
            <desc id={`${id}-description`}>
              {caption} Solid blue arrows show pointers or name-to-record links.
              Dashed blue arrows show fallback. Dashed arrows in the text color
              show permissions.
            </desc>
            <defs>
              {[
                { id: pointerId, color: BLUE },
                { id: permissionId, color: PERMISSION },
              ].map((marker) => (
                <marker
                  key={marker.id}
                  id={marker.id}
                  viewBox="0 0 8 8"
                  refX="8"
                  refY="4"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M0 0 L8 4 L0 8 Z" fill={marker.color} />
                </marker>
              ))}
            </defs>
            {drawing}
          </svg>
        </div>
      </Card>
      <figcaption
        id={`${id}-caption`}
        className="mt-3 text-sm"
        style={{ color: MUTED }}
      >
        {caption}
      </figcaption>
    </figure>
  )
}
