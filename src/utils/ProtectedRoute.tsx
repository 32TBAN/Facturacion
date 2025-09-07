
import { useAuth } from "#utils/auth";
import Login from "../layouts/login";
import { SaleScreen } from "../pages/Sales/SaleScreen";

export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Login />;
  }
  
  return <SaleScreen/>;
}
