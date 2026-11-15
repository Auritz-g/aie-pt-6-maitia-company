# Especificación de dominio — Brasaland

**Estado:** Especificación acordada para implementación posterior; el código todavía no está implementado.  
**Fecha:** 2026-11-15  
**Fuentes:** [`../BRIEFING.md`](../BRIEFING.md) y aclaraciones confirmadas por el usuario en esta conversación.

## 1. Propósito y alcance

Definir los modelos TypeScript y las utilidades de dominio para procesar datos operativos de menú, ventas, locaciones y desperdicio. La implementación posterior debe cubrir **todas las funciones enumeradas en este documento**, incluidas las del briefing, y respetar los criterios de aceptación y decisiones aquí registrados.

Todo el trabajo de este conjunto se creará dentro de `domain/`. El briefing menciona `src/utils/*.ts`; para este proyecto, esa estructura se ubicará dentro de `domain/` (por ejemplo, `domain/src/utils/`). La carpeta y archivos exactos de implementación se definirán al preparar ese trabajo. Esta especificación no crea código ejecutable.

No se añaden dependencias externas como requisito de esta implementación.

## 2. Modelos de dominio requeridos

Definir exportablemente los siguientes tipos e interfaces, conservando sus nombres y valores literales del briefing:

- `Price`: `{ USD: number; COP: number }`.
- `MenuCategory`: `"Meat" | "Side" | "Beverage" | "Dessert" | "Combo"`.
- `MenuItemStatus`: `"Active" | "Seasonal" | "Discontinued"`.
- `MenuItem`: `id`, `name`, `category`, `basePrice`, `ingredientCost`, `prepTimeMinutes`, `isAvailableInColombia`, `isAvailableInUSA`, `allergens` y `status`.
- `PaymentMethod`: `"Cash" | "Credit card" | "Debit card" | "Digital wallet"`.
- `SaleTransaction`: `id`, `locationId`, `itemId`, `quantity`, `totalPrice`, `paymentMethod`, `timestamp` y `waiterName`.
- `Country`: `"Colombia" | "USA"`.
- `LocationStatus`: `"Active" | "Temporarily closed" | "Under renovation"`.
- `Location`: `id`, `name`, `city`, `country`, `openingYear`, `seatingCapacity`, `staffCount`, `monthlyRentCost`, `averageMonthlyUtilities`, `manager` y `status`; añadir `timeZone: string` obligatorio con identificador de zona horaria IANA (por ejemplo, `America/Bogota` o `America/New_York`).
- `WasteReason`: `"Expired" | "Cooking error" | "Customer return" | "Damage" | "Other"`.
- `WasteRecord`: `id`, `locationId`, `itemId`, `quantity`, `reason`, `cost`, `timestamp` y `reportedBy`.
- `CountryMetrics`: `{ totalLocations: number; totalRevenue: Price; averageRevenuePerLocation: Price; totalSales: number }`, según el briefing. `totalRevenue` y `averageRevenuePerLocation` contienen valores USD y COP separados.

La lista completa del menú de Brasaland no está disponible como datos estructurados con IDs, precios y costos. No inventar esos datos: por ahora las pruebas/fixtures solo pueden usar los tres artículos de ejemplo de `BRIEFING.md`. La carta pública no es una fuente suficiente para completar esos campos.

## 3. Convenciones transversales

### Monedas y precisión

- Los importes conservan ambos valores (`USD` y `COP`) y cada cálculo debe permitir seleccionar la moneda cuando la firma lo requiera.
- La conversión usa la tasa fija del briefing: **1 USD = 4000 COP**.
- Las métricas de país reportan ingresos en ambas monedas por separado; no se suman valores numéricos de monedas distintas.
- Redondear a dos decimales en los resultados financieros y porcentajes donde el briefing lo solicita. La conversión de moneda con monedas iguales retorna el importe original sin conversión.
- Los datos inválidos o no finitos no deben convertirse silenciosamente en resultados aparentemente válidos.

### Fechas y zonas horarias

