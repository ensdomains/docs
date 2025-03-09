type Props = {
  columns: string[]
  rows: (string | number | JSX.Element | null)[][]
}

export function Table({ columns, rows }: Props) {
  return (
    <table className="table-auto text-sm">
      <thead>
        <tr className="border-grey-light border text-left *:px-4 *:py-2.5 *:font-semibold">
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.join('-')}
            className="border-grey-light border *:px-4 *:py-2.5"
          >
            {row.map((cell, index) => (
              <td key={index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
