import { useMemo, useState } from "react";
import { formatDate } from "@shared/lib/format";
import { useAppData } from "@shared/store/app-data-context";
import type { DemoUser } from "@shared/types/domain";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import { DataTable, type DataColumn } from "@shared/ui/data-table";
import { Field, Input, Select } from "@shared/ui/field";
import { Panel } from "@shared/ui/panel";
import { SectionHeading } from "@shared/ui/section-heading";

export function UsersPage() {
  const { state, addUser } = useAppData();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<DemoUser | null>(state.users[0] ?? null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Operador" as DemoUser["role"],
    passwordHint: "",
  });

  const rows = useMemo(
    () =>
      state.users.filter((user) =>
        [user.name, user.email, user.role].join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    [query, state.users],
  );

  const columns: DataColumn<DemoUser>[] = [
    {
      key: "name",
      header: "Usuario",
      render: (row) => (
        <button className="row-anchor" onClick={() => setSelected(row)} type="button">
          <strong>{row.name}</strong>
          <small>{row.email}</small>
        </button>
      ),
    },
    { key: "role", header: "Rol", render: (row) => row.role },
    { key: "status", header: "Estado", render: (row) => <Badge tone="success">{row.status}</Badge> },
    { key: "lastAccess", header: "Ultimo acceso", render: (row) => formatDate(row.lastAccess) },
  ];

  return (
    <div className="page page-with-panel">
      <div className="page-main">
        <SectionHeading
          eyebrow="Equipo"
          title="Usuarios internos con roles claros"
          description="Como es un demo frontend, la autenticacion es local; aun asi el modulo exhibe estructura, lenguaje y jerarquia realistas."
        />
        <Card>
          <div className="toolbar">
            <input
              className="control"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, correo o rol"
              type="search"
              value={query}
            />
          </div>
          <DataTable
            columns={columns}
            rows={rows}
            emptyDescription="No se encontraron usuarios con ese filtro."
            emptyTitle="Sin resultados en usuarios."
            getRowId={(row) => row.id}
            isRowSelected={(row) => row.id === selected?.id}
          />
        </Card>
      </div>

      <Panel
        description="La columna lateral funciona como ficha y como punto de alta para mantener el patron comun del sistema."
        title={selected ? selected.name : "Nuevo usuario"}
      >
        {selected ? (
          <div className="detail-stack">
            <div className="detail-grid">
              <div>
                <span>Correo</span>
                <strong className="detail-value-wrap">{selected.email}</strong>
              </div>
              <div>
                <span>Rol</span>
                <strong className="detail-value-wrap">{selected.role}</strong>
              </div>
              <div>
                <span>Pista demo</span>
                <strong className="detail-value-wrap">{selected.passwordHint}</strong>
              </div>
              <div>
                <span>Ultimo acceso</span>
                <strong className="detail-value-wrap">{formatDate(selected.lastAccess)}</strong>
              </div>
            </div>
          </div>
        ) : null}

        <div className="panel-form">
          <Field label="Nombre">
            <Input onChange={(event) => setForm({ ...form, name: event.target.value })} value={form.name} />
          </Field>
          <Field label="Correo">
            <Input onChange={(event) => setForm({ ...form, email: event.target.value })} value={form.email} />
          </Field>
          <Field label="Rol">
            <Select
              onChange={(event) => setForm({ ...form, role: event.target.value as DemoUser["role"] })}
              value={form.role}
            >
              <option value="Admin">Admin</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Operador">Operador</option>
            </Select>
          </Field>
          <Field label="Pista de acceso demo">
            <Input
              onChange={(event) => setForm({ ...form, passwordHint: event.target.value })}
              value={form.passwordHint}
            />
          </Field>
          <Button
            onClick={() => {
              if (!form.name || !form.email || !form.passwordHint) {
                return;
              }

              addUser(form);
              setForm({
                name: "",
                email: "",
                role: "Operador",
                passwordHint: "",
              });
            }}
          >
            Guardar usuario
          </Button>
        </div>
      </Panel>
    </div>
  );
}
