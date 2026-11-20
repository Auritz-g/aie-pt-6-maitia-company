# Especificación — 001 Página web de Brasaland

**Estado:** especificación de trabajo; pendiente de implementación y validación visual.  
**Fecha:** 2026-10-21  
**Fuente funcional:** [`../BRIEFING.md`](../BRIEFING.md)  
**Reglas generales del sitio:** [`../contexto-website.md`](../contexto-website.md)

Los documentos de planificación propios de la tarea 001 (por ejemplo, esta especificación, el plan y futuros checklists) se mantendrán en `uis/website/001-pagina-web/`. La implementación de la landing utilizará los archivos existentes `uis/website/index.html` y `uis/website/styles.css`; no se crearán copias de esos archivos dentro de la carpeta 001 ni se moverán.

## 1. Objetivo y alcance de esta tarea

Crear la página pública de Brasaland: su estructura HTML, contenido y estilo responsive. Esta etapa corresponde exclusivamente a la landing de la compañía. El contenido de presentación de Brasa Points puede describirse y enlazar a la página de registro, pero **la construcción del formulario y su comportamiento quedan fuera de esta tarea**.

El proyecto se ha organizado en tres grandes tareas:

1. **001 — Página web:** landing, código y estilos de presentación. Es el alcance de esta especificación.
2. **002 — Formulario Brasa Points:** página y campos de registro, en `002-formulario-brasa-points/`.
3. **003 — Lógica y validación JavaScript:** validaciones y comportamiento interactivo, en `003-validacion-javascript/`.

La división fija la organización de trabajo solicitada; no convierte por sí misma el sitio en un producto de producción aprobado.

## 2. Estado observado

- `uis/website/index.html` contiene actualmente solo un elemento `<head>` con un script que carga Tailwind CSS v4 desde `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`. No contiene todavía la landing.
- `uis/website/styles.css` contiene estilos básicos de layout y cabecera; la hoja enlaza con clases que no aparecen en el `index.html` actual.
- `uis/website/application.html` y `uis/website/validation.js` existen, pero están vacíos. Su eventual uso o traslado no se presume en esta especificación.
- `uis/website/BRIEFING.md` describe el contenido de la landing y el Schema.org requerido.
- `uis/website/contexto-website.md` recoge las convenciones acordadas para el sitio: HTML semántico, sin frameworks, estilos en `styles.css`, enfoque mobile-first y Tailwind CSS v4 como estrategia principal.
- No se encontró una configuración local de compilación de Tailwind ni comandos de ejecución o pruebas propios del sitio. Para esta tarea se utilizará el enlace CDN ya incluido en `uis/website/index.html`, según la decisión del usuario.

## 3. Requisitos de la página

La landing se implementará como una página HTML accesible y responsive, con el idioma base español salvo que el usuario apruebe expresamente otra decisión. Debe reflejar la información del briefing sin inventar contenidos, enlaces, imágenes, locales o datos de contacto.

### Estructura y contenido

En el orden establecido por `BRIEFING.md`, incluir:

1. **Header:** marca Brasaland y navegación a Inicio, Ubicaciones, Menú, Brasa Points y Contacto. No mostrar selector de idioma salvo que se apruebe e implemente un segundo idioma.
2. **Hero:** titular, subtítulo y botón “Únete a Brasa Points”. La conexión funcional del botón con el formulario se realizará en la tarea 002.
3. **Nuestra Historia:** texto del briefing y una imagen que se añadirá en una etapa posterior.
4. **Lo que nos hace únicos:** tres bloques para Calidad Consistente, Experiencia Cálida y Rapidez, con sus descripciones del briefing.
5. **Nuestras Ubicaciones:** información de Colombia y Florida, número de restaurantes, ciudades y horarios exactamente como figuran en el briefing.
6. **Brasa Points:** beneficios y acumulación de puntos según el briefing; su llamada a la acción enlaza al registro.
7. **Contacto:** correo y teléfonos indicados en el briefing.
8. **Footer:** conservar el copyright tal como aparece en el briefing y mantener los datos/enlaces de redes sociales indicados allí.

