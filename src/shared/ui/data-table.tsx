import type { ReactNode } from "react";

export interface DataColumn<Row> {
  key: string;
  header: string;
  render: (row: Row) => ReactNode;
}

interface DataTableProps<Row> {
  columns: DataColumn<Row>[];
  rows: Row[];
  emptyTitle: string;
  emptyDescription: string;
  getRowId?: (row: Row, index: number) => string;
  isRowSelected?: (row: Row) => boolean;
}

export function DataTable<Row>({
  columns,
  rows,
  emptyTitle,
  emptyDescription,
  getRowId,
  isRowSelected,
}: DataTableProps<Row>) {
  if (!rows.length) {
    return (
      <div className="empty-state">
        <strong>{emptyTitle}</strong>
        <p>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              className={isRowSelected?.(row) ? "is-selected" : undefined}
              key={getRowId ? getRowId(row, index) : index}
            >
              {columns.map((column) => (
                <td key={column.key}>{column.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
