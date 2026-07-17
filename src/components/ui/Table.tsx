import type { JSX } from 'react'

type Props = {
  columns: string[]
  rows: (string | number | JSX.Element | null)[][]
}

export function Table({ columns, rows }: Props) {
  return (
    <div className="overflow-x-auto">
      <table data-v data-ens-table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
