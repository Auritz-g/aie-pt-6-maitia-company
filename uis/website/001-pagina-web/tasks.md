# Tareas de implementación — 001 Página web de Brasaland

**Estado:** tareas 1–4 completadas con limitaciones documentadas; la revisión estática de la tarea 5 está registrada. Quedan verificaciones posteriores y las tareas de seguimiento 6–11, todavía pendientes. La implementación activa se encuentra en los archivos de la raíz del repositorio, según el cambio de ubicación realizado por el usuario.  
**Base:** [`spec.md`](./spec.md) · [`plan.md`](./plan.md) · [`../BRIEFING.md`](../BRIEFING.md)

> Completar y verificar cada tarea antes de marcarla como terminada o comenzar la siguiente. Si una tarea depende de una decisión pendiente o de un recurso no disponible, dejarla sin marcar y documentar el bloqueo; no inventar una solución para avanzar.

## 1. Preparar la página HTML

- [x] Completar `index.html` (raíz del repositorio) como documento HTML válido y semántico en español (`lang="es"`).
- [x] Conservar el enlace CDN de Tailwind CSS v4 ya presente en el archivo.
- [x] Enlazar correctamente `styles.css` (raíz del repositorio) y añadir los metadatos SEO básicos aprobados.
- [x] Revisar la estructura base antes de añadir todas las secciones.

**Criterio de cierre:** el HTML tiene una estructura de documento completa, utiliza los archivos acordados y no crea copias dentro de `001-pagina-web/`.

## 2. Construir navegación y contenido de la landing

- [x] Añadir header y navegación por secciones: Inicio, Ubicaciones, Menú, Brasa Points y Contacto.
- [x] Incorporar el Hero con titular, subtítulo y CTA de Brasa Points del briefing.
- [x] Incorporar Nuestra Historia, dejando prevista la imagen para añadirla más adelante; no usar una imagen inventada.
- [x] Incorporar los tres diferenciadores, las ubicaciones, la presentación de Brasa Points y el aviso visible sobre pedidos en línea.
- [x] Incorporar los datos de contacto y el footer, conservando el copyright y los datos de redes sociales del briefing.
- [x] Dejar el enlace “Menú” sin destino inventado hasta disponer de la URL o ubicación concreta.
- [x] Dejar la conexión funcional del CTA de Brasa Points para la fase 002; no crear el formulario aquí.

**Criterio de cierre:** las secciones aparecen en el orden del briefing, el contenido se mantiene fiel a sus fuentes y los elementos pendientes no se resuelven con datos inventados.

## 3. Aplicar estilos responsive

- [x] Desarrollar `styles.css` (raíz del repositorio) como complemento a Tailwind CSS v4 y para los patrones visuales reutilizables que correspondan.
- [x] Aplicar el enfoque mobile-first y adaptar layout y navegación a los breakpoints `sm`, `md` y `lg`.
- [x] Comprobar legibilidad, jerarquía visual, espaciado y ausencia de desbordamiento horizontal en los tamaños revisados, según confirmación del usuario.

**Criterio de cierre:** la landing tiene estilos coherentes y utilizables en móvil y escritorio, sin introducir frameworks ni dependencias.

## 4. Revisar accesibilidad, SEO y datos estructurados

- [x] Revisar la semántica y jerarquía de encabezados.
- [x] Comprobar por inspección estática la navegación nativa por enlaces, el foco visible definido en CSS, el contraste de las combinaciones de texto/fondo y la accesibilidad de los enlaces con destino.
- [x] Verificar que los metadatos SEO reflejen la página y el idioma base.
- [x] Incorporar y revisar manualmente el JSON-LD `Restaurant` según el briefing, sin completar valores por conjetura y declarando solo español en `availableLanguage`.
- [ ] Cuando se añada la imagen, comprobar su texto `alt` o su tratamiento como imagen decorativa, según corresponda.

**Limitación registrada:** la imagen de historia no se ha proporcionado; su `alt` se revisará cuando se incorpore. El JSON-LD se revisó leyendo su contenido, pero no se ejecutó el validador automatizado ofrecido.

**Criterio de cierre:** las comprobaciones de accesibilidad y contenido estructurado se han realizado; cualquier punto bloqueado por recursos pendientes queda indicado y sin marcar.

## 5. Verificar la entrega de la tarea 001

- [x] Contrastar la landing con `spec.md` y `BRIEFING.md` mediante revisión del contenido.
- [x] Confirmar por inspección estática que no se implementaron formulario, validaciones JavaScript, reservas ni pedidos en línea.
- [x] Revisar la visualización en móvil y en los tamaños `sm`, `md` y `lg`, según confirmación del usuario.
- [x] Comprobar los destinos de enlaces implementados; “Menú” permanece como texto deshabilitado sin URL, no como enlace resuelto.
- [x] Registrar las verificaciones realizadas y actualizar `memory-bank/progress.md` al cerrar el avance.

**Criterio de cierre:** cada requisito verificable tiene resultado comprobado, las limitaciones pendientes están explícitas y solo entonces se marca esta tarea como terminada.

## Seguimiento posterior a la landing

Las tareas siguientes se derivan de la sección “Seguimiento pendiente tras la implementación” y de la tabla “Dependencias y bloqueos” de `plan.md`. Son trabajo pendiente: las casillas vacías no autorizan por sí solas cambios de implementación ni decisiones de producto. Si un punto depende de una respuesta o recurso no disponible, dejarlo bloqueado y documentarlo; no inventar una solución.

