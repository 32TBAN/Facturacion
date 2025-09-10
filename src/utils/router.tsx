import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import ProtectedRoute from "./ProtectedRoute";
import Login from "#layouts/login.tsx";
import { UsersScreen } from "../pages/Users/UsersScreen";
import SaleScreen from "../pages/Sales/SaleScreen";
import SaleDescription from "../pages/Sales/SaleDescription";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "usuarios", element: <UsersScreen /> },
      { path: "/", element: <SaleScreen /> },
      { path: "/venta", element: <SaleDescription /> },
      // { path: "/productos", element: <ProductsScreen /> },
      //   { path: "/clientes", element: <ClientScreen /> },
    ],
  },
]);