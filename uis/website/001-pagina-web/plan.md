# Plan de implementación — 001 Página web de Brasaland

**Estado:** landing implementada; este plan registra el seguimiento pendiente.  
**Fecha:** 2026-10-21  
**Base:** [`spec.md`](./spec.md) y [`../BRIEFING.md`](../BRIEFING.md)

> El alcance original de este documento fue la landing de Brasaland. Esa implementación ya se realizó en los archivos de la raíz del repositorio por indicación posterior del usuario. Las fases siguientes son trabajo pendiente de diseño, decisiones y verificación; este documento no autoriza por sí solo cambios de implementación.

## Objetivo original

Construir la landing pública en español con `index.html` para la estructura/contenido y `styles.css` para los estilos. La implementación activa se encuentra ahora en la raíz del repositorio (`/index.html` y `/styles.css`); las copias existentes bajo `uis/website/` no se consideran activas sin confirmación. La documentación de planificación se guarda en `uis/website/001-pagina-web/`.

## Fases

### 1. Preparación de los archivos existentes

- La landing activa se completó en `/index.html` y `/styles.css` (raíz del repositorio), con HTML en español y estilos propios.
- Se conserva el enlace CDN de Tailwind CSS v4; no se añadieron paquetes, frameworks ni herramientas de build.
- Mantener `application.html` y `validation.js` fuera de esta tarea, pues corresponden a las fases 002/003 y no son los archivos acordados para la landing.

### 2. Estructura semántica y navegación

- Crear header, navegación y enlaces internos a secciones de la landing.
- Incluir el enlace “Menú” con destino al menú de los restaurantes de Brasaland. Hasta recibir la URL o ubicación concreta, no inventar un destino funcional.
- Crear `main` y las secciones con jerarquía semántica y encabezados ordenados.
- Crear el footer con el copyright y los enlaces de redes sociales que especifica el briefing.

### 3. Contenido de la landing

Incorporar el contenido de `BRIEFING.md`, respetando el orden definido en `spec.md`:

1. Hero con titular, subtítulo y CTA “Únete a Brasa Points”.
2. Historia de Brasaland, dejando el espacio previsto para la imagen que se añadirá más adelante.
3. Diferenciadores: calidad consistente, experiencia cálida y rapidez.
4. Ubicaciones de Colombia y Florida, con ciudades y horarios del briefing.
5. Presentación de Brasa Points y sus beneficios.
6. Aviso visible de que todavía no hay pedidos en línea.
7. Contacto y footer.

La conexión funcional del CTA de Brasa Points con el formulario se realizará durante la tarea 002; esta fase no implementa el formulario.

### 4. Presentación responsive y accesibilidad

- Aplicar un enfoque mobile-first y adaptar el layout a `sm`, `md` y `lg`.
- Construir jerarquía visual y componentes repetidos con utilidades Tailwind y reglas CSS compartidas cuando corresponda.
- Asegurar navegación por teclado, foco visible, contraste legible y estructura semántica.
- Cuando se incorpore la imagen más adelante, añadir texto `alt` descriptivo si es informativa o marcarla como decorativa si corresponde.

### 5. SEO y Schema.org

- Añadir título, descripción y metadatos adecuados al contenido y al idioma español.
- Incorporar el JSON-LD `Restaurant` con los datos del briefing, sin completar campos por conjetura.
- Mantener `availableLanguage` únicamente en español si la página se ofrece en un solo idioma.

### 6. Verificación

Al terminar la implementación, validar:

- Correspondencia del contenido y el orden de secciones con el briefing.
- Ausencia de formulario, validaciones, pedidos en línea o reservas en el alcance de esta tarea.
- Renderizado mobile-first en móvil y los breakpoints `sm`, `md` y `lg`.
- Semántica, navegación de teclado, foco visible, contraste y manejo accesible de la imagen una vez añadida.
- Metadatos SEO y consistencia sintáctica y factual del JSON-LD.
- Que los enlaces tengan destinos válidos y aprobados; no inventar la URL del menú.

## Decisiones registradas

- La documentación de tarea (spec, plan y futuros checklists) se guarda en `uis/website/001-pagina-web/`; la landing se implementa en `uis/website/index.html` y `uis/website/styles.css`.
- Las imágenes se añadirán más adelante.
- “Menú” hace referencia al menú de los restaurantes de Brasaland; falta concretar su URL o ubicación para enlazarlo.
- La conexión del CTA a Brasa Points con el formulario se realizará en la fase 002.
- Se conserva el copyright del briefing y se mantienen sus datos de redes sociales.
- Tailwind CSS v4 se carga usando el enlace CDN ya proporcionado en `uis/website/index.html`.

## Fuera de alcance

- Crear el formulario de registro, definir su destino final o conectarlo al CTA: tarea 002.
- Crear JavaScript para validaciones o interacciones: tarea 003.
- Backend, persistencia, email, sistema de reservas, pedidos en línea o integraciones.
- Incorporar imágenes antes de que el usuario las proporcione o apruebe.
- Inventar la URL del menú, datos corporativos o contenido no incluido en las fuentes aprobadas.

## Seguimiento pendiente tras la implementación

Los puntos de esta sección amplían el plan a partir de la revisión posterior de la landing. No reabren las tareas completadas ni afirman que los cambios ya se hayan realizado. Los cambios en código se abordarán únicamente después de completar sus decisiones o dependencias y contar con la aprobación necesaria.

### 7. Diseñar el formulario y resolver decisiones de datos

