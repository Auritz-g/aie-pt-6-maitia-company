# Tareas de implementación del dominio Brasaland

Checklist derivado de [`specs.md`](./specs.md), [`plan.md`](./plan.md) y [`../BRIEFING.md`](../BRIEFING.md). Las tareas de implementación marcadas se contrastaron con el código existente; las pruebas funcionales y la verificación integral siguen pendientes y no se dan por realizadas.

## 1. Preparación

- [x] Revisar la estructura y configuración TypeScript existentes dentro de `domain/`.
- [x] Confirmar qué compilador y herramientas de prueba ya están disponibles, sin instalar dependencias.
- [x] Confirmar la ubicación de los módulos de implementación dentro de `domain/`.
- [x] Acordar `CalendarDate` como cadena `YYYY-MM-DD` para días calendario y `asOfDate`.
- [x] Registrar las herramientas de verificación disponibles y los comandos que se usarán.

## 2. Tipos de dominio

- [x] Definir `Price` con importes `USD` y `COP`.
- [x] Definir `MenuCategory` con los cinco valores especificados.
- [x] Definir `MenuItemStatus` con sus tres valores permitidos.
- [x] Definir `MenuItem` con todos los campos requeridos.
- [x] Definir `PaymentMethod` con los cuatro valores permitidos.
- [x] Definir `SaleTransaction` con todos los campos requeridos.
- [x] Definir `Country` como `Colombia` o `USA`.
- [x] Definir `LocationStatus` con los tres estados permitidos.
- [x] Definir `Location` con todos los campos requeridos.
- [x] Añadir `timeZone` obligatorio a `Location`.
- [x] Definir `WasteReason` con las cinco razones permitidas.
- [x] Definir `WasteRecord` con todos los campos requeridos.
- [x] Definir `CountryMetrics` con los cuatro campos especificados.
- [x] Revisar que los tipos y uniones tengan los nombres y valores literales acordados.

## 3. Colecciones

- [x] Implementar `filterSalesByLocation`.
- [x] Implementar `filterSalesByDateRange` con contexto de locaciones.
- [x] Interpretar el rango de fechas como inclusivo y local a cada locación.
- [x] Rechazar fechas inválidas y rangos cuyo inicio sea posterior al fin.
- [x] Rechazar ventas cuyo `locationId` no pueda resolverse para obtener la zona horaria.
- [x] Implementar `filterMenuItemsByCategory`.
- [x] Implementar `filterActiveLocations`.
- [x] Implementar `sortLocationsByCapacity` sin mutar el array original.
- [x] Implementar `sortMenuItemsByPrice` por la moneda seleccionada, sin mutar el array original.

## 4. Búsqueda

- [x] Implementar `findLocationById` con retorno `null` si no hay coincidencia.
- [x] Implementar `findMenuItemByName` con comparación case-insensitive.
- [x] Ignorar espacios externos en los nombres comparados por `findMenuItemByName`.
- [x] Implementar `binarySearchLocationByCapacity` para capacidades en orden ascendente.
- [x] Devolver `-1` desde la búsqueda binaria cuando no haya coincidencia.

## 5. Cálculos financieros y moneda

- [x] Implementar `calculateDailyRevenue` por día local y moneda seleccionada.
- [x] Devolver cero para el ingreso diario cuando no haya ventas en el día.
- [x] Implementar `calculateLocationMargin` usando solo ventas de la locación indicada.
- [x] Resolver cada `itemId` de venta contra `menuItems` al calcular el margen.
- [x] Calcular el costo de ingredientes multiplicando costo unitario por cantidad.
- [x] Rechazar IDs de menú faltantes al calcular el margen, identificando el registro inconsistente.
- [x] Rechazar ingreso total cero al calcular el margen con un error descriptivo.
- [x] Implementar `calculateWasteCost` por locación y moneda.
- [x] Devolver cero para el costo de desperdicio cuando no haya registros aplicables.
- [x] Implementar `convertCurrency` con la tasa fija de 1 USD = 4000 COP.
- [x] Devolver el importe original cuando la moneda de origen y destino coincidan.
- [x] Redondear los resultados financieros donde lo exige la especificación.
- [x] Rechazar valores no finitos o inválidos sin ocultarlos como resultados válidos.

## 6. Scoring y ranking

- [x] Implementar el componente de ingresos del scoring con tope de 40 puntos.
- [x] Implementar el componente de eficiencia usando cantidad de transacciones y capacidad, con tope de 30.
- [x] Implementar el componente de control de desperdicio con tope inferior de cero y máximo de 20.
- [x] Implementar el componente de margen con máximo de 10 puntos.
- [x] Limitar los registros del cálculo a los asociados con `location.id`.
- [x] Calcular los días estimados desde el 1 de enero del año de apertura hasta `asOfDate`, inclusive.
- [x] Rechazar `asOfDate` anterior al inicio del año de apertura.
- [x] Rechazar ingresos cero cuando impidan calcular las proporciones del score.
- [x] Redondear el score final a dos decimales y comprobar que queda entre 0 y 100.
- [x] Documentar que no se descuentan cierres temporales por falta de historial diario.
- [x] Definir el desempate determinista del ranking por `location.id` ascendente.
- [x] Implementar `rankLocationsByPerformance` incluyendo solo locaciones activas.
- [x] Ordenar el ranking de mayor a menor sin mutar las entradas.
- [x] Incluir el ID de la locación en errores de puntuación propagados por el ranking.

