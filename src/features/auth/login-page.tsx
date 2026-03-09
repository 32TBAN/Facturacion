import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@features/auth/auth-context";
import { initialAppData } from "@shared/mocks/data";
import { Button } from "@shared/ui/button";
import ledgerImage from "@assets/loginImg.jpg";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [selectedEmail, setSelectedEmail] = useState(initialAppData.users[0]?.email ?? "");

  const destination = useMemo(() => {
    const state = location.state as { from?: string } | null;
    return state?.from || "/";
  }, [location.state]);

  if (isAuthenticated) {
    return <Navigate replace to={destination} />;
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="eyebrow">Primeo demos</div>
        <h1 className="login-hero-title">Facturacion con presencia editorial y estructura profesional.</h1>
        <p className="lead">
          Demo frontend de portafolio para operacion comercial: facturas, clientes, productos y usuarios
          con mocks tipados, shell modular y sistema visual propio.
        </p>

        <div className="login-list">
          {initialAppData.users.map((user) => (
            <button
              className={`login-card ${selectedEmail === user.email ? "selected" : ""}`}
              key={user.id}
              onClick={() => setSelectedEmail(user.email)}
              type="button"
            >
              <span>{user.name}</span>
              <small>
                {user.role} · {user.email}
              </small>
            </button>
          ))}
        </div>

        <div className="login-actions">
          <Button
            onClick={() => {
              if (login(selectedEmail)) {
                navigate(destination, { replace: true });
              }
            }}
          >
            Entrar a la demo
          </Button>
          <p className="hint">Acceso demo local. No usa credenciales reales.</p>
        </div>
      </section>

      <section className="login-visual">
        <img alt="Primeo editorial workspace" src={ledgerImage} />
        <div className="visual-note">
          <span>Ledger rail</span>
          <strong>Contexto, accion y lectura en una sola columna.</strong>
        </div>
      </section>
    </main>
  );
}
