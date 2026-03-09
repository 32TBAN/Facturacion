import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@features/auth/auth-context";
import { computeInvoiceTotals } from "@shared/lib/metrics";
import { formatCurrency } from "@shared/lib/format";
import { useAppData } from "@shared/store/app-data-context";
import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import { Field, Input, Select, Textarea } from "@shared/ui/field";
import { SectionHeading } from "@shared/ui/section-heading";

interface DraftItem {
  productId: string;
  quantity: number;
}

export function InvoiceComposerPage() {
  const { state, createInvoice } = useAppData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState(state.customers[0]?.id ?? "");
  const [status, setStatus] = useState<"Pagada" | "Pendiente" | "Borrador">("Pendiente");
  const [notes, setNotes] = useState("Generada desde el flujo demo del portafolio.");
  const [items, setItems] = useState<DraftItem[]>([
    { productId: state.products[0]?.id ?? "", quantity: 1 },
  ]);

  const previewItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = state.products.find((candidate) => candidate.id === item.productId);
          if (!product) {
            return null;
          }

          return {
            ...item,
            product,
            unitPrice: product.price,
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [items, state.products],
  );

  const totals = computeInvoiceTotals(
    previewItems.map((item) => ({ quantity: item.quantity, unitPrice: item.unitPrice })),
  );

  return (
    <div className="page">
      <SectionHeading
        eyebrow="Composer"
        title="Nueva factura con flujo uniforme"
        description="El formulario se siente como un tablero de trabajo: datos esenciales, lineas editables y resumen contable al costado."
        action={
          <Button tone="ghost" onClick={() => navigate("/facturas")}>
            Volver
          </Button>
        }
      />

      <div className="composer-layout">
        <Card>
          <div className="form-grid">
            <Field label="Cliente">
              <Select onChange={(event) => setCustomerId(event.target.value)} value={customerId}>
                {state.customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Responsable">
              <Input disabled value={user?.name ?? "Equipo Primeo"} />
            </Field>

            <Field label="Estado">
              <Select onChange={(event) => setStatus(event.target.value as typeof status)} value={status}>
                <option value="Pendiente">Pendiente</option>
                <option value="Pagada">Pagada</option>
                <option value="Borrador">Borrador</option>
              </Select>
            </Field>

            <Field label="Notas">
              <Textarea onChange={(event) => setNotes(event.target.value)} rows={4} value={notes} />
            </Field>
          </div>

          <div className="composer-lines">
            {items.map((item, index) => (
              <div className="line-editor" key={`${item.productId}-${index}`}>
                <Field label={`Producto ${index + 1}`}>
                  <Select
                    onChange={(event) => {
                      const next = [...items];
                      next[index] = { ...next[index], productId: event.target.value };
                      setItems(next);
                    }}
                    value={item.productId}
                  >
                    {state.products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} · stock {product.stock}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Cantidad">
                  <Input
                    min={1}
                    onChange={(event) => {
                      const next = [...items];
                      next[index] = {
                        ...next[index],
                        quantity: Math.max(1, Number(event.target.value) || 1),
                      };
                      setItems(next);
                    }}
                    type="number"
                    value={item.quantity}
                  />
                </Field>
              </div>
            ))}

            <div className="composer-actions">
              <Button
                tone="ghost"
                onClick={() =>
                  setItems((current) => [...current, { productId: state.products[0]?.id ?? "", quantity: 1 }])
                }
              >
                Agregar linea
              </Button>
              {items.length > 1 ? (
                <Button tone="ghost" onClick={() => setItems((current) => current.slice(0, -1))}>
                  Quitar ultima
                </Button>
              ) : null}
            </div>
          </div>
        </Card>

        <Card className="summary-card">
          <p className="eyebrow">Resumen</p>
          <div className="summary-list">
            {previewItems.map((item) => (
              <article className="mini-list-row" key={item.productId}>
                <div>
                  <strong>{item.product.name}</strong>
                  <small>{item.quantity} unidades</small>
                </div>
                <strong>{formatCurrency(item.quantity * item.unitPrice)}</strong>
              </article>
            ))}
          </div>
          <div className="summary-totals">
            <div>
              <span>Subtotal</span>
              <strong>{formatCurrency(totals.subtotal)}</strong>
            </div>
            <div>
              <span>IVA</span>
              <strong>{formatCurrency(totals.tax)}</strong>
            </div>
            <div>
              <span>Total</span>
              <strong>{formatCurrency(totals.total)}</strong>
            </div>
          </div>
          <Button
            onClick={() => {
              createInvoice({
                customerId,
                salespersonId: user?.id ?? state.users[0]?.id ?? "",
                notes,
                status,
                items,
              });
              navigate("/facturas");
            }}
          >
            Guardar factura demo
          </Button>
        </Card>
      </div>
    </div>
  );
}
