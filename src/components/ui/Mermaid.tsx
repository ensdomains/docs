import { Mermaid as MermaidZ } from 'mdx-mermaid/lib/Mermaid'
import { useEffect, useState } from 'react'

export const Mermaid = ({ ...props }: Parameters<typeof MermaidZ>[0]) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return <MermaidZ {...props} />
}
