import type { AppDataState, Invoice, Product } from "@shared/types/domain";

export function createInvoiceNumber(invoices: Invoice[]) {
  const nextNumber = invoices.length + 1;
  return `FAC-${String(nextNumber).padStart(4, "0")}`;
}

export function computeInvoiceTotals(items: Array<{ quantity: number; unitPrice: number }>) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return { subtotal, tax, total };
}

export function getDashboardMetrics(state: AppDataState) {
  const paidRevenue = state.invoices
    .filter((invoice) => invoice.status === "Pagada")
    .reduce((sum, invoice) => sum + invoice.total, 0);
  const pendingRevenue = state.invoices
    .filter((invoice) => invoice.status === "Pendiente")
    .reduce((sum, invoice) => sum + invoice.total, 0);
  const lowStock = state.products.filter((product) => product.stock <= 10).length;
  const activeCustomers = state.customers.filter((customer) => customer.status === "active").length;

  return {
    paidRevenue,
    pendingRevenue,
    lowStock,
    activeCustomers,
  };
}

export function getTopProducts(products: Product[], invoices: Invoice[]) {
  const salesMap = new Map<string, number>();

  invoices.forEach((invoice) => {
    invoice.lineItems.forEach((item) => {
      salesMap.set(item.productId, (salesMap.get(item.productId) ?? 0) + item.quantity);
    });
  });

  return products
    .map((product) => ({
      ...product,
      soldUnits: salesMap.get(product.id) ?? 0,
    }))
    .sort((left, right) => right.soldUnits - left.soldUnits)
    .slice(0, 4);
}