- Cada venta se asocia a una locación mediante `locationId`; su zona horaria se obtiene de `Location.timeZone`.
- Las operaciones por día calendario se interpretan en la hora local de la locación, no en la zona horaria del proceso ni en UTC.
- Las funciones que necesiten determinar el día local deben recibir el contexto de locaciones además de las ventas. Sus firmas podrán ampliarse respecto al briefing para permitir una interpretación correcta.
- Los argumentos que expresan un día calendario usan el tipo `CalendarDate`, representado como cadena `YYYY-MM-DD`. La implementación valida que la fecha exista en el calendario; `timestamp` permanece como `Date` y se convierte al día local de la locación cuando corresponda.
- Para un rango inclusivo, incluir las ventas que caen en los días locales desde el inicio hasta el fin, ambos inclusive, de acuerdo con la zona horaria de cada locación. Rechazar rangos inválidos (inicio posterior al fin) con error claro.
- Validar la zona IANA de cada locación. Una zona inválida debe producir un error de validación identificable, no usar silenciosamente la zona local del servidor.

### Errores y casos matemáticamente indefinidos

- Los cálculos que requieran dividir por cero o carezcan de datos suficientes para un resultado definido deben fallar explícitamente mediante un `Error` descriptivo (las firmas originales devuelven `number`, por lo que no existe un valor numérico correcto que retornar).
- El mensaje debe identificar la función o métrica, la causa y la corrección necesaria. Ejemplos: margen con ingreso total cero: indicar que no hay ingresos para calcular margen; promedio de ticket sin transacciones: indicar que se requiere al menos una venta; promedio por país sin locaciones activas: indicar que no hay denominador.
- No producir `NaN` o `Infinity`, ni convertirlos en cero para ocultar el error.
- Los totales de conjuntos vacíos que no requieren división sí son cero; por ejemplo, ingreso total diario sin ventas y costo de desperdicio sin registros.

### Inmutabilidad, pureza e integridad

- Las funciones no mutan los arrays recibidos ni mantienen estado global mutable.
- Los ordenamientos devuelven copias ordenadas.
- Para combinar ventas/desperdicios con menú, los `itemId` deben resolver a un `MenuItem`. Un ID de ítem ausente indica datos inconsistentes y debe reportarse con el ID del registro y el campo relacionado; no omitirlo ni tratar el costo faltante como cero.
- Los validadores inspeccionan los campos disponibles en sus argumentos. Las referencias entre entidades se verifican en operaciones que reciben los conjuntos necesarios.

## 4. Funciones requeridas: colecciones

Ubicación prevista en la arquitectura: `domain/src/utils/collections.ts`.

1. `filterSalesByLocation(sales, locationId): SaleTransaction[]` — devuelve solo ventas cuyo `locationId` coincide.
2. `filterSalesByDateRange(sales, startDate, endDate, locations): SaleTransaction[]` — devuelve ventas dentro del rango local inclusivo, considerando la zona de su locación. Se añade `locations` para satisfacer el requisito de zonas horarias.
3. `filterMenuItemsByCategory(items, category): MenuItem[]` — devuelve ítems de la categoría exacta.
4. `filterActiveLocations(locations): Location[]` — devuelve las locaciones con estado `Active`.
5. `sortLocationsByCapacity(locations, order): Location[]` — orden ascendente o descendente por `seatingCapacity`, sin mutar la entrada.
6. `sortMenuItemsByPrice(items, currency, order): MenuItem[]` — orden por precio base en la moneda indicada, sin mutar la entrada.

## 5. Funciones requeridas: búsqueda

Ubicación prevista: `domain/src/utils/search.ts`.

1. `findLocationById(locations, id): Location | null` — búsqueda lineal por ID.
2. `findMenuItemByName(items, name): MenuItem | null` — búsqueda lineal, comparación case-insensitive; ignorar espacios externos de búsqueda y nombre para evitar falsos fallos por espacios accidentales.
3. `binarySearchLocationByCapacity(sortedLocations, targetCapacity): number` — búsqueda binaria en capacidades ascendentes; devolver índice coincidente o `-1`. La entrada se asume ordenada según el contrato del briefing.

