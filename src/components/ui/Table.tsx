type Props = {
  columns: string[]
  rows: (string | number | null)[][]
}

export function Table({ columns, rows }: Props) {
  return (
    <table className="table-auto text-sm">
      <thead>
        <tr className="border border-grey-light text-left *:px-4 *:py-2.5 *:font-semibold">
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.join('-')}
            className="border border-grey-light *:px-4 *:py-2.5"
          >
            {row.map((cell) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
