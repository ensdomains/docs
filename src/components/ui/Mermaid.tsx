import mermaid from 'mermaid'
import { useEffect, useRef } from 'react'
import { keccak256, toHex } from 'viem'

mermaid.initialize({})

export const Mermaid = ({ chart }: { chart: string }) => {
  const mermaidRef = useRef<HTMLDivElement>(null)
  const id = keccak256(toHex(chart))

  useEffect(() => {
    const initializeMermaid = async () => {
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = chart
        const { svg, bindFunctions } = await mermaid.render(
          `mermaid-diagram-${id}`,
          chart
        )
        mermaidRef.current.innerHTML = svg
        bindFunctions?.(mermaidRef.current)
      }
    }

    initializeMermaid()

    // Clean up mermaid instance when unmounting; doing nothing at the momemt
    return () => {}
  }, [chart])

  return <div id={id} ref={mermaidRef}></div>
}
