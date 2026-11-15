# Tareas — Menú dinámico de Brasaland

**Estado:** preparación, estructura, interacción y retoque visual implementados; verificaciones visuales e interactivas en navegador pendientes.  
**Plan:** [`plan.md`](./plan.md) · **Especificación:** [`specs.md`](./specs.md) · **Fuente del contenido:** [`menu.md`](./menu.md)

> Completa las tareas en orden y marca una casilla solo después de realizar y comprobar ese trabajo. Si una tarea requiere una decisión o autorización que no está disponible, detente y deja constancia del bloqueo. Este checklist organiza el trabajo futuro: **no autoriza por sí solo la implementación**. Las tareas que modifiquen HTML, CSS o JavaScript requieren autorización explícita.

## 1. Preparar el contenido

- [x] Comparar las siete categorías y sus productos de `menu.md` con la lista y el orden indicados en `specs.md`.
- [x] Preparar el texto de cada categoría en castellano, manteniendo los nombres propios y el sentido de la fuente.
- [x] Revisar que el contenido preparado no añada precios, ingredientes, datos o afirmaciones que no aparezcan en la fuente.

**Completa esta sección cuando:** las siete categorías estén listas para incorporarse a la página y sean fieles a `menu.md` y `specs.md`.

## 2. Actualizar la estructura de la página

> Requiere autorización explícita para implementar.

- [x] En `uis/website/menu/index.html`, reemplazar la imagen de la carta como contenido principal por el encabezado y el contenido estructurado del menú.
- [x] Añadir las siete tarjetas con todo el contenido preparado, de manera que la carta completa se pueda leer sin abrirlas.
- [x] Usar `lang="es"`, landmarks semánticos y una jerarquía de encabezados ordenada, con un `h1` para la página y encabezados para las categorías.
- [x] Añadir controles nativos y accesibles para ampliar cada categoría; no hacer interactivo únicamente el contenedor de la tarjeta.
- [x] Mantener el enlace de regreso a la landing (`../../../index.html`).
- [x] Confirmar estáticamente que el orden móvil del HTML sea Entradas, Pollo a la brasa, Cortes a la brasa, Menús ligeros y bowls, Acompañamientos, Postres y Bebidas.

**Completa esta sección cuando:** la estructura permita leer el menú completo y navegar por la página con controles accesibles.

## 3. Añadir la interacción de ampliación

> Requiere autorización explícita para implementar.

- [x] Crear `uis/website/menu/menu.js` con JavaScript sencillo y sin dependencias para abrir una sola categoría ampliada a la vez.
- [x] Mostrar la categoría activa en un diálogo nativo centrado y comunicar su nombre mediante el encabezado accesible.
- [x] Añadir un botón de cierre visible, con nombre accesible, y permitir el cierre con Escape.
- [x] Al abrir, mover el foco al botón de cierre del diálogo y, al cerrar, devolverlo al control que lo abrió.
- [x] Usar `showModal()` para impedir la interacción con el fondo mientras el diálogo está abierto.
- [x] Implementar cierre al activar el fondo atenuado, con condición para no cerrar al interactuar con el contenido del diálogo.
- [x] Estilizar el área de contenido con desplazamiento interno y mantener encabezado y botón de cierre fuera de esa área.

**Completa esta sección cuando:** cada categoría se pueda abrir y cerrar con teclado y táctil, con foco y desplazamiento previsibles.

## 4. Adaptar el diseño responsive

> Requiere autorización explícita para implementar.

- [x] Añadir o ajustar en el `styles.css` de la raíz estilos del menú limitados a selectores bajo `.menu-page`.
- [x] Implementar dos columnas de tarjetas en móvil, tablet y escritorio; el contenido dentro de cada tarjeta mantiene su flujo propio.
- [x] Ubicar Entradas, Pollo a la brasa y Cortes a la brasa en la columna izquierda en todos los tamaños.
- [x] Ubicar Menús ligeros y bowls, Acompañamientos, Postres y Bebidas en la columna derecha en todos los tamaños.
- [x] Estilizar el diálogo para limitarlo al viewport, con márgenes y desplazamiento interno para contenido largo.
- [x] Aplicar atenuación y desenfoque progresivo al fondo; la atenuación permanece aunque el desenfoque no sea compatible.
- [x] Mantener estilos de foco visible, contraste legible y controles con objetivos táctiles; añadir regla del diálogo para `prefers-reduced-motion`.
- [x] Revisar estáticamente padding y márgenes de tablet/escritorio y unificarlos desde el breakpoint de dos columnas; modernizar tarjetas y diálogo con esquinas más redondeadas sin cambiar la paleta.
- [ ] Comprobar en navegador que tarjetas, controles y diálogo no produzcan desbordamiento horizontal ni interfieran con el zoom de texto.

> La revisión visual en navegador sigue pendiente: no hay un navegador gráfico disponible en el entorno de esta sesión.

**Completa esta sección cuando:** la disposición y el modal se adapten a móvil, tablet y escritorio sin comprometer legibilidad ni uso.

## 5. Verificar la implementación

> Estas comprobaciones se realizan solo después de que la implementación esté autorizada y exista.

- [ ] Comparar los nombres, productos y descripciones implementados con `menu.md` y `specs.md`; confirmar que no se añadieron precios ni datos ajenos a la fuente.
- [ ] Comprobar en móvil las dos columnas de tarjetas, el ajuste del contenido y la ausencia de desbordamiento horizontal.
- [ ] Comprobar en tablet y escritorio las dos columnas y la distribución especificada para cada una.
- [ ] Abrir y cerrar cada una de las siete categorías; probar el botón de cierre, Escape y el cierre al activar el fondo si se implementó.
- [ ] Comprobar el uso con teclado, el orden de tabulación, el foco visible, el confinamiento del foco en el modal y su devolución al control activador.
- [ ] Comprobar la semántica accesible del modal y de sus controles con las tecnologías de asistencia disponibles; registrar qué se probó.
- [ ] Probar una categoría con contenido largo en un viewport pequeño y confirmar el desplazamiento interno y el acceso al cierre.
- [ ] Comprobar el comportamiento con movimiento reducido y que el desenfoque no sea imprescindible para comprender la interfaz.
- [ ] Revisar el enlace de la landing al menú y el enlace de regreso; comprobar que landing y formulario no presentan efectos colaterales.
- [x] Inspeccionar el código y los diagnósticos estáticos disponibles; se validaron `node --check`, `git diff --check` y diagnósticos del editor. No se ejecutaron pruebas visuales ni funcionales en navegador.
- [x] Revisar estáticamente los enlaces de la landing al menú y de regreso, y la estructura CSS responsive; esto no sustituye la comprobación en navegador de navegación, desbordamiento ni efectos visuales.

**Completa esta sección cuando:** las verificaciones realizadas estén registradas con precisión, sin afirmar pruebas que no se ejecutaron.

## Cierre

- [x] Registrar los cambios de esta actualización en `styles.css` y los pendientes de verificación en este checklist y en `memory-bank/progress.md`.
- [x] Confirmar por estado/inspección que `menu.png` no se eliminó y que no se añadieron dependencias.

**Criterio de cierre:** tareas completadas y verificadas según los criterios de aceptación de `specs.md`; los pendientes y límites de verificación quedan documentados.