Incluir también el aviso visible del briefing: “¿Quieres hacer un pedido? Llama a tu ubicación favorita o visítanos directamente. ¡Pronto tendremos pedidos en línea!”. El sitio no debe presentarse como sistema de pedidos ni de reservas.

### Enlaces y datos estructurados

- La opción “Menú” debe dirigir al menú de los restaurantes de Brasaland. Antes de implementar el enlace funcional, disponer de la URL o ubicación concreta del menú; no inventarla.
- Incorporar en la landing el marcado JSON-LD Schema.org de tipo `Restaurant` descrito en el briefing. Usar sus datos sin inferencias y configurar `availableLanguage` solo con el idioma base si el sitio ofrece un único idioma.

## 4. Reglas de presentación y tecnología

- Usar HTML semántico y estilos mobile-first, contemplando los breakpoints `sm`, `md` y `lg`.
- Integrar Tailwind CSS v4 mediante el enlace CDN ya incluido en `uis/website/index.html`; mantener los estilos complementarios y componentes reutilizables en `styles.css` cuando Tailwind no sea suficiente o haya patrones repetidos.
- No introducir frameworks ni dependencias.
- Dar prioridad a accesibilidad, legibilidad, foco visible, navegación por teclado, contraste y adaptación a móvil.
- Las imágenes informativas necesitan `alt` descriptivo; las decorativas deben quedar correctamente ocultas a tecnologías de asistencia.
- Aplicar metadatos SEO pertinentes y consistentes con la página y el idioma.

## 5. Fuera de alcance

- Crear el formulario Brasa Points, sus campos o sus mensajes de éxito/error: corresponde a `002-formulario-brasa-points/`.
- Implementar validaciones o lógica JavaScript: corresponde a `003-validacion-javascript/`.
- Backend, persistencia, integración con POS, envío de correo, reservas o pedidos en línea.
- Traducir la web al inglés sin aprobación explícita.
- Crear o inventar una imagen de marca, políticas, términos legales, datos de locales o contenido de menú no proporcionado.

## 6. Decisiones pendientes antes de implementar los elementos afectados

1. Obtener la URL o ubicación concreta del menú de los restaurantes para configurar el enlace de navegación sin inventar un destino.
2. Añadir la imagen de “Nuestra Historia” más adelante, cuando esté disponible; no sustituirla por un activo inventado.
3. Confirmar si se desea una segunda versión en inglés. El punto de partida documentado es una sola versión en español.

La especificación, el plan y otros documentos de trabajo de la tarea se guardarán en `uis/website/001-pagina-web/`; el código de la landing se implementará en los archivos existentes `uis/website/index.html` y `uis/website/styles.css`, sin crear copias ni moverlos. El uso de Tailwind CSS v4 mediante el enlace CDN ya presente en `index.html`, la conservación del copyright del briefing y el mantenimiento de sus datos de redes sociales son decisiones indicadas por el usuario. La conexión del CTA de Brasa Points se realizará en la tarea 002. Las decisiones pendientes no bloquean la preparación de la estructura y estilos; el enlace de Menú debe permanecer sin un destino inventado hasta contar con la URL concreta.

## 7. Verificación prevista

Una vez implementada la tarea, comprobar:

- La página respeta el contenido y orden del briefing y no incluye alcance de formulario o validación asignado a otras tareas.
- Renderizado responsive en móvil y tamaños `sm`, `md` y `lg`.
- HTML semántico, navegación por teclado, foco visible, alternativas de imagen y contraste legible.
- Metadatos SEO y validez/consistencia del JSON-LD Restaurant.
- Los enlaces solo dirigen a destinos definidos y aprobados.

No se han ejecutado estas verificaciones: este archivo especifica el trabajo, no implementa la landing.
