# Dominio Brasaland

Módulos TypeScript de tipos y funciones puras para colecciones, búsquedas, transformaciones y validación. El punto de entrada es `src/index.ts`.

Las fechas calendario de las funciones se reciben como `CalendarDate` (`YYYY-MM-DD`). Los `timestamp` permanecen como `Date` y se interpretan usando `Location.timeZone` cuando la función opera por día local.

Este directorio no declara ni instala dependencias. La comparación por país mantiene los cuatro campos de `CountryMetrics` y añade `inactiveLocations` por país, según la decisión aprobada para identificar cierres.

## Verificación local

Con Node.js 22.6 o posterior, ejecuta desde `domain/`:

```sh
for file in src/types.ts src/index.ts src/utils/collections.ts src/utils/search.ts src/utils/transformations.ts src/utils/validations.ts; do node --experimental-strip-types --check "$file" || exit 1; done
```

Esto comprueba sintaxis usando el soporte experimental de eliminación de tipos de Node. **No** ejecuta un chequeo de tipos de TypeScript ni sustituye `tsc --noEmit`; el proyecto no incluye actualmente TypeScript ni dependencias instaladas.

`validateLocation(location, referenceDate)` recibe una fecha de referencia explícita para que la regla de `openingYear` sea reproducible y no dependa del reloj del proceso.
