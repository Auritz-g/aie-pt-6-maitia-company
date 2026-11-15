### Backend / Lógica

- [x] Define las **interfaces TypeScript** para todas las entidades principales de tu empresa especificadas en tu BRIEFING.md
- [x] Implementa funciones de **filtrado** que permitan buscar elementos por uno o más criterios (por ejemplo: filtrar por categoría, por rango de precio, por estado)
- [x] Implementa funciones de **ordenamiento** que ordenen arrays según diferentes criterios (ascendente, descendente, por múltiples campos)
- [x] Implementa **búsqueda lineal** para encontrar elementos en arrays desordenados
- [x] Implementa **búsqueda binaria** para encontrar elementos en arrays previamente ordenados
- [x] Crea funciones de **agregación** que generen reportes: contar elementos por categoría, calcular totales, promedios, máximos y mínimos
- [x] Implementa **validaciones de negocio** que verifiquen que los objetos cumplen con las reglas de tu BRIEFING.md antes de ser procesados
- [x] Todas las funciones deben tener **tipos explícitos** en parámetros y valores de retorno
- [x] El código debe seguir el principio de **responsabilidad única**: cada función hace una sola cosa
- [x] El proyecto incluye un comando claro para validar o ejecutar el código TypeScript durante el desarrollo (comando Node documentado para sintaxis; no incluye typecheck)

> ⚠️ **IMPORTANTE:** Los nombres de campos, tipos de entidades y reglas de validación en tu implementación deben coincidir exactamente con lo especificado en tu BRIEFING.md. Una implementación genérica que ignore el contexto no será aceptada.

### Frontend / Pruebas (Opcional)

- [ ] Crea una página HTML simple con **Tailwind CSS** que te permita probar tus funciones manualmente
- [ ] Incluye botones o controles para ejecutar diferentes operaciones (filtrar, buscar, ordenar, generar reportes)
- [ ] Muestra los resultados de las operaciones en la interfaz de forma clara

Si agregas una página `index.html` para probar tus funciones manualmente, asegúrate de poder servirla en local o en Codespaces con un comando simple como:

```bash
npx http-server . -p 3000 -a 0.0.0.0
```

### Calidad de Código

- [x] Usa **nombres descriptivos** para variables, funciones e interfaces (camelCase para variables y funciones, PascalCase para interfaces)
- [x] Cada función debe ser **pura**: trabaja solo con lo que recibe por parámetros, sin modificar variables globales
- [ ] Escribe **comentarios** solo cuando sea necesario para explicar lógica compleja, no para describir código obvio
- [x] Maneja correctamente **casos vacíos**: arrays vacíos, elementos no encontrados, valores nulos
- [x] Usa **const** por defecto y **let** solo cuando el valor vaya a cambiar
- [x] Mantén la **indentación** y el formato consistentes en todo el código

---

## ✅ Lo que Evaluaremos

### Corrección técnica

- [ ] Las interfaces TypeScript modelan correctamente las entidades especificadas en el BRIEFING.md con todos sus campos y tipos
- [ ] Las funciones de filtrado devuelven correctamente los elementos que cumplen los criterios especificados
- [ ] El ordenamiento funciona correctamente en orden ascendente y descendente
- [ ] La búsqueda lineal encuentra elementos en arrays desordenados sin errores
- [ ] La búsqueda binaria funciona correctamente en arrays ordenados y devuelve el índice correcto o -1 si no se encuentra
- [ ] Las agregaciones calculan correctamente totales, promedios, conteos y valores extremos (implementadas, pendientes de pruebas funcionales)
- [ ] Las validaciones rechazan datos que no cumplen con las reglas de negocio del BRIEFING.md
- [ ] No hay errores de compilación de TypeScript en ningún archivo
- [x] Existe un comando documentado para validar o ejecutar TypeScript en local (Node `--check` sobre cada `.ts`; sintaxis solamente, no chequea tipos)

### Estructura y organización

- [x] El código está organizado en archivos separados por responsabilidad (types, utils, validations)
- [x] Cada función tiene una única responsabilidad claramente identificable
- [x] Los nombres de variables, funciones e interfaces son descriptivos y siguen las convenciones de TypeScript

### Adaptación al contexto

- [x] Todos los nombres de entidades, campos y tipos coinciden exactamente con los especificados en el BRIEFING.md
- [ ] Las validaciones implementadas corresponden a las reglas de negocio definidas en el BRIEFING.md
- [ ] Los reportes generados responden a las necesidades específicas descritas en el BRIEFING.md

### Calidad de código

- [x] Las funciones son puras: no dependen de estado global ni modifican entradas
- [ ] Se manejan correctamente casos límite: arrays vacíos, elementos no encontrados, valores nulos (implementación con guardas/casos vacíos, pendiente de pruebas funcionales)
- [x] El código sigue las mejores prácticas de TypeScript: tipos explícitos, uso de const/let apropiado, evita any