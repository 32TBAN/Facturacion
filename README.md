# Primeo Facturacion Demo

Demo frontend para portafolio construido con React, TypeScript y Vite. El proyecto simula una suite administrativa de facturacion con cuatro modulos: facturas, clientes, productos y usuarios.

La app fue reorganizada como un frontend puro:

- arquitectura por features
- auth demo local
- capa de datos mock persistida en `localStorage`
- sistema visual editorial moderno con `ledger rail`
- documentacion tecnica separada en `docs/`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run test`

## Estructura

```text
src/
  app/
  features/
  shared/
docs/
  architecture.md
  ui-system.md
  portfolio-notes.md
  screens/
```

## Demo scope

- Dashboard de resumen operativo
- Listado y detalle lateral de facturas
- Composer de facturas con calculo de totales
- Gestion demo de clientes, productos y usuarios
- Reinicio de datos demo para exploracion de portafolio

## Documentacion

- [Arquitectura](./docs/architecture.md)
- [Sistema UI](./docs/ui-system.md)
- [Notas de portafolio](./docs/portfolio-notes.md)
- [Capturas](./docs/screens/README.md)
