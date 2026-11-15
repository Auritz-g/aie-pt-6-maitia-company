# Especificación — Menú dinámico de Brasaland

**Estado:** especificación funcional para una implementación futura; no implica que el código esté implementado.  
**Fuente del contenido:** [`menu.md`](./menu.md)  
**Contexto visual y técnico del sitio:** [`../contexto-website.md`](../contexto-website.md)

## 1. Objetivo

Sustituir la carta presentada actualmente como una imagen por una página de menú funcional, completa y responsive. La carta se organizará en tarjetas por categoría. Al activar una tarjeta, esta se presentará ampliada y centrada sobre un fondo atenuado y desenfocado.

La página seguirá siendo accesible desde el enlace «Menú» de la landing y ofrecerá una forma clara de volver a Brasaland.

Esta especificación documenta el trabajo futuro. No autoriza ni describe como realizados cambios de implementación.

## 2. Alcance

Incluye:

- Presentación en español de los platos, descripciones, opciones y acompañamientos que aparecen en `menu.md`.
- Un encabezado centrado que presente la marca Brasaland y su lema.
- Una tarjeta por cada tipo de plato/categoría.
- Diseño de dos columnas para las tarjetas de categorías en móvil, tablet y escritorio; el contenido interno de cada tarjeta conserva su propio flujo.
- Interacción para ampliar una categoría en el centro de la pantalla y desenfocar/atenuar el fondo.
- Interacción operable con teclado y dispositivos táctiles, con estados de foco y cierre accesibles.
- Uso de JavaScript sencillo para abrir y cerrar la categoría ampliada, sin dependencias nuevas.

Fuera de alcance:

- Pedidos, pagos, reservas, carrito, filtros, búsqueda o personalización del menú.
- Backend, persistencia de datos, analítica o envío de información.
- Añadir precios, ingredientes, advertencias de alérgenos, datos de locales u otros contenidos no incluidos en la fuente aprobada.
- Añadir imágenes externas o sustituir la carta por nuevos recursos no aprobados.
- Traducir o presentar una versión en inglés. Esta versión será únicamente en castellano.
- Cambiar la landing, el formulario de Brasa Points o los enlaces que no sean necesarios para conservar el acceso actual al menú.

## 3. Idioma y fidelidad del contenido

- Toda la interfaz y las descripciones se presentarán en castellano (`lang="es"`).
- Se conservarán los nombres propios y nombres de platos tal como aparecen en la fuente cuando sean parte del nombre del producto, por ejemplo _Punta de Anca_, _Lomo al Trapo_, _Brasa Bowl_ y _Refajo Brasaland_.
- Las descripciones que actualmente estén en inglés se expresarán en castellano, conservando la información y el sentido de `menu.md`; no se añadirá información que la fuente no respalde.
- No se mostrarán los nombres ingleses de categorías como traducción secundaria. Se usarán estos títulos en castellano: **Entradas**, **Pollo a la brasa**, **Cortes a la brasa**, **Menús ligeros y bowls**, **Acompañamientos**, **Postres** y **Bebidas**.
- No se publicarán precios, ya que la fuente no los proporciona.
- La frase de cierre de la fuente, «Tradición • Sabor • Colombia», puede conservarse como cierre visual de la carta.

## 4. Contenido y distribución

La página tendrá siete tarjetas dispuestas en dos columnas en móvil, tablet y escritorio, conservando este orden por columna. El contenido dentro de las tarjetas puede fluir en una columna para ajustarse al ancho disponible:

### Columna izquierda (tablet y escritorio)

1. **Entradas**
   - Empanaditas de la Casa (4 unidades): masa de maíz crujiente rellena de carne desmechada o pollo a la brasa; con ají de la casa y guacamole.
   - Chorizo Santarrosano a la Brasa: chorizo colombiano a la brasa con arepa de choclo, queso campesino derretido y limón.
   - Chicharroncito Crocante: tiras crujientes de panceta de cerdo a la brasa con patacones y suero costeño.
   - Arepitas con Todo: tres arepas pequeñas de maíz blanco con pollo a la brasa, carne desmechada y queso costeño.
2. **Pollo a la brasa**
   - Mantener la nota de preparación de la fuente: condimentado con la mezcla tradicional de especias y asado lentamente sobre carbón natural.
   - Pollo entero: pollo completo; incluye 2 acompañamientos grandes, 4 arepas y ají.
   - Medio pollo: mitad de pollo (pechuga/ala y pierna/muslo); incluye 2 acompañamientos regulares, 2 arepas y ají.
   - Un cuarto: elección de carne blanca u oscura; incluye 2 acompañamientos regulares, 1 arepa y ají.
3. **Cortes a la brasa**
   - Punta de Anca / Picanha a la Brasa (300 g): tapa de sirloin a la brasa con chimichurri de la casa.
   - Lomo al Trapo Tradicional (300 g): lomo de res envuelto en sal marina y hierbas, cocinado directamente sobre brasas.
   - Costillas de Cerdo en BBQ de Panela: costillas ahumadas con salsa BBQ de panela y maracuyá.
   - Parrillada Brasaland (para compartir, 2–3 personas): sirloin, pechuga de pollo a la brasa, chorizo, chicharrón, morcilla, patacones, papa criolla y arepitas.

