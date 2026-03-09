import type { PropsWithChildren, ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@features/auth/auth-context";
import { Button } from "@shared/ui/button";

interface NavItem {
  to: string;
  label: string;
  shortLabel: string;
  icon: ReactNode;
}

function IconOverview() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 5.5h7v5H4zM13 5.5h7v8h-7zM4 12.5h7V19H4zM13 15.5h7V19h-7z" />
    </svg>
  );
}

function IconInvoice() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 3.5h8l4 4V20.5H7z" />
      <path d="M15 3.5v5h4" fill="none" />
      <path d="M10 12h6M10 15.5h6M10 19h4" fill="none" />
    </svg>
  );
}

function IconCustomer() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 12 12zM5.5 20a6.5 6.5 0 0 1 13 0z" />
    </svg>
  );
}

function IconProduct() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4.5 8.5 12 4l7.5 4.5V17L12 21 4.5 17z" />
      <path d="M12 4v17M4.5 8.5 12 13l7.5-4.5" fill="none" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 11.5a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 12 11.5zM6.5 20a5.5 5.5 0 0 1 11 0z" />
      <path d="M18.5 7.5h3M20 6v3" fill="none" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { to: "/", label: "Resumen", shortLabel: "Inicio", icon: <IconOverview /> },
  { to: "/facturas", label: "Facturas", shortLabel: "Facturas", icon: <IconInvoice /> },
  { to: "/clientes", label: "Clientes", shortLabel: "Clientes", icon: <IconCustomer /> },
  { to: "/productos", label: "Productos", shortLabel: "Productos", icon: <IconProduct /> },
  { to: "/usuarios", label: "Usuarios", shortLabel: "Equipo", icon: <IconUser /> },
];

export function Shell({ children }: PropsWithChildren) {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="toolbelt-strip">
        <div className="toolbelt-brand">
          <span className="toolbelt-mark">P</span>
          <div>
            <p className="eyebrow">Primeo demo</p>
            <strong>Facturacion</strong>
          </div>
        </div>

        <nav className="toolbelt-nav toolbelt-nav-desktop">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => `toolbelt-link ${isActive ? "active" : ""}`}
              key={item.to}
              to={item.to}
            >
              <span className="toolbelt-icon">{item.icon}</span>
              <span>{location.pathname === item.to ? item.shortLabel : item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="toolbelt-actions">
          <Button tone="ghost" onClick={logout}>
            Salir
          </Button>
        </div>
      </header>

      <main className="content-stage">{children}</main>

      <nav className="toolbelt-nav toolbelt-nav-mobile">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) => `toolbelt-link toolbelt-link-mobile ${isActive ? "active" : ""}`}
            key={item.to}
            to={item.to}
          >
            <span className="toolbelt-icon">{item.icon}</span>
            <span>{item.shortLabel}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