## 6. Diseñar el formulario y resolver dependencias de Brasa Points

- [ ] Definir en la documentación de la tarea 002 el diseño/estructura del formulario a partir de los campos y reglas del briefing.
- [ ] Obtener aprobación del texto y destino de términos y del aviso de privacidad antes de recopilar datos reales.
- [ ] Acordar finalidad y tratamiento de los datos; no asumir almacenamiento, envío ni integración con servicios.
- [ ] Resolver si “Sin restricciones” es excluyente y si “Otro” requiere un campo de texto.
- [ ] Acordar si el éxito será una simulación o un envío real y ajustar cualquier promesa de email/registro según esa decisión.
- [ ] Definir la ruta/destino del formulario; solo después, conectar el CTA de Brasa Points de la landing con ese destino aprobado.
- [ ] Mantener la construcción del formulario en la tarea 002 y sus validaciones en la tarea 003; no incorporarlas como parte de la tarea 001.

**Criterio de cierre:** las decisiones y requisitos pendientes están aprobados y documentados en la tarea correspondiente; el formulario y el CTA no afirman envío, almacenamiento o confirmación que no existan. La conexión del CTA solo se cierra cuando haya un formulario y destino funcionales autorizados.

**Bloqueo:** términos, privacidad y tratamiento requieren decisión/aprobación; las reglas de preferencias y el modo de envío también esperan definición.

## 7. Resolver destino del menú e imagen de Historia

- [ ] Obtener del usuario una URL o ubicación aprobada del menú; hasta entonces no asignar un destino inventado.
- [ ] Cuando se reciba la URL, acordar el cambio y verificar el enlace de “Menú”.
- [ ] Esperar a que el usuario proporcione o apruebe una imagen para “Nuestra Historia”; no crear ni buscar un sustituto.
- [ ] Al incorporar una imagen aprobada, decidir si es informativa o decorativa y verificar su texto `alt` o su ocultación accesible, según corresponda.

**Criterio de cierre:** los destinos y recursos usados están aprobados; el enlace funciona y la imagen tiene tratamiento accesible adecuado. Mientras falte la URL o imagen, los puntos correspondientes permanecen sin marcar.

## 8. Confirmar requisitos de footer y estrategia Tailwind

- [ ] Confirmar si el requisito de contacto dentro del `<footer>` es literal y debe cambiar la ubicación actual del contacto.
- [ ] Revisar el markup activo de la raíz y determinar si utiliza clases utilitarias Tailwind v4 o si depende únicamente de CSS propio.
- [ ] Alinear la implementación activa con la regla ya acordada de usar clases utilitarias Tailwind como estrategia principal; mantener CSS propio para complementos/patrones apropiados. No cambiar la integración ni añadir dependencias/herramientas de build sin autorización.
- [ ] Si se aprueba un cambio de ubicación o estilos, implementarlo en una etapa autorizada y revisar su consistencia visual y accesible.

**Criterio de cierre:** la interpretación del footer y el nivel de uso de Tailwind están documentados; cualquier cambio aprobado se verifica en los archivos activos. No marcar “resuelto” únicamente porque contacto y footer aparezcan próximos en el documento.

## 9. Verificar un comando de servidor local con `npx`

- [ ] Identificar una opción de ejecución local apropiada para los archivos estáticos, sin instalar paquetes ni introducir herramientas nuevas sin aprobación.
- [ ] Probar el comando aprobado y registrar el comando exacto y su resultado; no afirmar que `npx` funciona antes de ejecutarlo.
- [ ] Confirmar que la página activa en la raíz se sirve correctamente y que los recursos vinculados cargan.

**Criterio de cierre:** existe evidencia de una ejecución local satisfactoria y queda documentado el comando usado, o se explica el bloqueo sin introducir dependencias no aprobadas.

## 10. Verificar acceso en Codespaces (si se requiere publicación)

- [ ] Confirmar si se necesita acceso público a la página en Codespaces y obtener autorización antes de configurar visibilidad pública.
- [ ] Con un servidor aprobado en ejecución, configurar o comprobar el reenvío de puerto necesario.
- [ ] Si se autoriza el acceso público, seleccionar visibilidad `Public` y comprobar la URL efectiva; no inventar ni registrar una URL antes de verificarla.
- [ ] Probar desde el acceso previsto que la página y sus recursos se cargan.

**Criterio de cierre:** el acceso requerido se comprueba realmente y se registra el resultado; si no se requiere o no se autoriza publicación pública, documentarlo sin exponer el sitio.

## 11. Completar verificaciones de navegador, teclado y datos estructurados

- [ ] Probar en navegador los enlaces internos y externos activos y el CTA cuando tenga un destino acordado.
- [ ] Verificar navegación por teclado y foco visible en la página renderizada; registrar problemas o limitaciones.
- [ ] Validar el JSON-LD `Restaurant` con un método autorizado y revisar la exactitud de sus datos frente al briefing, sin añadir servicios/dependencias no aprobados.
- [ ] Revisar en navegador el footer/contacto, el uso de Tailwind y la imagen/alternativa accesible cuando las decisiones y recursos estén disponibles.
- [ ] Registrar qué se comprobó de forma independiente y qué sigue basado únicamente en la confirmación responsive del usuario.

**Criterio de cierre:** cada verificación tiene un resultado registrado, y todo aquello que dependa de una decisión, URL o recurso pendiente permanece identificado y sin marcar como terminado.