- Preparar el diseño y la especificación del formulario Brasa Points en la tarea 002, usando los campos, opciones y validaciones del briefing como base, no como sustituto de decisiones pendientes.
- Antes de recopilar datos reales, acordar el texto y destino de los términos, el aviso de privacidad, la finalidad y el tratamiento de los datos. No enlazar una aceptación legal inexistente ni afirmar que los datos se almacenan o envían.
- Definir si «Sin restricciones» excluye otras preferencias y si la opción «Otro» requiere un campo de texto.
- Decidir si el formulario será una simulación local o tendrá un mecanismo real de envío. Si no existe envío real, revisar el mensaje de éxito del briefing para que no prometa un email de confirmación ni persistencia no implementados.
- Determinar el destino/ruta del formulario y después conectar el CTA de Brasa Points de la landing. La conexión depende de que la página del formulario exista y tenga un destino acordado.
- Mantener el formulario, sus validaciones y su comportamiento en las tareas 002 y 003, respectivamente; no añadirlos a la landing como parte del seguimiento de la tarea 001.

### 8. Resolver contenido y ubicación pendientes de la landing

- Solicitar o recibir del usuario la URL o ubicación aprobada del menú. Hasta entonces, conservar “Menú” sin destino inventado; una vez recibida, actualizar y comprobar el enlace.
- Solicitar o recibir una imagen aprobada para “Nuestra Historia”. Solo al incorporarla decidir si es informativa o decorativa y proporcionar el `alt` correspondiente; no crear ni buscar un activo sustituto sin autorización.
- Confirmar si el requisito de contacto dentro del `<footer>` debe interpretarse literalmente. Si se confirma, planificar su ubicación allí manteniendo accesibles y correctos los datos de contacto; no asumir que basta con una sección Contacto separada.

### 9. Alinear y verificar el uso de Tailwind

- Revisar el markup activo en la raíz: actualmente carga Tailwind CSS v4 por CDN, pero debe verificarse si utiliza efectivamente clases utilitarias o depende solo de clases CSS propias.
- Aplicar la regla ya acordada para el sitio: usar clases utilitarias de Tailwind como estrategia principal y reservar CSS propio para complementos o patrones reutilizables cuando corresponda.
- Si hace falta corregir el markup o los estilos para alinearlos con esa regla, hacerlo en una etapa de implementación autorizada.
- No añadir dependencias ni herramientas de compilación. Confirmar cualquier método alternativo de integración antes de adoptarlo.

### 10. Confirmar ejecución y publicación en Codespaces

- Identificar y probar un comando de servidor local basado en `npx` que funcione con los archivos estáticos, sin dar por verificado un paquete o comando concreto de antemano. No instalar dependencias ni elegir un paquete que requiera cambios sin autorización.
- Con el servidor en ejecución, configurar/confirmar el reenvío de puertos de Codespaces como **Public** solo si se requiere acceso público y el usuario lo autoriza; registrar la URL efectiva únicamente después de comprobarla.
- Verificar la página publicada/accesible en el entorno previsto y diferenciar esta comprobación de la confirmación responsive ya comunicada por el usuario.

### 11. Completar la verificación pendiente

- Validar en navegador los enlaces internos y externos, la interacción del CTA cuando tenga destino y la navegación mediante teclado; documentar limitaciones si alguna comprobación no puede ejecutarse.
- Verificar el JSON-LD `Restaurant` con un método autorizado y revisar que no contenga datos inferidos. No añadir servicios o dependencias de validación sin aprobación.
- Confirmar visualmente el footer/contacto, el uso acordado de Tailwind, la imagen y su alternativa accesible cuando esos elementos estén disponibles.
- Registrar por separado los resultados comprobados y los bloqueos; no presentar como verificación independiente la confirmación responsive aportada por el usuario.

## Dependencias y bloqueos

| Pendiente                                    | Depende de                                                                                   | Tratamiento mientras esté bloqueado                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Destino de “Menú”                            | URL o ubicación aprobada por el usuario                                                      | No inventar URL; mantener la navegación sin destino.                                                |
| Imagen de Historia y `alt`                   | Recurso aprobado y decisión informativa/decorativa                                           | Mantener el estado actual; no crear ni buscar imágenes.                                             |
| Formulario y CTA Brasa Points                | Decisiones de privacidad/términos, tipo de envío y destino/ruta; especificación de tarea 002 | No recopilar datos ni prometer almacenamiento/envío; CTA no se conecta antes de contar con destino. |
| Preferencias del formulario                  | Decisiones sobre “Sin restricciones” y “Otro”                                                | No inferir exclusividad ni añadir campo de texto.                                                   |
| Contacto en el footer                        | Confirmación de interpretación del requisito                                                 | Mantenerlo como pendiente de decisión; no darlo por satisfecho por proximidad visual.               |
| Utilidades Tailwind                          | Confirmación del nivel de alineación deseado y revisión del markup                           | No cambiar integración ni añadir dependencias.                                                      |
| Servidor `npx`                               | Selección/verificación de comando sin instalar paquetes no aprobados                         | No declarar un comando probado hasta ejecutarlo.                                                    |
| Acceso público Codespaces                    | Necesidad de publicación, servidor activo y autorización para visibilidad pública            | No publicar ni inventar una URL.                                                                    |
| Validaciones de navegador, teclado y JSON-LD | Entorno y método autorizados disponibles                                                     | Marcar como pendientes hasta comprobarlas y registrar el método.                                    |
