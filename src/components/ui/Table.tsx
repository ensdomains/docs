import type { JSX } from 'react'

type Props = {
  columns: string[]
  rows: (string | number | JSX.Element | null)[][]
}

export function Table({ columns, rows }: Props) {
  return (
    <table className="Vocs_Table">
      <thead>
        <tr className="vocs_TableRow">
          {columns.map((column) => (
            <th className="vocs_TableHeader" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.join('-')} className="vocs_TableRow">
            {row.map((cell, index) => (
              <td className="vocs_TableCell" key={index}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
