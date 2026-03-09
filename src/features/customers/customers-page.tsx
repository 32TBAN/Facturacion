import { useMemo, useState } from "react";
import { formatCurrency, formatDate } from "@shared/lib/format";
import { useAppData } from "@shared/store/app-data-context";
import type { Customer } from "@shared/types/domain";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import { DataTable, type DataColumn } from "@shared/ui/data-table";
import { Field, Input, Select } from "@shared/ui/field";
import { Panel } from "@shared/ui/panel";
import { SectionHeading } from "@shared/ui/section-heading";

export function CustomersPage() {
  const { state, addCustomer } = useAppData();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Customer | null>(state.customers[0] ?? null);
  const [form, setForm] = useState({
    document: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    tier: "Nuevo" as Customer["tier"],
  });

  const rows = useMemo(
    () =>
      state.customers.filter((customer) =>
        [customer.name, customer.document, customer.email, customer.tier]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query, state.customers],
  );

  const columns: DataColumn<Customer>[] = [
    {
      key: "name",
      header: "Cuenta",
      render: (row) => (
        <button className="row-anchor" onClick={() => setSelected(row)} type="button">
          <strong>{row.name}</strong>
          <small>{row.document}</small>
        </button>
      ),
    },
    { key: "tier", header: "Segmento", render: (row) => row.tier },
    { key: "contact", header: "Contacto", render: (row) => row.email },
    { key: "billed", header: "Facturado", render: (row) => formatCurrency(row.totalBilled) },
    {
      key: "status",
      header: "Estado",
      render: (row) => <Badge tone={row.status === "active" ? "success" : "neutral"}>{row.status}</Badge>,
    },
  ];

  return (
    <div className="page page-with-panel">
      <div className="page-main">
        <SectionHeading
          eyebrow="Relacion comercial"
          title="Clientes ordenados como cartera, no como lista plana"
          description="El modulo enfatiza valor, continuidad y contexto de contacto."
        />

        <Card>
          <div className="toolbar">
            <input
              className="control"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, documento o correo"
              type="search"
              value={query}
            />
          </div>
          <DataTable
            columns={columns}
            rows={rows}
            emptyDescription="No se encontraron cuentas con ese criterio."
            emptyTitle="Sin resultados en clientes."
            getRowId={(row) => row.id}
            isRowSelected={(row) => row.id === selected?.id}
          />
        </Card>
      </div>

      <Panel
        description="Alta rapida con datos suficientes para un demo verosimil y bien tipado."
        title={selected ? selected.name : "Nuevo cliente"}
      >
        {selected ? (
          <div className="detail-stack">
            <div className="detail-grid">
              <div>
                <span>Documento</span>
                <strong className="detail-value-wrap">{selected.document}</strong>
              </div>
              <div>
                <span>Telefono</span>
                <strong className="detail-value-wrap">{selected.phone}</strong>
              </div>
              <div>
                <span>Correo</span>
                <strong className="detail-value-wrap">{selected.email}</strong>
              </div>
              <div>
                <span>Ultima factura</span>
                <strong className="detail-value-wrap">{formatDate(selected.lastInvoiceDate)}</strong>
              </div>
            </div>
            <p className="panel-note">{selected.address}</p>
          </div>
        ) : null}

        <div className="panel-form">
          <Field label="Nombre">
            <Input onChange={(event) => setForm({ ...form, name: event.target.value })} value={form.name} />
          </Field>
          <Field label="Documento">
            <Input
              onChange={(event) => setForm({ ...form, document: event.target.value })}
              value={form.document}
            />
          </Field>
          <Field label="Correo">
            <Input onChange={(event) => setForm({ ...form, email: event.target.value })} value={form.email} />
          </Field>
          <Field label="Telefono">
            <Input onChange={(event) => setForm({ ...form, phone: event.target.value })} value={form.phone} />
          </Field>
          <Field label="Direccion">
            <Input
              onChange={(event) => setForm({ ...form, address: event.target.value })}
              value={form.address}
            />
          </Field>
          <Field label="Segmento">
            <Select
              onChange={(event) => setForm({ ...form, tier: event.target.value as Customer["tier"] })}
              value={form.tier}
            >
              <option value="Clave">Clave</option>
              <option value="Frecuente">Frecuente</option>
              <option value="Nuevo">Nuevo</option>
            </Select>
          </Field>
          <Button
            onClick={() => {
              if (!form.name || !form.document || !form.email) {
                return;
              }

              addCustomer(form);
              setForm({
                document: "",
                name: "",
                email: "",
                phone: "",
                address: "",
                tier: "Nuevo",
              });
            }}
          >
            Guardar cliente
          </Button>
        </div>
      </Panel>
    </div>
  );
}