## 7. Agregaciones e informes

- [x] Implementar `countSalesByPaymentMethod` con las cuatro claves, incluso si su conteo es cero.
- [x] Implementar `calculateAverageTicket` como promedio por transacción.
- [x] Rechazar el promedio de ticket cuando no haya ventas.
- [x] Validar que `topN` de `findTopSellingItems` sea entero y no negativo.
- [x] Hacer que `findTopSellingItems` devuelva lista vacía para `topN` igual a cero.
- [x] Agrupar `findTopSellingItems` por `itemId` y sumar unidades vendidas.
- [x] Resolver cada ítem vendido contra `menuItems` y reportar referencias faltantes.
- [x] Ordenar los ítems por unidades y desempatar por orden de primera aparición.
- [x] Implementar `groupWasteByReason` con las cinco claves y arrays vacíos cuando corresponda.
- [x] Implementar las métricas de Colombia y USA en `calculateCountryComparison`.
- [x] Contar solo locaciones activas en `totalLocations`.
- [x] Contar transacciones, no unidades, en `totalSales`.
- [x] Sumar ingresos USD y COP por separado.
- [x] Calcular ingreso promedio por locación activa de cada país.
- [x] Rechazar un país sin locaciones activas con error descriptivo por denominador cero.
- [x] Rechazar ventas cuya locación no exista, identificando la inconsistencia.
- [x] Acordar `inactiveLocations` con ID y estado sin eliminar los cuatro campos de `CountryMetrics`.

## 8. Validaciones

- [x] Implementar `validateMenuItem` con resultado `{ valid, errors }`.
- [x] Validar identidad y nombre no vacío de `MenuItem`.
- [x] Validar categoría y estado permitidos de `MenuItem`.
- [x] Validar precios y costos positivos y finitos de `MenuItem`.
- [x] Validar tiempo de preparación mayor que cero y no superior a 60.
- [x] Validar disponibilidad booleana y al menos un país disponible.
- [x] Validar que alérgenos sea un array de cadenas no vacías.
- [x] Implementar `validateSaleTransaction` con resultado `{ valid, errors }`.
- [x] Validar identidad y campos de texto obligatorios de la venta.
- [x] Validar cantidad y precios positivos y finitos de la venta.
- [x] Validar método de pago permitido y fecha `Date` válida.
- [x] Implementar `validateLocation` con resultado `{ valid, errors }`.
- [x] Validar identidad, país y estado de la locación.
- [x] Validar año de apertura entero entre 2008 y el año de referencia.
- [x] Permitir inyectar referencia temporal para probar el año de apertura determinísticamente.
- [x] Validar capacidad y personal como enteros positivos finitos.
- [x] Validar renta y servicios en ambas monedas como importes positivos finitos.
- [x] Validar que `timeZone` sea un identificador IANA reconocido.
- [x] Confirmar que cada validador acumula errores con identificación de campo.
- [x] No imponer que el costo de ingredientes sea menor que el precio.

## 9. Pruebas y revisión

- [ ] Preparar fixtures a partir de los tres ítems, dos locaciones y dos ventas de `BRIEFING.md`.
- [ ] Añadir zonas IANA explícitas a los fixtures de locaciones para probar el requisito `timeZone`.
- [ ] No inventar artículos, precios ni costos operativos adicionales.
- [ ] Probar cada función requerida con casos normales.
- [ ] Probar arrays vacíos y resultados sin coincidencias.
- [ ] Probar extremos inclusivos del rango y ventas cerca de medianoche en zonas distintas.
- [ ] Probar fecha inválida, rango invertido y zona horaria no válida.
- [ ] Probar USD, COP, conversiones en ambos sentidos y redondeo.
- [ ] Probar valores no finitos y los errores de margen, proporciones y promedio sin datos.
- [ ] Probar referencias de locación e ítem inexistentes.
- [ ] Probar locaciones activas e inactivas y sus estados en el reporte acordado.
- [ ] Probar errores de validación y acumulación de varios errores.
- [ ] Comprobar que los ordenamientos y el ranking no muten sus entradas.
- [ ] Probar desempates deterministas de artículos y ranking.
- [ ] Ejecutar las comprobaciones disponibles para `domain/` sin añadir dependencias no aprobadas.
- [ ] Comparar la cobertura final con todas las funciones y criterios de `specs.md`.
- [ ] Registrar verificaciones no ejecutadas y sus motivos.

## 10. Pendientes que bloquean decisiones

- [x] Confirmar formato final de los argumentos que representan días calendario: `YYYY-MM-DD`.
- [x] Resolver la forma de reportar locaciones inactivas junto con `CountryMetrics`: campo `inactiveLocations` por país.
- [x] Definir desempate determinista del ranking: `location.id` ascendente.
- [ ] Confirmar herramientas de prueba disponibles; solicitar aprobación antes de añadir dependencias si fueran necesarias.
