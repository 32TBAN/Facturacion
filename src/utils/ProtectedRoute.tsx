import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "#utils/auth";

export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="facturacion/login" replace />;
  }

  return <Outlet />;
}
