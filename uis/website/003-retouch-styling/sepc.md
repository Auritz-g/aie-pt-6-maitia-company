# Especificación — 003 Retouch styling del formulario Brasa Points

**Estado:** especificación documental aprobada; implementación secuencial autorizada y aún no iniciada.
**Fecha:** 2026-10-22  
**Fuente funcional:** [`../BRIEFING.md`](../BRIEFING.md) y [`../002-formulario-brasa-points/spec.md`](../002-formulario-brasa-points/spec.md).  
**Reglas generales del sitio:** [`../contexto-website.md`](../contexto-website.md).

> Esta especificación registra el alcance y las decisiones aprobadas para la mejora de presentación y flujo. La autorización es secuencial: completar la inspección y auditoría de la tarea 2 antes de modificar código. No modifica la landing ni convierte el formulario simulado en un sistema de registro real.

## 1. Objetivo

Reorganizar visual y progresivamente el formulario de Brasa Points en cuatro secciones para que la persona pueda completarlo por etapas, revisar y editar sus respuestas antes de finalizar, y comprender claramente que se trata de una demostración.

El trabajo de esta tarea se limita al formulario y a sus estilos/interacciones necesarios. La landing no forma parte del alcance de retocado visual.

## 2. Estado actual observado

- La landing activa está en `/index.html`; sus CTA «Únete a Brasa Points» enlazan a `./application.html`.
- El formulario activo está en `/application.html`, comparte `/styles.css` y usa `/validation.js` para las validaciones e interacciones.
- El formulario actual presenta todos los campos juntos, sin fases ni indicador de progreso.
- La validación actual se realiza al intentar enviar el formulario, no al completar cada fase.
- Hay campos dependientes: país determina las ciudades y país más ciudad determinan las ubicaciones favoritas. Al cambiar la selección superior, se actualizan las opciones y se limpian selecciones que dejan de ser válidas.
- Ya existen etiquetas y ayudas asociadas, mensajes y resumen de errores, estados accesibles y un mensaje de éxito simulado.
- El enlace desde el formulario permite regresar a `./index.html`.
- La página informa que es una demostración: no se envían ni guardan los datos, no se crea una cuenta y no deben introducirse datos personales reales.
- La casilla obligatoria existente confirma que la persona entiende la demostración; no es aceptación legal de términos. La opción de ofertas por email es voluntaria y está desmarcada inicialmente.
- La landing y el formulario son páginas distintas. Mantener las rutas y la navegación existentes al implementar cambios futuros.

Estos puntos describen el estado registrado en la especificación de la tarea 002; no implican una nueva prueba independiente en navegador para esta tarea.

## 3. Estructura propuesta del flujo

El formulario se organizará en cuatro secciones. La siguiente sección debe aparecer conforme se completa la actual, preservando los valores ya introducidos.

### Sección 1 — Información personal

Campos existentes:

- Nombre completo.
- Email.
- Teléfono.
- Fecha de nacimiento.

Conservar las reglas de obligatoriedad y validación vigentes en la especificación del formulario. En particular, la persona debe ser estrictamente mayor de 18 años.

### Sección 2 — Ubicación y preferencias

Campos existentes:

- País.
- Ciudad, dependiente del país.
- Ubicación favorita, opcional y dependiente de país y ciudad.
- Preferencias alimentarias: «Sin restricciones», «Vegetariano», «Sin gluten» y «Otro».

Si se selecciona «Otro», mostrar un campo de texto adicional con la etiqueta «Cuéntanos más sobre tu preferencia» y la ayuda «Describe brevemente tu preferencia alimentaria». El control debe crecer verticalmente al escribir, desde una altura inicial similar a los campos actuales hasta un máximo de 8 rem; al alcanzar ese límite permite desplazamiento interno. La explicación es opcional: si «Otro» está seleccionado y el campo queda vacío, se puede continuar.

Conservar las opciones de países, ciudades y locales especificadas en `BRIEFING.md`, así como el carácter opcional de ubicación favorita y preferencias.

### Sección 3 — Cómo nos conociste

Campo existente obligatorio: «¿Cómo nos conociste?», con las opciones descritas en el briefing:

- Redes sociales.
- Recomendación.
- Pasando por el local.
- Búsqueda en internet.
- Otro.

### Sección 4 — Resumen y confirmaciones

Presentar un resumen legible de las respuestas anteriores y permitir editarlas antes de finalizar. Incluir en esta sección:

- La casilla obligatoria de confirmación de que la persona comprende que el formulario es una demostración; no presentarla como aceptación legal.
- La casilla opcional para recibir ofertas por email, desmarcada por defecto.

Al activar un dato editable del resumen, se vuelve a la sección correspondiente y se enfoca el control asociado cuando sea posible. El botón «Volver al resumen» permite regresar después de editar, conservando las respuestas.

## 5. Reglas y límites que deben preservarse

- Mantener el formulario como simulación local: no realizar solicitudes de red con los datos, no persistirlos y no afirmar que se creó una cuenta o que se enviará un email.
- Conservar el aviso previo que indica que es una demostración y que no se introduzcan datos personales reales.
- Mantener las validaciones, mensajes de error y reglas de campos dependientes definidos en `002-formulario-brasa-points/spec.md`, salvo cambios que el usuario apruebe expresamente.
- Mantener accesibilidad: HTML semántico, etiquetas explícitas, controles operables por teclado, foco visible, errores asociados a los campos y anuncios comprensibles de cambios de sección y resultado.
- Mantener el diseño mobile-first, la hoja `styles.css`, la integración existente de Tailwind CSS v4 y JavaScript sencillo; no introducir frameworks, dependencias ni mecanismo de compilación nuevo.
- Mantener la navegación entre `index.html` y `application.html`.
- No cambiar el contenido ni la apariencia de la landing como parte de esta tarea.

## 6. Fuera de alcance

- Modificar la landing, su contenido o sus estilos.
- Crear backend, cuentas reales, envío de formularios o emails, analítica o almacenamiento.
- Definir términos legales, aviso de privacidad o tratamiento de datos real.
- Cambiar las opciones del briefing, las reglas de edad o la obligatoriedad de campos sin aprobación.
- Iniciar cambios de código solo tras completar la inspección y auditoría previas definidas en `tasks.md` y `skills/proyect-audit.md`.

## 7. Decisiones aprobadas para esta implementación

El usuario confirmó las siguientes decisiones para el alcance de esta tarea:

1. Avance mediante «Continuar» y retroceso mediante «Volver atrás», abajo a la derecha y a la izquierda respectivamente.
2. Progreso mediante cuatro círculos numerados, con el paso activo más grande y saturado y los inactivos más pequeños y visualmente inactivos.
3. El placeholder dentro del campo desaparece al empezar a escribir; las etiquetas accesibles permanecen visibles.
4. Desde el resumen, activar un dato lleva a su sección y enfoca el control cuando sea posible; se vuelve con el botón «Volver al resumen».
5. El campo explicativo de «Otro» crece hasta un máximo de 8 rem y permite scroll interno al alcanzar el límite.
6. Etiqueta: «Cuéntanos más sobre tu preferencia». Ayuda: «Describe brevemente tu preferencia alimentaria».
7. La explicación de «Otro» es opcional; se puede continuar si queda vacía. Las preferencias en general también pueden quedar vacías.
8. Con errores al continuar, el foco va al primer campo inválido en el orden actual, los mensajes/ayudas permanecen asociados y el error se anuncia accesiblemente. Al avanzar correctamente, el foco va al encabezado del siguiente paso.
9. El alcance sigue limitado al formulario demostrativo; la landing, sus enlaces y su contenido quedan intactos.

## 8. Verificación prevista

Cuando comience la implementación, verificar como mínimo:

- Las cuatro secciones muestran los campos correctos y siguen el orden especificado.
- El paso entre secciones funciona conforme a la navegación aprobada y no pierde respuestas.
- Los datos pueden revisarse y editarse desde el resumen conforme al comportamiento aprobado.
- «Otro» muestra el campo adicional; el texto largo se mantiene visible mediante crecimiento vertical.
- Los campos dependientes actualizan opciones correctamente y eliminan selecciones que dejan de ser válidas.
- Se conservan la validación de edad, mensajes de error, confirmación demostrativa y opción de ofertas.
- El flujo completo puede recorrerse con teclado y tecnologías de asistencia, incluidos cambios de sección, errores y resumen.
- La presentación se adapta a móvil y tamaños mayores, sin desbordamiento horizontal.
- No hay envío ni persistencia de datos; la navegación hacia y desde la landing sigue funcionando.

No se han ejecutado pruebas ni se ha modificado código como parte de esta especificación.
