import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import Login from "#layouts/login.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        // children: [
        //   { path: "/", element: <SaleScreen /> },
        //   { path: "/usuarios", element: <UsersScreen /> },
        //   { path: "/productos", element: <ProductsScreen /> },
        //   { path: "/clientes", element: <ClientScreen /> },
        // ],
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);