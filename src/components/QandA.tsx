export function QandA({
  question,
  answer,
  ...props
}: {
  question: string
  answer: string
} & React.ComponentProps<'details'>) {
  return (
    <details className="border-border rounded-md border px-3 py-2" {...props}>
      <summary className="cursor-pointer font-medium">{question}</summary>
      <p className="pt-2 text-sm leading-relaxed">{answer}</p>
    </details>
  )
}
