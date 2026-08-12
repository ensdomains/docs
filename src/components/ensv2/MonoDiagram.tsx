export function MonoDiagram({ content }: { content: string }) {
  return (
    <div
      style={{
        border: '1px solid var(--vocs-color_codeInlineBorder)',
        borderRadius: '8px',
      }}
    >
      <pre
        style={{
          fontFamily: 'Menlo, Monaco, Consolas, monospace',
          fontSize: '13px',
          lineHeight: 1.6,
          padding: '20px 22px',
          margin: 0,
          overflow: 'auto',
          backgroundColor: 'var(--vocs-color_codeBlockBackground)',
          borderRadius: '8px',
        }}
      >
        {content}
      </pre>
    </div>
  )
}
