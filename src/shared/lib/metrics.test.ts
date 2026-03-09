import { describe, expect, it } from "vitest";
import { computeInvoiceTotals, createInvoiceNumber } from "@shared/lib/metrics";

describe("metrics helpers", () => {
  it("computes invoice totals with tax", () => {
    const totals = computeInvoiceTotals([
      { quantity: 2, unitPrice: 10 },
      { quantity: 1, unitPrice: 5 },
    ]);

    expect(totals.subtotal).toBe(25);
    expect(totals.tax).toBe(3);
    expect(totals.total).toBe(28);
  });

  it("creates sequential invoice numbers", () => {
    const number = createInvoiceNumber([
      {
        id: "INV-001",
        number: "FAC-0001",
        issuedAt: new Date().toISOString(),
        customerId: "C1",
        customerName: "Cliente",
        salespersonId: "U1",
        salespersonName: "Usuario",
        status: "Pagada",
        subtotal: 10,
        tax: 1.2,
        total: 11.2,
        notes: "",
        lineItems: [],
      },
    ]);

    expect(number).toBe("FAC-0002");
  });
});