## 6. Funciones requeridas: cálculos financieros y moneda

Ubicación prevista: `domain/src/utils/transformations.ts`.

1. `calculateDailyRevenue(sales, date, currency, locations): number` — suma `totalPrice[currency]` para las ventas ocurridas en el día calendario indicado según la zona de cada locación. Total redondeado a dos decimales. Se añade `locations` para resolver zonas horarias.
2. `calculateLocationMargin(sales, menuItems, locationId, currency): number` — solo ventas de la locación; ingreso = suma de `totalPrice[currency]`; costo de ingredientes = suma de `menuItem.ingredientCost[currency] * sale.quantity`; margen porcentual = `((ingreso - costo) / ingreso) * 100`, redondeado a dos decimales. Ingreso cero produce error descriptivo. No recortar artificialmente el resultado a 0–100 si los costos superan el ingreso; informar el valor matemático válido.
3. `calculateWasteCost(wasteRecords, locationId, currency): number` — suma el costo registrado de desperdicios de la locación en la moneda pedida; redondear a dos decimales. Con cero registros, devolver cero.
4. `convertCurrency(amount, fromCurrency, toCurrency): number` — convertir según tasa fija USD/COP; redondear a dos decimales. Si las monedas coinciden, devolver el monto original.

## 7. Funciones requeridas: scoring y ranking

Ubicación prevista: `domain/src/utils/transformations.ts`.

Añadir parámetro requerido `asOfDate` a `scoreLocationPerformance` y `rankLocationsByPerformance`, para que las funciones sean deterministas y no dependan implícitamente del reloj del sistema. Se acepta `asOfDate` como día calendario local inequívoco.

### `scoreLocationPerformance(location, sales, wasteRecords, menuItems, asOfDate): number`

Usar exclusivamente ventas y desperdicios asociados a `location.id`. Usar transacciones (cada elemento de `sales` cuenta como un ticket para eficiencia), no unidades vendidas.

- **Ingresos (máx. 40):** suma de ingresos USD del conjunto de ventas suministrado, dividida por los días calendario desde el 1 de enero de `openingYear` hasta `asOfDate`, inclusive; luego `(promedio diario USD / 1000) * 40`, con tope 40.
- **Eficiencia de asientos (máx. 30):** `(número de transacciones / seatingCapacity) * 30`, con tope 30.
- **Control de desperdicio (máx. 20):** `(costo de desperdicio USD / ingreso USD) * 100`; puntuación `max(0, 20 - (porcentaje * 2))`.
- **Margen (máx. 10):** utilizar `calculateLocationMargin` en USD; puntos `min(10, margen / 10)`.
- Puntaje final entre 0 y 100, redondeado a dos decimales.
- Error descriptivo si `asOfDate` es anterior al inicio del año de apertura, si el ingreso es cero para las métricas de proporción o si no hay datos suficientes para una división válida. No fabricar puntuaciones parciales.
- El modelo solo proporciona `openingYear`, no la fecha exacta de apertura ni historial de días cerrados. Por tanto, el denominador es una estimación de días calendario desde el 1 de enero del año de apertura; la implementación no descontará cierres temporales sin disponer de historial. Esta limitación deberá quedar documentada.

### `rankLocationsByPerformance(locations, sales, wasteRecords, menuItems, asOfDate)`

Puntuar las locaciones activas y devolver `Array<{ location: Location; score: number }>` ordenado de mayor a menor. Las locaciones no activas no reciben score ni entran al ranking; sus estados (`Temporarily closed` / `Under renovation`) se deben poder identificar en la comparación/reporte por país. El array de entrada no se muta. Si una locación activa no puede puntuarse, propagar error descriptivo que identifique su ID.

Cuando dos locaciones tengan el mismo score, desempatar por `location.id` ascendente para que el resultado sea determinista.

## 8. Funciones requeridas: agregaciones e informes

Ubicación prevista: `domain/src/utils/transformations.ts`.

