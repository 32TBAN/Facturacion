import { formatCurrency, formatDate, formatRelativeLabel } from "@shared/lib/format";
import { getDashboardMetrics, getTopProducts } from "@shared/lib/metrics";
import { useAppData } from "@shared/store/app-data-context";
import { Badge } from "@shared/ui/badge";
import { Card } from "@shared/ui/card";
import { MetricCard } from "@shared/ui/metric-card";
import { SectionHeading } from "@shared/ui/section-heading";

export function DashboardPage() {
  const { state } = useAppData();
  const metrics = getDashboardMetrics(state);
  const topProducts = getTopProducts(state.products, state.invoices);
  const latestInvoices = state.invoices.slice(0, 2);
  const topCustomers = [...state.customers]
    .sort((left, right) => right.totalBilled - left.totalBilled)
    .slice(0, 2);

  return (
    <div className="page">
      <SectionHeading
        eyebrow="Resumen operativo"
        title="Una lectura rapida del negocio demo"
        description="Corte breve de facturacion, ritmo comercial e inventario."
      />

      <div className="metric-grid">
        <MetricCard
          label="Facturacion cobrada"
          value={formatCurrency(metrics.paidRevenue)}
          detail="Ingresos ya cerrados en el demo"
        />
        <MetricCard
          label="Por cobrar"
          value={formatCurrency(metrics.pendingRevenue)}
          detail="Facturas pendientes de confirmacion"
        />
        <MetricCard
          label="Clientes activos"
          value={String(metrics.activeCustomers)}
          detail="Cuentas con movimiento reciente"
        />
        <MetricCard
          label="Stock critico"
          value={String(metrics.lowStock)}
          detail="Productos por debajo del umbral de 10 unidades"
        />
      </div>

      <div className="dashboard-grid">
        <Card>
          <SectionHeading
            eyebrow="Actividad reciente"
            title="Ritmo de emision"
            description="Las dos facturas clave del ciclo actual."
          />
          <div className="timeline">
            {latestInvoices.map((invoice) => (
              <article className="timeline-item" key={invoice.id}>
                <div>
                  <strong>{invoice.number}</strong>
                  <p>{invoice.customerName}</p>
                </div>
                <div>
                  <Badge
                    tone={
                      invoice.status === "Pagada"
                        ? "success"
                        : invoice.status === "Pendiente"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {invoice.status}
                  </Badge>
                  <small>
                    {formatDate(invoice.issuedAt)} · {formatCurrency(invoice.total)}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeading
            eyebrow="Foco comercial"
            title="Productos y cuentas clave"
            description="Lectura corta de movimiento y valor."
          />
          <div className="list-stack compact-stack">
            {topProducts.map((product) => (
              <article className="list-row" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <p>
                    {product.category} · stock {product.stock}
                  </p>
                </div>
                <div>
                  <strong>{product.soldUnits} uds.</strong>
                  <small>{formatCurrency(product.price)}</small>
                </div>
              </article>
            ))}
          </div>
          <div className="customer-inline-list">
            {topCustomers.map((customer) => (
              <article className="customer-tile compact" key={customer.id}>
                <span>{customer.tier}</span>
                <strong>{customer.name}</strong>
                <small>
                  Ultima factura {formatRelativeLabel(customer.lastInvoiceDate)} ·{" "}
                  {formatCurrency(customer.totalBilled)}
                </small>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
