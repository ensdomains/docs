'use client'

import { useState } from 'react'

type Param = {
  name: string
  type: string
  description: string
}

type FunctionDef = {
  name: string
  description: string
  params?: Param[]
  returns?: Param[]
}

export function ContractReference({
  functions,
}: {
  functions: FunctionDef[]
}) {
  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px',
        lineHeight: 1.6,
        tableLayout: 'fixed',
      }}
    >
      <colgroup>
        <col style={{ width: '40%' }} />
        <col style={{ width: '60%' }} />
      </colgroup>
      <tbody>
        {functions.map((fn) => (
          <FunctionRow key={fn.name} fn={fn} />
        ))}
      </tbody>
    </table>
  )
}

function FunctionRow({ fn }: { fn: FunctionDef }) {
  const hasDetails =
    (fn.params && fn.params.length > 0) ||
    (fn.returns && fn.returns.length > 0)
  const [open, setOpen] = useState(false)

  const shortName = fn.params
    ? `${fn.name}(${fn.params.map((p) => p.name).join(', ')})`
    : `${fn.name}`

  return (
    <>
      <tr
        onClick={hasDetails ? () => setOpen(!open) : undefined}
        style={{
          cursor: hasDetails ? 'pointer' : 'default',
          borderTop: '1px solid var(--ens-border)',
        }}
      >
        <td
          style={{
            padding: '10px 12px',
            verticalAlign: 'top',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {hasDetails && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  flexShrink: 0,
                  transition: 'transform 0.15s ease',
                  transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              >
                <path
                  d="M4.5 2.5L8 6L4.5 9.5"
                  stroke="var(--ens-text-secondary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {!hasDetails && <span style={{ width: '12px' }} />}
            <code
              style={{
                fontFamily: 'var(--vocs-fontFamily_code)',
                fontSize: '13px',
                color: 'var(--vocs-color_textAccent)',
                wordBreak: 'break-word',
              }}
            >
              {shortName}
            </code>
          </span>
        </td>
        <td
          style={{
            padding: '10px 12px',
            verticalAlign: 'top',
            color: 'var(--ens-text)',
          }}
        >
          {fn.description}
        </td>
      </tr>
      {open && hasDetails && (
        <tr>
          <td
            colSpan={2}
            style={{
              padding: '0 12px 14px 42px',
              borderTop: 'none',
            }}
          >
            <table
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                borderCollapse: 'collapse',
              }}
            >
              <colgroup>
                <col style={{ width: 'auto' }} />
                <col style={{ width: 'auto' }} />
                <col />
              </colgroup>
              <tbody>
                {fn.params && fn.params.length > 0 && (
                  <>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--ens-text-secondary)',
                          padding: '0 0 4px 0',
                        }}
                      >
                        Parameters
                      </td>
                    </tr>
                    {fn.params.map((p) => (
                      <ParamRow key={`p-${p.name}`} param={p} />
                    ))}
                  </>
                )}
                {fn.returns && fn.returns.length > 0 && (
                  <>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--ens-text-secondary)',
                          padding:
                            fn.params && fn.params.length > 0
                              ? '10px 0 4px 0'
                              : '0 0 4px 0',
                        }}
                      >
                        Returns
                      </td>
                    </tr>
                    {fn.returns.map((p) => (
                      <ParamRow key={`r-${p.name}`} param={p} />
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  )
}

function ParamRow({ param }: { param: Param }) {
  return (
    <tr>
      <td
        style={{
          padding: '2px 14px 2px 0',
          verticalAlign: 'top',
          whiteSpace: 'nowrap',
        }}
      >
        <code
          style={{
            fontFamily: 'var(--vocs-fontFamily_code)',
            fontSize: '12.5px',
          }}
        >
          {param.name}
        </code>
      </td>
      <td
        style={{
          padding: '2px 14px 2px 0',
          verticalAlign: 'top',
          whiteSpace: 'nowrap',
          color: 'var(--ens-text-secondary)',
        }}
      >
        <code
          style={{
            fontFamily: 'var(--vocs-fontFamily_code)',
            fontSize: '12.5px',
          }}
        >
          {param.type}
        </code>
      </td>
      <td
        style={{
          padding: '2px 0',
          verticalAlign: 'top',
          color: 'var(--ens-text-secondary)',
        }}
      >
        {param.description}
      </td>
    </tr>
  )
}
