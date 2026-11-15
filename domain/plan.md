# Plan de implementación del dominio Brasaland

**Estado:** Implementación de módulos observada en `domain/src/`; la verificación funcional integral sigue pendiente.  
**Fecha:** 2026-11-15  
**Alcance:** Implementar dentro de `domain/` los modelos, funciones y verificaciones especificados. Este plan no representa una arquitectura o producto de producción aprobados.

## Objetivo

Implementar el dominio TypeScript para menú, ventas, locaciones y desperdicio con cobertura de todos los requisitos de [`specs.md`](./specs.md), datos monetarios USD/COP, fechas locales por zona IANA, validaciones explícitas, errores accionables y funciones puras que no muten sus entradas.

## Reglas de ejecución

- Mantener los cambios dentro de `domain/`; no editar archivos de raíz, `README`, `CONTEXT` ni memoria del proyecto como parte de este plan.
- No añadir dependencias externas. Antes de elegir una infraestructura de pruebas, revisar qué está disponible/aprobado para el área; solicitar autorización si hiciera falta una dependencia.
- No inventar datos operativos. Usar como fixtures los ejemplos del briefing y cualquier otro dato proporcionado o aprobado posteriormente.
- Tratar `specs.md` como contrato funcional. Si una necesidad de implementación requiere cambiar alcance o resolver una decisión pendiente, detenerse y pedir aclaración antes de codificar.
- Registrar las validaciones ejecutadas y distinguir resultados verificados de los pendientes. No declarar una fase completa sin evidencia.

## Fases de trabajo

### Fase 1 — Preparación y contratos de tipos

**Resultado esperado:** estructura de tipos TypeScript exportables y compilables para las entidades.

1. Confirmar el contenido disponible en `domain/` y la configuración TypeScript existente aplicable; no asumir que ya existe un compilador, runner de workspace o framework de pruebas configurado.
2. Acordar la ubicación concreta de código prevista en la especificación, manteniéndola bajo `domain/` (propuesta: `domain/src/types.ts` y `domain/src/utils/`). No desplazar ni modificar `packages/shared` sin una decisión expresa.
3. Definir `Price`, `MenuCategory`, `MenuItemStatus`, `MenuItem`, `PaymentMethod`, `SaleTransaction`, `Country`, `LocationStatus`, `Location`, `WasteReason`, `WasteRecord` y `CountryMetrics` con sus campos y uniones literales requeridos.
4. Incluir `Location.timeZone` como campo obligatorio; documentar que debe ser identificador de zona IANA.
5. Usar `CalendarDate` como cadena `YYYY-MM-DD` para días calendario y `asOfDate`; mantener los timestamps como `Date`.

**Verificación de salida:** revisar exports, tipos de campos, valores literales y ausencia de tipos relajados innecesarios; comprobar con las herramientas disponibles que el módulo compila o, si no hay compilación configurada, dejar documentado el bloqueo sin instalar dependencias.

### Fase 2 — Utilidades de colecciones y búsqueda

**Resultado esperado:** filtros, ordenamientos y búsquedas que respetan los contratos, la pureza y la inmutabilidad.

1. Implementar en `domain/src/utils/collections.ts`:
   - `filterSalesByLocation`
   - `filterSalesByDateRange` con contexto de locaciones para zonas horarias
   - `filterMenuItemsByCategory`
   - `filterActiveLocations`
   - `sortLocationsByCapacity`
   - `sortMenuItemsByPrice`
2. Implementar en `domain/src/utils/search.ts`:
   - `findLocationById`
   - `findMenuItemByName` con búsqueda case-insensitive
   - `binarySearchLocationByCapacity` para entrada ascendente.
3. Preservar los arrays de entrada; usar copias para ordenar. Cubrir arrays vacíos, no coincidencias y límites inclusivos de fechas.
4. Para el rango de fechas, definir de manera explícita la interpretación local por locación y rechazar zona desconocida, fecha no válida o inicio posterior al fin. No depender de la zona horaria del proceso.