### Columna derecha (tablet y escritorio)

1. **Menús ligeros y bowls**
   - Brasa Bowl: base de arroz con coco o arroz blanco, fríjoles, pollo a la brasa o carne desmechada, plátano maduro, maíz, pico de gallo y aguacate fresco.
   - Ensalada del Campo a la Brasa: hojas verdes, pechuga de pollo a la brasa, queso fresco, maíz dulce, tomates cherry, tiras de plátano y vinagreta de maracuyá.
2. **Acompañamientos**
   - Papas criollas fritas.
   - Yuca frita o al vapor con mojo de ajo.
   - Patacones con hogao.
   - Arroz con coco o arroz blanco.
   - Fríjoles antioqueños.
   - Plátano maduro con queso y bocadillo.
   - Ensalada de la casa de repollo y zanahoria con aderezo dulce.
3. **Postres**
   - Aborrajado Valluno: plátano maduro relleno de queso y bocadillo, apanado y frito.
   - Tres Leches de Maracuyá: bizcocho remojado en tres leches con maracuyá.
   - Flan de Coco Artesanal: flan de coco con caramelo de caña.
4. **Bebidas**
   - Jugos naturales: lulo, maracuyá, mango y mora; indicar que se preparan con agua o leche.
   - Bebidas tradicionales: limonada de coco, Refajo Brasaland (mezcla tradicional de gaseosa colombiana y cerveza), agua de panela con limón y gaseosas Colombiana, Postobón y Coca-Cola.

En todos los tamaños, la columna izquierda contiene Entradas, Pollo a la brasa y Cortes a la brasa; la derecha contiene Menús ligeros y bowls, Acompañamientos, Postres y Bebidas. En móvil se mantiene esta distribución en dos columnas, evitando desbordamiento horizontal y permitiendo que los títulos y controles se ajusten al ancho.

## 5. Encabezado de marca

- El encabezado de la página tendrá un bloque de marca centrado horizontalmente.
- El contenido será «Brasaland» y el lema «Sabor a la Brasa de Nuestra Tierra», tomados de `menu.md`.
- El encabezado podrá incluir una frase breve de presentación en castellano, fiel a la identidad descrita en la fuente: cadena de restaurantes colombiana de comida a la brasa. No añadir cifras, promesas ni datos operativos que no sean necesarios o no estén aprobados.
- Mantener un enlace claramente identificable para volver a la página principal (`../../../index.html` desde esta ubicación), sin competir visualmente con la marca centrada.

## 6. Tarjetas e interacción de ampliación

### Estado inicial

- Cada categoría se presenta como una tarjeta dentro de la rejilla.
- La tarjeta muestra el encabezado de la categoría y su contenido completo, de forma que toda la carta se pueda leer recorriendo la página sin abrir ninguna tarjeta.
- Las tarjetas tienen una indicación visual consistente de que se pueden ampliar, además de ser operables con teclado y táctil.
- El texto y los controles no deben desbordar la tarjeta ni producir desplazamiento horizontal de la página.

### Estado ampliado

- Al activar una tarjeta, se abre una presentación modal centrada que amplía visualmente esa categoría y muestra su contenido completo.
- El resto de la página queda visualmente atenuado y desenfocado detrás del modal; el foco visual y de teclado queda en el contenido ampliado.
- Solo se presenta una categoría ampliada a la vez.
- La tarjeta ampliada debe permanecer dentro del viewport. Si su contenido excede la altura disponible, el contenido del modal tendrá desplazamiento vertical propio, manteniendo accesibles el encabezado y el control de cierre.
- Mientras el modal esté abierto, impedir que el fondo se desplace o reciba interacción, sin ocultar el contenido a tecnologías de asistencia de forma incorrecta.
- Incluir un botón de cierre visible y con nombre accesible. También se cerrará con la tecla Escape. Al cerrar, devolver el foco al control que abrió la categoría.
- El clic/tap en el fondo atenuado puede cerrar el modal; si se implementa, debe coexistir con el botón de cierre y no cerrar al interactuar con el contenido del modal.
- La transición será breve y discreta; respetará `prefers-reduced-motion` y no será necesaria para comprender el cambio de estado.

## 7. Accesibilidad y semántica

- Usar landmarks y encabezados semánticos con jerarquía ordenada: un `h1` para la página y un encabezado de nivel inferior para cada categoría.
- La apertura se realizará mediante controles nativos accesibles, como un botón asociado a cada tarjeta; no depender únicamente de hacer clic en un contenedor no interactivo.
- Comunicar el nombre de la categoría que se abre y el propósito del control con una etiqueta accesible.
- Si el modal se implementa como diálogo, exponer su semántica modal, mover el foco de forma predecible al abrir y devolverlo al control activador al cerrar. El foco no debe escapar al fondo mientras esté abierto.
- Mantener orden de tabulación lógico, foco visible, contraste suficiente y objetivos táctiles cómodos.
- No usar únicamente color, desenfoque o animación para comunicar que una tarjeta está abierta.
- El desenfoque es un tratamiento visual progresivo: el contenido de fondo no debe ser el único medio para entender el estado ni el único modo de localizar el contenido.
- Si el navegador no admite desenfoque, el modal seguirá distinguiéndose mediante una capa de atenuación y contraste suficiente.

