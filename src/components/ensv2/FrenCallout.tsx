import type { PropsWithChildren } from 'react'

type Fren = 'earl' | 'bittu' | 'kuzco' | 'lili' | 'peanut'
type Variant = 'note' | 'tip' | 'warning'

const FREN_IMAGES: Record<Fren, string> = {
  earl: '/img/frens/Earl_padding.png',
  bittu: '/img/frens/Bittu_padding.png',
  kuzco: '/img/frens/Kuzco_padding.png',
  lili: '/img/frens/Lili_padding.png',
  peanut: '/img/frens/Peanut_padding.png',
}

const VARIANT_STYLES: Record<Variant, { bg: string; border: string }> = {
  note: {
    bg: 'var(--vocs-color_noteBackground, #f0f4f8)',
    border: 'var(--vocs-color_noteBorder, #d0d7de)',
  },
  tip: {
    bg: 'var(--vocs-color_tipBackground, #f0fdf4)',
    border: 'var(--vocs-color_tipBorder, #86efac)',
  },
  warning: {
    bg: 'var(--vocs-color_warningBackground, #fffbeb)',
    border: 'var(--vocs-color_warningBorder, #fcd34d)',
  },
}

interface FrenCalloutProps {
  fren: Fren
  variant?: Variant
  title?: string
}

export function FrenCallout({
  fren,
  variant = 'note',
  title,
  children,
}: PropsWithChildren<FrenCalloutProps>) {
  const style = VARIANT_STYLES[variant]
  const image = FREN_IMAGES[fren]

  return (
    <aside
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        padding: '16px',
        borderRadius: '8px',
        border: `1px solid ${style.border}`,
        backgroundColor: style.bg,
        marginBottom: '16px',
        fontSize: '14px',
        lineHeight: 1.6,
      }}
    >
      <img
        src={image}
        alt={fren}
        style={{
          width: '56px',
          height: '56px',
          objectFit: 'contain',
          flexShrink: 0,
          marginTop: '2px',
        }}
      />
      <div style={{ width: '100%' }}>
        {title && (
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>{title}</div>
        )}
        {children}
      </div>
    </aside>
  )
}