**Verificación de salida:** tests unitarios de cada operación, comprobación de no mutación y casos próximos a medianoche en distintas zonas horarias. Registrar cualquier limitación de runtime para zonas IANA.

### Fase 3 — Cálculos monetarios y transformaciones básicas

**Resultado esperado:** operaciones financieras precisas, compatibles con USD/COP y con datos inconsistentes detectables.

Implementar en `domain/src/utils/transformations.ts`:

- `calculateDailyRevenue`, con zona horaria por locación.
- `calculateLocationMargin`, que une transacciones con menú, usa `quantity` para costo de ingredientes y rechaza ingreso cero.
- `calculateWasteCost`, agrupado por locación y moneda.
- `convertCurrency`, usando tasa fija `1 USD = 4000 COP`.
- `countSalesByPaymentMethod`, devolviendo las cuatro claves.
- `calculateAverageTicket`, contando transacciones y rechazando conjunto vacío.
- `findTopSellingItems`, sumando unidades, validando `topN`, asociando el menú y aplicando desempate estable.
- `groupWasteByReason`, devolviendo todas las razones aun si no tienen registros.

**Criterios:** seleccionar USD/COP sin mezclar divisas; redondear donde lo requiere la especificación; no ocultar `NaN`, `Infinity`, IDs inexistentes o referencias inválidas; distinguir sumas vacías válidas de promedios/márgenes indefinidos.

**Verificación de salida:** pruebas de valores y fórmulas en ambas monedas, conversiones en ambos sentidos, redondeo, datos inválidos, asociaciones faltantes y casos vacíos.

### Fase 4 — Scoring y ranking de desempeño

**Resultado esperado:** puntuaciones reproducibles de 0 a 100 y ranking descendente de locaciones activas.

1. Implementar `scoreLocationPerformance` con `asOfDate` explícita, filtrando registros por `location.id`.
2. Aplicar los pesos y topes descritos en `specs.md`: ingresos (40), transacciones/capacidad (30), control de desperdicio (20) y margen (10).
3. Contar días calendario desde el 1 de enero de `openingYear` hasta `asOfDate` inclusive. Documentar que no se descuentan cierres temporales porque no existe historial diario de operación.
4. Lanzar errores descriptivos cuando la fecha sea anterior al año de apertura o una razón/denominador indispensable no permita el cálculo; evitar scores parciales.
5. Implementar `rankLocationsByPerformance`, incluyendo solo locaciones activas, sin mutar entradas, y propagando error con el ID de la locación que no pueda puntuarse.
6. Desempatar puntajes iguales por `location.id` ascendente.

**Verificación de salida:** casos para topes, días inclusivos, cambio de año, margen bajo/negativo, desperdicio, error por ingreso cero, locaciones inactivas y empates.

### Fase 5 — Comparación por país y reporte de estados

**Resultado esperado:** métricas separadas de Colombia y USA respetando el contrato de `CountryMetrics` y monedas.

1. Implementar `calculateCountryComparison` con `totalLocations`, `totalRevenue`, `averageRevenuePerLocation` y `totalSales`.
2. Contar locaciones activas para `totalLocations` y calcular promedio únicamente con denominador de locaciones activas.
3. Calcular y reportar USD y COP en campos separados; `totalSales` cuenta transacciones.
4. Rechazar ventas sin locación conocida con error de integridad legible.
5. Mantener los cuatro campos requeridos de `CountryMetrics` y añadir `inactiveLocations: Array<{ id: string; status: "Temporarily closed" | "Under renovation" }>` a las métricas de cada país.

**Verificación de salida:** datos de ambos países, países sin locaciones activas, transacciones sin localización y verificación de importes por separado.

### Fase 6 — Validaciones de entidades

**Resultado esperado:** validadores que acumulan mensajes de error de negocio con nombres de campo.

Implementar en `domain/src/utils/validations.ts`:

- `validateMenuItem`: identidad, categoría/estado, precios/costos positivos finitos, tiempo de preparación, disponibilidad y alérgenos.
- `validateSaleTransaction`: identidad/referencias presentes, cantidad y precio positivo finito, método de pago y fecha válida.
- `validateLocation`: campos de identidad, país/estado, año, capacidad, personal, costos y zona IANA.

Los validadores devuelven `{ valid, errors }`, acumulan los errores y no añaden restricciones no acordadas (por ejemplo, no exigir que el costo de ingredientes sea menor que el precio). Si es necesario inyectar el año de referencia para pruebas, mantenerlo explícito y determinista sin cambiar la regla de negocio.

**Verificación de salida:** casos válidos e inválidos por campo, valores no finitos, estructuras incompletas cuando se admitan entradas no confiables, múltiples errores acumulados y zona horaria inválida.

### Fase 7 — Pruebas de integración y revisión final

**Resultado esperado:** evidencia de que el conjunto cubre la especificación completa.

1. Usar los tres artículos, dos locaciones y dos ventas de ejemplo que aparecen en `BRIEFING.md`, completando `timeZone` únicamente con valores de fixture declarados por la especificación o aclarados antes de su uso.
2. Añadir pruebas cruzadas de filtros → cálculos → reportes sin introducir datos de menú de producción inventados.
3. Cubrir todos los casos de aceptación de `specs.md`: arrays vacíos, errores matemáticos, fechas/zona, monedas, referencias, estados activos/inactivos, validadores, inmutabilidad y desempates.
4. Ejecutar únicamente comprobaciones que existan y estén disponibles para `domain/`; no afirmar que corrieron tests si no hay runner configurado. No instalar dependencias sin aprobación.
5. Revisar el resultado completo contra la matriz de cobertura en `specs.md`; verificar que ninguna función del briefing fue omitida y que no se alteraron archivos fuera de alcance.
6. Documentar como pendientes las decisiones no cerradas: forma del campo/reporte de inactividad y cualquier ajuste necesario para distinguir días operativos reales de la estimación por año de apertura.

## Dependencias y bloqueos

| Punto                                                          | Estado / tratamiento                                                                                                          |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Ubicación exacta del código y export barrel                    | Pendiente de confirmar al comenzar implementación; mantener bajo `domain/`.                                                   |
| Herramientas de TypeScript y pruebas                           | No asumir runner configurado; inspeccionar primero y no instalar paquetes sin autorización.                                   |
| `Location.timeZone` en fixtures                                | Requerido por la especificación; asignar zonas IANA explícitas para pruebas, sin depender del huso local del proceso.         |
| Forma de informar locaciones inactivas en comparación por país | Confirmada: añadir `inactiveLocations` con ID y estado, conservando los cuatro campos de `CountryMetrics`. |
| Formato de días calendario | Confirmado: `CalendarDate` como cadena `YYYY-MM-DD`; timestamps como `Date`. |
| Desempate del ranking | Confirmado: ordenar por `location.id` ascendente cuando los scores empaten. |
| Días cerrados en el scoring                                    | No hay historial en el modelo; usar días calendario estimados, sin descontar cierres temporales, y explicar la limitación.    |
| Datos del menú real                                            | No disponibles estructuradamente; usar solo fixtures del briefing hasta recibir datos confiables.                             |

## Criterios de cierre

- Todos los modelos y funciones de `specs.md` están implementados en `domain/` y tipados.
- Se respetan la semántica local de fechas, USD/COP, fórmulas, conteo de transacciones/unidades y estados de locaciones.
- Las funciones puras no mutan las entradas; errores y validaciones son claros y acumulables según corresponda.
- Las pruebas disponibles cubren los casos de aceptación; toda prueba no ejecutada y su motivo quedan declarados.
- Se resolvieron o se marcaron como bloqueos las decisiones pendientes sin inventar comportamientos.
- El diff queda limitado a archivos autorizados bajo `domain/` y la revisión final no reporta omisiones frente a la especificación.
