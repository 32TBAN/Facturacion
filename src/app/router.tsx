import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@app/root-layout";
import { LoginPage } from "@features/auth/login-page";
import { CustomersPage } from "@features/customers/customers-page";
import { DashboardPage } from "@features/dashboard/dashboard-page";
import { InvoiceComposerPage } from "@features/invoices/invoice-composer-page";
import { InvoicesPage } from "@features/invoices/invoices-page";
import { ProductsPage } from "@features/products/products-page";
import { UsersPage } from "@features/users/users-page";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "facturas", element: <InvoicesPage /> },
      { path: "facturas/nueva", element: <InvoiceComposerPage /> },
      { path: "clientes", element: <CustomersPage /> },
      { path: "productos", element: <ProductsPage /> },
      { path: "usuarios", element: <UsersPage /> },
    ],
  },
]);