## 8. Dirección visual y adaptación responsive

- Seguir la dirección visual ya documentada para el sitio: tonos pastel cálidos inspirados en tierra y naturaleza, con acentos de marca sobrios y contraste legible. Esta especificación no fija valores HEX nuevos.
- El encabezado de marca estará centrado en móvil, tablet y escritorio.
- **Móvil, tablet y escritorio:** dos columnas de tarjetas. La columna izquierda contiene Entradas, Pollo a la brasa y Cortes a la brasa; la columna derecha contiene Menús ligeros y bowls, Acompañamientos, Postres y Bebidas.
- El contenido de cada tarjeta se adapta al ancho de su columna. Evitar desbordamiento horizontal, especialmente en móvil; no basar la adaptación en detección del dispositivo.
- Usar anchos fluidos, separación y padding adecuados; evitar overflow horizontal y líneas de lectura excesivamente largas.
- El modal debe adaptarse al viewport móvil: márgenes seguros, ancho limitado al espacio disponible y desplazamiento interno cuando sea necesario.
- Respetar la preferencia de movimiento reducido y conservar usabilidad con zoom de texto.

## 9. Consideraciones técnicas

- La implementación posterior deberá seguir las convenciones documentadas del sitio: HTML semántico, CSS en la hoja existente y JavaScript sencillo, sin introducir frameworks, paquetes o herramientas de build.
- Archivos previstos para una futura implementación:
  - `uis/website/menu/index.html`: sustituir la imagen actual por el contenido estructurado de las siete categorías y los controles del modal.
  - `styles.css` (raíz): añadir o ajustar estilos del menú con selectores acotados a `.menu-page` para no alterar landing ni formulario.
  - Un archivo JavaScript local bajo `uis/website/menu/` solo si se decide separar la interacción; usar una ruta relativa correcta y no añadir dependencias.
- Mantener el enlace de navegación actual de la landing a `uis/website/menu/index.html` y el enlace de retorno a `../../../index.html`, salvo que se apruebe otro cambio de rutas.
- No depender de imágenes externas. `menu.png` deja de ser el contenido principal una vez implementada la página, pero su eliminación o conservación como recurso es una decisión de implementación aparte; esta especificación no solicita borrar archivos.

## 10. Criterios de aceptación

1. La página presenta la marca y su lema en un encabezado centrado.
2. La carta se muestra completamente en castellano y refleja fielmente las siete categorías y los productos de `menu.md`.
3. No se añaden precios ni datos, ingredientes o afirmaciones ajenas a la fuente.
4. En móvil hay dos columnas de tarjetas con la distribución especificada; el contenido se ajusta al interior de cada tarjeta sin provocar desbordamiento horizontal y se puede leer sin abrirlas.
5. En tablet y escritorio hay dos columnas con la distribución y el orden por columna especificados.
6. Cada categoría se puede ampliar y queda centrada sobre un fondo atenuado y desenfocado, manteniendo legible y accesible el contenido ampliado.
7. Se puede abrir y cerrar con teclado y táctil; Escape y el control de cierre funcionan, y al cerrar se recupera el foco de la tarjeta activada.
8. El fondo no puede desplazarse ni recibir interacción mientras el modal está activo; el contenido largo del modal se puede recorrer sin perder el control de cierre.
9. La experiencia no depende exclusivamente de animación o desenfoque y respeta movimiento reducido.
10. La página no presenta desbordamiento horizontal en móvil, tablet ni escritorio, y el modal permanece dentro del viewport.
11. La landing sigue enlazando al menú y la página del menú permite volver a la landing.
12. No se añaden dependencias y las reglas CSS quedan limitadas a la página del menú.

## 11. Verificación prevista para la implementación

Cuando se autorice implementar, verificar:

- Correspondencia entre las siete categorías, sus productos y descripciones y el contenido de `menu.md`.
- Disposición de dos columnas de tarjetas en móvil, tablet y escritorio, incluida la distribución exacta por columna y la comprobación de que el contenido se ajusta sin desbordamiento horizontal.
- Apertura y cierre de cada una de las siete tarjetas, clic fuera si se implementa, Escape y devolución de foco.
- Operación de todos los controles con teclado, orden de foco, foco visible, semántica del diálogo y comportamiento de tecnologías de asistencia disponibles.
- Tarjeta ampliada con contenido corto y largo, desplazamiento interno y control de cierre accesible en viewports pequeños.
- Movimiento reducido, ausencia de desbordamiento horizontal y visualización a tamaños móviles, tablet y escritorio.
- Conservación del enlace desde la landing y del enlace de regreso; ausencia de efectos colaterales en landing y formulario.
- Inspección estática del HTML/CSS/JavaScript y diagnósticos del editor disponibles.

Estas verificaciones son criterios futuros. La creación de este documento no constituye evidencia de implementación ni de pruebas visuales o interactivas.
