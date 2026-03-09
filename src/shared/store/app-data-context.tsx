import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { computeInvoiceTotals, createInvoiceNumber } from "@shared/lib/metrics";
import { initialAppData } from "@shared/mocks/data";
import type { AppDataState, Customer, DemoUser, Invoice, Product } from "@shared/types/domain";

const STORAGE_KEY = "primeo-demo-data";

interface CreateInvoiceInput {
  customerId: string;
  salespersonId: string;
  notes: string;
  status: Invoice["status"];
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

interface AppDataContextValue {
  state: AppDataState;
  addCustomer: (customer: Omit<Customer, "id" | "totalBilled" | "lastInvoiceDate" | "status">) => void;
  addProduct: (product: Omit<Product, "id" | "status">) => void;
  addUser: (user: Omit<DemoUser, "id" | "status" | "lastAccess">) => void;
  createInvoice: (input: CreateInvoiceInput) => Invoice;
  resetDemo: () => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

function readState(): AppDataState {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as AppDataState) : initialAppData;
}

export function AppDataProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AppDataState>(() => readState());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AppDataContextValue>(
    () => ({
      state,
      addCustomer: (customer) => {
        setState((current) => ({
          ...current,
          customers: [
            {
              ...customer,
              id: `CUS-${String(current.customers.length + 1).padStart(3, "0")}`,
              totalBilled: 0,
              lastInvoiceDate: new Date().toISOString(),
              status: "active",
            },
            ...current.customers,
          ],
        }));
      },
      addProduct: (product) => {
        setState((current) => ({
          ...current,
          products: [
            {
              ...product,
              id: `PRO-${String(current.products.length + 1).padStart(3, "0")}`,
              status: "active",
            },
            ...current.products,
          ],
        }));
      },
      addUser: (user) => {
        setState((current) => ({
          ...current,
          users: [
            {
              ...user,
              id: `USR-${String(current.users.length + 1).padStart(3, "0")}`,
              status: "active",
              lastAccess: new Date().toISOString(),
            },
            ...current.users,
          ],
        }));
      },
      createInvoice: (input) => {
        const customer = state.customers.find((item) => item.id === input.customerId);
        const salesperson = state.users.find((item) => item.id === input.salespersonId);
        const lineItems = input.items.map((item, index) => {
          const product = state.products.find((candidate) => candidate.id === item.productId);
          if (!product) {
            throw new Error("Producto no encontrado");
          }

          return {
            id: `LINE-${Date.now()}-${index}`,
            productId: product.id,
            productName: product.name,
            quantity: item.quantity,
            unitPrice: product.price,
            lineTotal: item.quantity * product.price,
          };
        });

        const totals = computeInvoiceTotals(lineItems);
        const invoice: Invoice = {
          id: `INV-${String(state.invoices.length + 1).padStart(3, "0")}`,
          number: createInvoiceNumber(state.invoices),
          issuedAt: new Date().toISOString(),
          customerId: customer?.id ?? input.customerId,
          customerName: customer?.name ?? "Cliente sin nombre",
          salespersonId: salesperson?.id ?? input.salespersonId,
          salespersonName: salesperson?.name ?? "Equipo Primeo",
          status: input.status,
          subtotal: totals.subtotal,
          tax: totals.tax,
          total: totals.total,
          notes: input.notes,
          lineItems,
        };

        setState((current) => ({
          ...current,
          invoices: [invoice, ...current.invoices],
          customers: current.customers.map((item) =>
            item.id === input.customerId
              ? {
                  ...item,
                  totalBilled: item.totalBilled + invoice.total,
                  lastInvoiceDate: invoice.issuedAt,
                }
              : item,
          ),
          products: current.products.map((item) => {
            const selected = input.items.find((line) => line.productId === item.id);
            return selected
              ? {
                  ...item,
                  stock: Math.max(item.stock - selected.quantity, 0),
                }
              : item;
          }),
        }));

        return invoice;
      },
      resetDemo: () => {
        setState(initialAppData);
      },
    }),
    [state],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData debe usarse dentro de AppDataProvider");
  }

  return context;
}
