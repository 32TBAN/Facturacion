import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@features/auth/auth-context";
import { Shell } from "@shared/ui/shell";

export function RootLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}
