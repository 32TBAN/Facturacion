import { useMemo, useState } from "react";
import { formatCurrency } from "@shared/lib/format";
import { useAppData } from "@shared/store/app-data-context";
import type { Product } from "@shared/types/domain";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import { DataTable, type DataColumn } from "@shared/ui/data-table";
import { Field, Input } from "@shared/ui/field";
import { Panel } from "@shared/ui/panel";
import { SectionHeading } from "@shared/ui/section-heading";

export function ProductsPage() {
  const { state, addProduct } = useAppData();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(state.products[0] ?? null);
  const [form, setForm] = useState({
    sku: "",
    name: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const rows = useMemo(
    () =>
      state.products.filter((product) =>
        [product.name, product.category, product.sku].join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    [query, state.products],
  );

  const columns: DataColumn<Product>[] = [
    {
      key: "name",
      header: "Producto",
      render: (row) => (
        <button className="row-anchor" onClick={() => setSelected(row)} type="button">
          <strong>{row.name}</strong>
          <small>{row.sku}</small>
        </button>
      ),
    },
    { key: "category", header: "Categoria", render: (row) => row.category },
    { key: "price", header: "Precio", render: (row) => formatCurrency(row.price) },
    { key: "stock", header: "Stock", render: (row) => row.stock },
    {
      key: "status",
      header: "Estado",
      render: (row) => (
        <Badge tone={row.stock <= 10 ? "warning" : "success"}>{row.stock <= 10 ? "critico" : row.status}</Badge>
      ),
    },
  ];

  return (
    <div className="page page-with-panel">
      <div className="page-main">
        <SectionHeading
          eyebrow="Catalogo"
          title="Productos como inventario vivo"
          description="Precio, stock y categoria comparten el mismo lenguaje visual para evitar ruido de interfaz."
        />
        <Card>
          <div className="toolbar">
            <input
              className="control"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por SKU, nombre o categoria"
              type="search"
              value={query}
            />
          </div>
          <DataTable
            columns={columns}
            rows={rows}
            emptyDescription="No se encontro ningun producto con ese criterio."
            emptyTitle="Sin resultados en catalogo."
            getRowId={(row) => row.id}
            isRowSelected={(row) => row.id === selected?.id}
          />
        </Card>
      </div>

      <Panel
        description="La ficha lateral conserva detalle y el alta usa un formulario breve, util para un demo de portafolio."
        title={selected ? selected.name : "Nuevo producto"}
      >
        {selected ? (
          <div className="detail-stack">
            <div className="detail-grid">
              <div>
                <span>SKU</span>
                <strong className="detail-value-wrap">{selected.sku}</strong>
              </div>
              <div>
                <span>Categoria</span>
                <strong className="detail-value-wrap">{selected.category}</strong>
              </div>
              <div>
                <span>Precio</span>
                <strong className="detail-value-wrap">{formatCurrency(selected.price)}</strong>
              </div>
              <div>
                <span>Stock</span>
                <strong className="detail-value-wrap">{selected.stock}</strong>
              </div>
            </div>
            <p className="panel-note">{selected.description}</p>
          </div>
        ) : null}

        <div className="panel-form">
          <Field label="SKU">
            <Input onChange={(event) => setForm({ ...form, sku: event.target.value })} value={form.sku} />
          </Field>
          <Field label="Nombre">
            <Input onChange={(event) => setForm({ ...form, name: event.target.value })} value={form.name} />
          </Field>
          <Field label="Categoria">
            <Input
              onChange={(event) => setForm({ ...form, category: event.target.value })}
              value={form.category}
            />
          </Field>
          <Field label="Descripcion">
            <Input
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              value={form.description}
            />
          </Field>
          <Field label="Precio">
            <Input
              min={0}
              onChange={(event) => setForm({ ...form, price: Number(event.target.value) || 0 })}
              type="number"
              value={form.price}
            />
          </Field>
          <Field label="Stock">
            <Input
              min={0}
              onChange={(event) => setForm({ ...form, stock: Number(event.target.value) || 0 })}
              type="number"
              value={form.stock}
            />
          </Field>
          <Button
            onClick={() => {
              if (!form.name || !form.sku || !form.category) {
                return;
              }

              addProduct(form);
              setForm({
                sku: "",
                name: "",
                category: "",
                description: "",
                price: 0,
                stock: 0,
              });
            }}
          >
            Guardar producto
          </Button>
        </div>
      </Panel>
    </div>
  );
}
