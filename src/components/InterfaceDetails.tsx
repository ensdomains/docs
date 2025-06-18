import React from 'react'

import { Table } from './ui/Table'
import { A, Code, CodeBlock, H2, H3, LI, UL } from './ui/Typography'

export type ContractParameter = {
  name?: string
  type: string
  description: string
}

export type ContractMethod = {
  name: string
  interface: string
  usage: string
  seeMore: string
  input?: Array<ContractParameter>
  output?: Array<ContractParameter>
  events?: string[]
  examples?: React.ReactNode[]
}

export function InterfaceDetails({
  methods,
}: {
  methods: Array<ContractMethod>
}) {
  return (
    <>
      <Table
        columns={['Usage', 'Function Definition']}
        rows={methods.map((method) => [
          <A href={`#${method.interface}`} key={method.interface}>
            {method.usage}
          </A>,
          method.name,
        ])}
      />

      {methods.map((method) => {
        return (
          <div className="vocs_Content" key={method.interface}>
            <H2 id={method.interface}>{method.usage}</H2>
            <CodeBlock className="mb-4" title="Function">
              {method.name}
            </CodeBlock>

            {method.events && (
              <CodeBlock className="mb-4" title="Emitted events">
                {method.events.join('\n')}
              </CodeBlock>
            )}

            {method.seeMore && (
              <div className="mb-2">{convertEIPLinks(method.seeMore)}</div>
            )}

            <UL>
              <LI>
                <strong>Interface ID: </strong>
                <Code>{method.interface}</Code>
              </LI>
            </UL>

            {method.input && (
              <>
                <H3 id={`${method.interface}-input`}>Parameters</H3>
                <UL>
                  {method.input.map((input) => {
                    return (
                      <LI key={input.name ?? input.description}>
                        <strong>
                          {input.name
                            ? `${input.name} (${input.type})`
                            : input.type}
                          {': '}
                        </strong>
                        <span>{convertCodeTags(input.description)}</span>
                      </LI>
                    )
                  })}
                </UL>
              </>
            )}

            {method.output && (
              <>
                <H3 id={`${method.interface}-output`}>Returns</H3>
                <UL>
                  {method.output.map((output) => {
                    return (
                      <LI key={output.name ?? output.description}>
                        <strong>
                          {output.name
                            ? `${output.name} (${output.type})`
                            : output.type}
                          {': '}
                        </strong>
                        {convertCodeTags(output.description)}
                      </LI>
                    )
                  })}
                </UL>
              </>
            )}

            {method.examples &&
              method.examples.map((example, i) => (
                <React.Fragment key={`${method.interface}-example-${i}`}>
                  <H3 id={`${method.interface}-examples`}>Examples</H3>
                  {example}
                </React.Fragment>
              ))}
          </div>
        )
      })}
    </>
  )
}

// Convert any EIP/ENSIPs into links
function convertEIPLinks(string_: string) {
  return string_.split(/(EIP-\d+|ENSIP-\d+).*?/g).map((part) => {
    if (/EIP-\d+/.test(part)) {
      return (
        <A
          href={`https://eips.ethereum.org/EIPS/eip-${part.slice(4)}`}
          key={part}
        >
          {part}
        </A>
      )
    } else if (/ENSIP-\d+/.test(part)) {
      return (
        <A href={`/ensip/${part.slice(6)}`} key={part}>
          {part}
        </A>
      )
    } else {
      return part
    }
  })
}

// Convert any `` into <code>
function convertCodeTags(string_: string) {
  return string_ && string_.includes('`')
    ? string_.split(/(`[^`]+`).*?/g).map((part) => {
        return /`[^`]+`/.test(part) ? (
          <Code key={part}>{part.slice(1, -1)}</Code>
        ) : (
          part
        )
      })
    : string_ || ''
}
