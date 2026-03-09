export type UserRole = "Admin" | "Supervisor" | "Operador";
export type EntityStatus = "active" | "inactive" | "draft";
export type InvoiceStatus = "Pagada" | "Pendiente" | "Borrador";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: EntityStatus;
  passwordHint: string;
  lastAccess: string;
}

export interface Customer {
  id: string;
  document: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  tier: "Clave" | "Frecuente" | "Nuevo";
  totalBilled: number;
  lastInvoiceDate: string;
  status: EntityStatus;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  status: EntityStatus;
}

export interface InvoiceLineItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Invoice {
  id: string;
  number: string;
  issuedAt: string;
  customerId: string;
  customerName: string;
  salespersonId: string;
  salespersonName: string;
  status: InvoiceStatus;
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  lineItems: InvoiceLineItem[];
}

export interface AppDataState {
  users: DemoUser[];
  customers: Customer[];
  products: Product[];
  invoices: Invoice[];
}
