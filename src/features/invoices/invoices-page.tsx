import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "@shared/lib/format";
import { useAppData } from "@shared/store/app-data-context";
import type { Invoice } from "@shared/types/domain";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import { DataTable, type DataColumn } from "@shared/ui/data-table";
import { Panel } from "@shared/ui/panel";
import { SectionHeading } from "@shared/ui/section-heading";

export function InvoicesPage() {
  const { state } = useAppData();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Invoice | null>(state.invoices[0] ?? null);

  const rows = useMemo(
    () =>
      state.invoices.filter((invoice) =>
        [invoice.number, invoice.customerName, invoice.salespersonName, invoice.status]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query, state.invoices],
  );

  const columns: DataColumn<Invoice>[] = [
    {
      key: "number",
      header: "Documento",
      render: (row) => (
        <button className="row-anchor" onClick={() => setSelected(row)} type="button">
          <strong>{row.number}</strong>
          <small>{formatDate(row.issuedAt)}</small>
        </button>
      ),
    },
    { key: "customer", header: "Cliente", render: (row) => row.customerName },
    { key: "owner", header: "Responsable", render: (row) => row.salespersonName },
    {
      key: "status",
      header: "Estado",
      render: (row) => (
        <Badge
          tone={row.status === "Pagada" ? "success" : row.status === "Pendiente" ? "warning" : "neutral"}
        >
          {row.status}
        </Badge>
      ),
    },
    { key: "total", header: "Total", render: (row) => formatCurrency(row.total) },
  ];

  return (
    <div className="page page-with-panel">
      <div className="page-main">
        <SectionHeading
          eyebrow="Modulo principal"
          title="Facturas con lectura clara y accion inmediata"
          description="La tabla se comporta como registro central. El panel lateral evita navegar a una pantalla de detalle innecesaria."
          action={<Button onClick={() => navigate("/facturas/nueva")}>Nueva factura</Button>}
        />

        <Card>
          <div className="toolbar">
            <input
              className="control"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por cliente, numero o responsable"
              type="search"
              value={query}
            />
          </div>
          <DataTable
            columns={columns}
            rows={rows}
            emptyDescription="Prueba otro criterio o genera una nueva factura en el demo."
            emptyTitle="No hay facturas para ese filtro."
            getRowId={(row) => row.id}
            isRowSelected={(row) => row.id === selected?.id}
          />
        </Card>
      </div>

      <Panel
        description={
          selected
            ? "Resumen contable y detalle de articulos sin abandonar la lista."
            : "Selecciona una factura para ver el detalle."
        }
        title={selected ? selected.number : "Sin seleccion"}
      >
        {selected ? (
          <div className="detail-stack">
            <div className="detail-grid">
              <div>
                <span>Cliente</span>
                <strong>{selected.customerName}</strong>
              </div>
              <div>
                <span>Responsable</span>
                <strong>{selected.salespersonName}</strong>
              </div>
              <div>
                <span>Fecha</span>
                <strong>{formatDate(selected.issuedAt)}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>{formatCurrency(selected.total)}</strong>
              </div>
            </div>
            <div className="mini-list">
              {selected.lineItems.map((item) => (
                <article className="mini-list-row" key={item.id}>
                  <div className="detail-primary">
                    <strong>{item.productName}</strong>
                    <small className="detail-meta">{item.quantity} unidades</small>
                  </div>
                  <strong className="detail-value">{formatCurrency(item.lineTotal)}</strong>
                </article>
              ))}
            </div>
            <p className="panel-note">{selected.notes}</p>
          </div>
        ) : null}
      </Panel>
    </div>
  );
}