1. `countSalesByPaymentMethod(sales): Record<PaymentMethod, number>` — contar transacciones por método; devolver las cuatro claves con cero cuando no haya ventas de ese método.
2. `calculateAverageTicket(sales, currency): number` — promedio de `totalPrice[currency]` por transacción, no por unidad; redondear a dos decimales. Sin transacciones, lanzar error indicando que se requiere una venta.
3. `findTopSellingItems(sales, menuItems, topN): Array<{ item: MenuItem; totalSold: number }>` — agrupar por `itemId`, sumar `quantity`, asociar cada grupo al ítem y ordenar descendente por unidades vendidas. `topN` cero devuelve lista vacía; valores negativos o no enteros generan error de argumento. Desempates: preservar orden de primera aparición en ventas para resultado determinista.
4. `groupWasteByReason(wasteRecords): Record<WasteReason, WasteRecord[]>` — devolver las cinco razones como claves, cada una con sus registros; razones sin registros tienen array vacío.
5. `calculateCountryComparison(sales, locations, menuItems): CountryComparison` — construir métricas por país y sumar ingresos USD/COP de forma separada. `totalSales` cuenta transacciones, no unidades. Los campos `totalLocations` y `averageRevenuePerLocation` consideran locaciones `Active`; las inactivas se excluyen de esos cálculos. El resultado conserva los cuatro campos de `CountryMetrics` y añade `inactiveLocations: Array<{ id: string; status: "Temporarily closed" | "Under renovation" }>` por país. El promedio se calcula sobre locaciones activas del país; si no existe ninguna, error descriptivo por denominador cero. Las ventas sin una locación conocida deben reportarse como datos inconsistentes.

## 9. Funciones requeridas: validación

Ubicación prevista: `domain/src/utils/validations.ts`.

Las tres funciones retornan `{ valid: boolean; errors: string[] }`; acumulan errores en vez de detenerse en el primero. Los textos deben identificar el campo y la condición incumplida.

### `validateMenuItem(item)`

Verificar, como mínimo:

- `id` y `name` no vacíos (nombre no solo espacios).
- `category` y `status` pertenecen a sus uniones literales.
- `basePrice.USD`, `basePrice.COP`, `ingredientCost.USD` y `ingredientCost.COP` son números finitos y > 0.
- `prepTimeMinutes` finito, > 0 y <= 60.
- Disponibilidad de Colombia/USA son booleanos y al menos uno verdadero.
- `allergens` es un array de cadenas válidas; no aceptar elementos vacíos.

### `validateSaleTransaction(sale)`

Verificar, como mínimo:

- `id`, `locationId`, `itemId` y `waiterName` no vacíos.
- `quantity` numérico, finito y > 0.
- `totalPrice.USD` y `totalPrice.COP` numéricos, finitos y > 0.
- `paymentMethod` dentro de los valores permitidos.
- `timestamp` es un `Date` válido.

### `validateLocation(location)`

Verificar, como mínimo:

- `id`, `name`, `city` y `manager` no vacíos.
- `country` y `status` dentro de sus valores permitidos.
- `openingYear` entero, >= 2008 y no superior al año actual; la validación acepta un reloj/referencia temporal inyectable si se requiere para pruebas deterministas.
- `seatingCapacity` y `staffCount` enteros finitos y > 0.
- Los componentes USD/COP de `monthlyRentCost` y `averageMonthlyUtilities` finitos y > 0.
- `timeZone` es una zona IANA reconocida.

No imponer que `ingredientCost` sea inferior al precio: una venta con margen negativo puede ser un resultado real que debe detectarse, no un dato inválido automáticamente. No añadir un validador de `WasteRecord` como sustituto de los tres requeridos; se pueden comprobar sus datos al procesarlos, pero la validación de entidad adicional no forma parte de las funciones expresamente requeridas.

## 10. Casos de prueba y aceptación

La implementación posterior debe incluir pruebas para las funciones listadas, al menos con:

- Los ejemplos de menú, locaciones y ventas de `BRIEFING.md`.
- Arrays vacíos y resultados sin coincidencias.
- Bordes inclusivos del rango de fechas y ventas próximas a medianoche en zonas horarias diferentes.
- Fechas inválidas, rango invertido y zona horaria no válida.
- USD, COP y conversión en ambos sentidos, valores negativos/no finitos y redondeo.
- Ingreso cero al calcular margen, desperdicio relativo, scoring o promedios; comprobar error útil y que no aparezcan `NaN`/`Infinity`.
- Referencias a locación/ítem inexistentes y registro inconsistente.
- Estados activos e inactivos, incluyendo identificación del estado inactivo en comparación por país.
- Valores inválidos de cada campo relevante de validación y acumulación de múltiples errores.
- No mutación de arrays en ordenamientos y ranking.
- Desempates de ranking y de artículos más vendidos de manera determinista.

Criterios globales: type safety; resultados acordes a fórmulas; casos límite explícitos; funciones puras; no mutación; exactitud de moneda; fechas interpretadas por la zona de cada locación; mensajes de error accionables; organización bajo `domain/`.

## 11. Matriz de cobertura del briefing

| Área solicitada       | Elementos que quedan especificados                                                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Modelado de entidades | `Price`, `MenuItem`, `SaleTransaction`, `Location`, `WasteRecord` y tipos asociados; `Location.timeZone` añadido por requisito de zona local. |
| Colecciones           | Seis funciones requeridas, incluida fecha local y ordenamientos no mutantes.                                                                  |
| Búsqueda              | Tres funciones: ID, nombre case-insensitive y búsqueda binaria.                                                                               |
| Finanzas/moneda       | Ingreso diario, margen, costo de desperdicio y conversión USD/COP.                                                                            |
| Scoring/ranking       | Dos funciones; métricas, pesos, fecha de evaluación, transacciones, estados de locación y errores.                                            |
| Agregaciones/reportes | Cinco funciones, incluida comparación país por país y ambas monedas.                                                                          |
| Validaciones          | Tres funciones requeridas con reglas explícitas y comprobaciones adicionales razonables.                                                      |
| Ejemplos              | Fixtures del briefing cubiertos; no inventar datos completos del menú.                                                                        |
| Calidad/casos límite  | Errores, fechas, zonas, referencias, vacíos, redondeo, inmutabilidad, pureza y validaciones descritos.                                        |

**Compromiso de alcance:** ninguna función del briefing se descarta. Las diferencias de firmas se limitan a los parámetros necesarios para manejar zona horaria local (`locations`) y una fecha de evaluación explícita (`asOfDate`); se documentarán en la implementación futura.

## 12. Decisiones y limitaciones explícitas

- `timeZone` se añade a `Location`; las funciones de rango/ingreso diario recibirán contexto de locaciones. Las fechas calendario deben interpretarse por restaurante.
- Los argumentos de día calendario y `asOfDate` usan `CalendarDate` (`YYYY-MM-DD`); las marcas temporales de ventas y desperdicio permanecen como `Date`.
- El scoring usa `asOfDate`, fecha de evaluación explícita, y cuenta desde el 1 de enero de `openingYear` hasta ese día inclusive.
- “Conteo total de ventas” y ticket promedio se basan en transacciones; `findTopSellingItems` se basa en unidades (`quantity`).
- Los cálculos matemáticamente indefinidos lanzan errores descriptivos con causa y solución.
- Aunque las firmas TypeScript describan elementos no nulos, si en ejecución se recibe `null`/`undefined` donde se espera una entidad, fecha o colección, no se debe ignorar silenciosamente ni dejar que el error sea críptico: rechazarlo con un error descriptivo o, en validadores, incluirlo en `errors` cuando la firma se diseñe para aceptar entradas no confiables.
- Las métricas de país cuentan solo locaciones activas y documentan por estado las inactivas en `inactiveLocations`; cada moneda se informa aparte.
- Los cierres temporales no se descuentan de días estimados porque el dominio no tiene historial diario de operación. La precisión de este cálculo queda limitada por `openingYear` y la falta de historial.
- La estructura aprobada para `calculateCountryComparison` conserva los cuatro campos de `CountryMetrics` y añade `inactiveLocations` con el ID y estado de cada locación no activa. El ranking desempata puntajes iguales por ID ascendente.
