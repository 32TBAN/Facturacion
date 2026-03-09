# Portfolio Notes

## Que comunica seniority

- Replanteamiento completo de una base acoplada y heterogenea hacia una arquitectura modular.
- Eliminacion de dependencias de infraestructura que no aportaban al objetivo del demo.
- Datos demo consistentes, tipados y persistidos localmente.
- Sistema visual propio en lugar de una dependencia ciega de Bootstrap.
- Documentacion separada por preocupacion: arquitectura, UI y narrativa de portafolio.

## Trade-offs

- No se implemento backend real porque el objetivo es mostrar frontend, estructura y criterio.
- La autenticacion es local y deliberadamente simple.
- Las operaciones son de alta demo, no de negocio real con reglas fiscales exhaustivas.

## Calidad

- build productivo validado
- lint orientado a la nueva arquitectura
- tests unitarios basicos para helpers de facturacion

## Evolucion natural

Si este demo creciera, el siguiente paso seria extraer repositorios por feature, formularios con validacion declarativa y testing de componentes con `jsdom`.
