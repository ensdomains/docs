type Props = {
  authors: string[]
  created: string
  status: string
}

export function EnsipHeader({ authors, created, status }: Props) {
  return (
    <div className="ensip-header flex flex-col gap-1">
      <p>
        <strong>Authors:</strong> {authors.join(', ')}
      </p>
      <p>
        <strong>Created:</strong> {created}
      </p>
      <p>
        <strong>Status:</strong> <span className="capitalize">{status}</span>
      </p>
    </div>
  )
}
