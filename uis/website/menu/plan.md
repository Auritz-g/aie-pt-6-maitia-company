# Plan de trabajo — Menú dinámico de Brasaland

**Estado:** plan para una implementación futura; no autoriza cambios de implementación.  
**Especificación funcional:** [`specs.md`](./specs.md)  
**Fuente del contenido:** [`menu.md`](./menu.md)

## Objetivo

Planificar la sustitución futura de la imagen de la carta por un menú funcional en castellano, responsive y accesible, respetando el contenido y los criterios de [`specs.md`](./specs.md). La ejecución de las fases que impliquen cambios en la página, estilos o scripts requerirá autorización explícita posterior.

## Fases previstas

### 1. Contrastar y preparar el contenido

- Comparar las siete categorías y sus productos en `menu.md` con la distribución y traducciones definidas en `specs.md`.
- Preparar el texto final en castellano, conservando los nombres de platos y toda la información disponible en la fuente.
- Confirmar que no se incorporen precios ni datos, ingredientes o afirmaciones no proporcionados.

**Resultado esperado:** contenido de las siete categorías listo para estructurarse en la página.

### 2. Estructurar la página del menú

- En una implementación autorizada, actualizar `uis/website/menu/index.html` para reemplazar la imagen como contenido principal por un encabezado de marca y las siete tarjetas con contenido completo.
- Mantener el enlace de regreso a la landing y utilizar jerarquía de encabezados, landmarks y controles nativos accesibles.
- Conservar el orden móvil establecido y la distribución por columnas especificada para tablet y escritorio.

**Resultado esperado:** estructura semántica que permita leer toda la carta sin activar las tarjetas.

### 3. Implementar la ampliación interactiva

- En una implementación autorizada, añadir JavaScript sencillo, sin dependencias, para abrir una categoría en una presentación modal centrada.
- Proporcionar cierre visible, cierre con Escape, gestión y devolución del foco, y evitar interacción o desplazamiento del fondo mientras el modal esté abierto.
- Si se incluye cierre al activar el fondo, evitar que la interacción dentro del modal lo cierre accidentalmente.

**Archivo previsto:** `uis/website/menu/menu.js`.

**Resultado esperado:** cada categoría se amplía de forma operable con teclado y dispositivos táctiles, con comportamiento accesible.

### 4. Adaptar los estilos

- En una implementación autorizada, añadir o ajustar reglas en el `styles.css` de la raíz, limitándolas a selectores bajo `.menu-page` para evitar efectos colaterales.
- Aplicar diseño mobile-first: una columna en móvil y dos columnas desde el breakpoint de tablet.
- En tablet y escritorio, ubicar Entradas, Pollo a la brasa y Cortes a la brasa a la izquierda; y Menús ligeros y bowls, Acompañamientos, Postres y Bebidas a la derecha.
- Estilizar el modal para mantenerlo dentro del viewport, con desplazamiento interno para contenido largo, fondo atenuado y desenfocado, foco visible y adaptación a movimiento reducido.

**Resultado esperado:** presentación responsive coherente con la dirección visual documentada y sin desbordamiento horizontal.

### 5. Verificar la implementación cuando se autorice

- Contrastar el contenido implementado con `menu.md` y los requisitos de `specs.md`.
- Comprobar los layouts móvil, tablet y escritorio, incluidas la distribución por columnas y la adaptación del modal a viewports pequeños.
- Probar apertura y cierre de las siete categorías, teclado, Escape, foco, control de cierre y, si existe, cierre al activar el fondo.
- Revisar semántica y accesibilidad, contenido largo, desplazamiento interno, movimiento reducido y posibles efectos colaterales en landing y formulario.
- Inspeccionar el código y los diagnósticos disponibles. Registrar únicamente las comprobaciones efectivamente realizadas; no declarar pruebas visuales o interactivas si no se ejecutaron.

**Resultado esperado:** evidencia verificable respecto a los criterios de aceptación de `specs.md`.

## Archivos previstos para una futura implementación

- `uis/website/menu/index.html` — estructura y contenido de la página.
- `uis/website/menu/menu.js` — interacción, si se mantiene el script separado.
- `styles.css` — estilos del menú con alcance limitado a `.menu-page`.

No se prevé modificar la landing ni eliminar `menu.png`. La conservación o eliminación del recurso podrá decidirse durante una implementación autorizada. No se prevé añadir dependencias.

## Límite de este plan

Este documento solo organiza el trabajo futuro. **No implementa ni autoriza por sí mismo cambios en HTML, CSS o JavaScript.** Cada fase que modifique esos archivos queda pendiente de autorización explícita.
