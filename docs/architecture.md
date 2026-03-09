# Arquitectura

## Objetivo

Convertir el proyecto original en un demo frontend puro con estructura profesional, sin acoplamiento a APIs rotas y con una lectura clara para revisiones de portafolio.

## Capas

### `src/app`

- bootstrap de la aplicacion
- router principal
- composicion de providers
- root layout autenticado

### `src/features`

Cada modulo encapsula su vista principal:

- `auth`
- `dashboard`
- `invoices`
- `customers`
- `products`
- `users`

La intencion es que el dominio sea el eje de lectura, no una separacion artificial por `pages`, `components` o `utils`.

### `src/shared`

- `types`: contratos de dominio
- `mocks`: dataset inicial del demo
- `store`: estado global local y persistencia
- `lib`: formato, metricas y helpers
- `ui`: primitives reutilizables
- `styles`: tokens y reglas globales

## Estado y persistencia

`AppDataProvider` usa `localStorage` como fuente de persistencia demo. Esto permite:

- probar altas de clientes, productos y usuarios
- generar facturas nuevas
- reiniciar el estado con un solo boton

La autenticacion tambien es local y controlada por `AuthProvider`.

## Routing

- `/login`
- `/`
- `/facturas`
- `/facturas/nueva`
- `/clientes`
- `/productos`
- `/usuarios`

## Decisiones clave

- Se elimino la dependencia funcional del backend externo.
- Se movio el routing fuera de `utils` hacia `src/app`.
- Se reemplazo la mezcla de mocks + llamadas HTTP por una unica capa de datos interna.
- Se definio un conjunto pequeno de componentes base para sostener consistencia visual.
- Se restringio el build y el lint a la nueva arquitectura para aislar el codigo legado.
