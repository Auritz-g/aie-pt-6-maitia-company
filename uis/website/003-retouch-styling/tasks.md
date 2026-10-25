https://assets.vogue.com/photos/6ad8b31417443e7ad31691c2/master/w_1600%2Cc_limit/00029-rick-owens-spring-2017-ready-to-wear-credit-indigital-model-helena-severin.jpg# Tareas — 003 Retocado visual y progresivo del formulario Brasa Points

**Estado:** tareas 1–3 completadas; tareas 4 y 6 con recorrido dinámico pendiente; tarea 5 revisada según confirmación del usuario; tarea 7 con aislamiento CSS estático implementado y revisión visual pendiente; tarea 8 con revisión estática parcial, sin recorrido dinámico ni pruebas responsive/accesibles independientes; tarea 9 revisada documentalmente de forma parcial y bloqueada por verificaciones pendientes de tareas anteriores.
**Fecha de estado:** 2026-10-22.
**Base:** [`sepc.md`](./sepc.md) · [`plan.md`](./plan.md) · [`../002-formulario-brasa-points/spec.md`](../002-formulario-brasa-points/spec.md) · [`../BRIEFING.md`](../BRIEFING.md) · [`../contexto-website.md`](../contexto-website.md)

> Completar las tareas en orden y marcar cada casilla solo tras comprobarla. Si surge una decisión pendiente, detenerse y registrar el bloqueo. La tarea 3 se encontraba implementada; se cerró documentalmente tras contrastar su estructura y contenido con los criterios acordados.

## 1. Resolver decisiones y confirmar el alcance — completada

- [x] Confirmar la altura máxima de 8 rem para «Otro» y el desplazamiento interno al alcanzar el límite.
- [x] Confirmar etiqueta «Cuéntanos más sobre tu preferencia» y ayuda «Describe brevemente tu preferencia alimentaria».
- [x] Confirmar que la explicación de «Otro» es opcional y que se puede continuar vacía; las preferencias también pueden quedar vacías.
- [x] Confirmar que, al continuar con errores, el foco va al primer campo inválido en el orden actual, se mantienen mensajes/ayudas asociados y se anuncia el error; al avanzar correctamente, el foco va al encabezado siguiente.
- [x] Confirmar avance mediante «Continuar» y retroceso mediante «Volver atrás», abajo a la derecha y a la izquierda respectivamente.
- [x] Confirmar cuatro círculos numerados, activo más grande y saturado, inactivos más pequeños y visualmente inactivos.
- [x] Confirmar edición desde el resumen y retorno mediante el botón «Volver al resumen».
- [x] Confirmar que el placeholder interno desaparece al escribir y las etiquetas accesibles siguen visibles.
- [x] Confirmar que el alcance se limita al formulario demostrativo y la landing, sus enlaces y contenido quedan intactos.
- [x] Registrar las decisiones confirmadas en `sepc.md` y alinearlas con `plan.md`.

**Criterio de cierre:** cerrado documentalmente tras registrar y revisar las decisiones aprobadas en `sepc.md` y `plan.md`. No se han realizado pruebas de implementación en esta tarea.

## 2. Inspeccionar el formulario existente y definir preservación

- [x] Revisar `/application.html`, `/validation.js` y las reglas pertinentes de `/styles.css` para identificar campos, nombres, etiquetas, ayudas, validaciones, dependencias, errores, foco, anuncios y éxito simulado que deben conservarse.
- [x] Contrastar el estado implementado con `../002-formulario-brasa-points/spec.md` y `../002-formulario-brasa-points/tasks.md`; distinguir el comportamiento observado de las verificaciones previamente informadas por el usuario.
- [x] Confirmar las reglas y datos de los campos dependientes país → ciudad → ubicación favorita y su limpieza al cambiar selecciones.
- [x] Preparar la correspondencia de campos con las cuatro secciones y el resumen, sin modificar aún el código.
- [x] Confirmar que solo se prevén cambios en los archivos existentes `/application.html`, `/validation.js` y `/styles.css`; detenerse y pedir autorización aparte si aparece una necesidad fuera de ese alcance.

**Inventario observado (sin pruebas dinámicas nuevas):**

| Sección prevista         | Controles actuales que se trasladarán                       | Validación/nota que debe preservarse                                                                                                                                                                                                                                 |
| ------------------------ | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Información personal     | `fullName`, `email`, `phone`, `birthDate`                   | Nombre de dos palabras; email HTML válido; teléfono `+57`/`+1` y 10 dígitos; edad estrictamente mayor de 18. La fecha hoy está al final del HTML, pero su regla está declarada.                                                                                      |
| Ubicación y preferencias | `country`, `city`, `favoriteLocation`, `dietaryPreferences` | País y ciudad requeridos; opciones dependientes CO: Medellín/Bogotá/Cali; US: Miami/Orlando; cambio de país limpia ciudad/local; cambio de ciudad limpia local. Local y preferencias opcionales.                                                                     |
| Cómo nos conociste       | `discoverySource`                                           | Requerido; cinco opciones existentes. Actualmente aparece antes de nacimiento en el HTML.                                                                                                                                                                            |
| Resumen y confirmaciones | `demoAcknowledgement`, `emailOffers`                        | Confirmación requerida; ofertas opcionales y desmarcadas. La confirmación hoy está antes de ofertas y requiere trasladarse; el mensaje de error actual menciona «términos del programa», potencialmente contradictorio con la etiqueta de confirmación demostrativa. |

Comunes: mantener etiquetas, ayudas, `name`/`id`, opciones, errores asociados (`aria-describedby`), `aria-invalid`, resumen `role="alert"`, anuncios de dependencias, éxito simulado enfocable y sin envío/persistencia. La especificación 002 registra pruebas de teclado, responsive y casos de usuario como informadas por este; no se repitieron aquí. **Criterio de cierre:** inventario documental completo, sin cambios en el código. Resolver el wording del error de confirmación en la auditoría antes de implementar.

## 3. Reorganizar el HTML en cuatro secciones

- [x] Agrupar nombre completo, email, teléfono y fecha de nacimiento en «Información personal».
- [x] Agrupar país, ciudad, ubicación favorita y preferencias alimentarias en «Ubicación y preferencias», conservando su carácter opcional donde corresponde.
- [x] Colocar «Cómo nos conociste» en su sección propia y mantenerlo obligatorio.
- [x] Preparar «Resumen y confirmaciones» con la confirmación obligatoria de demostración y la opción voluntaria de ofertas por email desmarcada inicialmente.
- [x] Mantener los valores, nombres de control, etiquetas, ayudas, atributos de validación y asociaciones accesibles existentes, salvo las modificaciones acordadas expresamente.
- [x] Conservar el aviso de demostración, la identidad y la navegación de regreso existentes; no modificar `/index.html`.

**Criterio de cierre:** estructura semántica contiene las cuatro secciones en orden, con los campos correctos y sin eliminar contenido o comportamiento existente. Verificación estática posterior: inspección de `/application.html` y diagnósticos disponibles del editor; no se realizó recorrido dinámico del formulario como parte de esta tarea.

## 4. Implementar navegación secuencial y validación por sección

- [x] Mostrar inicialmente solo la primera sección y mantener las demás fuera de la secuencia visible y del orden de tabulación hasta que correspondan. (Confirmado por inspección estática de los atributos `hidden` iniciales y `showStep`; recorrido dinámico pendiente.)
- [x] Añadir «Continuar» al lado derecho y «Volver atrás» al lado izquierdo, mostrando u ocultando cada botón según el paso actual y la decisión confirmada. (Confirmado por inspección estática de la estructura y `showStep`; recorrido dinámico pendiente.)
- [x] Al continuar, validar los campos obligatorios de la sección actual y bloquear el avance si hay errores, usando los mensajes y asociaciones accesibles existentes o los aprobados en la tarea 1. (Confirmado por inspección estática de `validateStep` y los manejadores; casos interactivos pendientes.)
- [x] Permitir avanzar con ubicación favorita y preferencias vacías; aplicar a «Otro» vacío únicamente la decisión aprobada. (Confirmado por inspección estática: las reglas de validación no hacen obligatorios estos controles.)
- [x] Conservar los valores al avanzar, volver atrás y corregir errores; no reiniciar controles dependientes salvo cuando cambien selecciones que invaliden sus opciones. (Confirmado por inspección estática del flujo; prueba de navegación pendiente.)
- [x] Mantener la validación de edad estrictamente superior a 18, junto con las reglas actuales de nombre, email, teléfono, país, ciudad, origen y confirmación demostrativa. (Corregido el ajuste de edad en el cumpleaños exacto; reglas confirmadas por inspección estática.)
- [x] Validar la confirmación de demostración antes del éxito simulado, sin tratarla como aceptación legal; conservar voluntaria y desmarcada por defecto la suscripción a ofertas. (Confirmado por inspección estática del control, su regla y el manejador de envío.)
- [x] Comunicar cada cambio de sección de manera accesible y llevar el foco al encabezado o control pertinente según la decisión confirmada. (Confirmado por inspección estática de las regiones vivas y el manejo de foco; prueba con tecnologías de asistencia pendiente.)

**Criterio de cierre:** se puede recorrer cada sección en orden, los errores impiden avanzar cuando procede, volver atrás conserva datos y no se alteran validaciones ni opciones existentes. Verificar todos los casos antes de continuar. **Pendiente:** recorrido dinámico de cada paso, errores, retroceso, conservación de respuestas y validación antes de avanzar; no se marca la tarea como cerrada hasta realizarlo.

## 5. Añadir progreso y campo condicional «Otro»

- [x] Mostrar cuatro círculos numerados, uno por sección, y marcar semánticamente el paso actual además de distinguirlo visualmente. (Inspección estática de `application.html` y `validation.js`: cuatro indicadores, `aria-current="step"` actualizado al mostrar cada paso.)
- [x] Aplicar al círculo activo el mayor tamaño y saturación acordados; dejar los demás visualmente inactivos, sin depender solo del color para comunicar el estado. (Inspección estática de las reglas `.progress-step`, `.is-current` y `.is-complete` en `styles.css`; el paso actual también se identifica semánticamente.)
- [x] Añadir el control de texto para explicar «Otro» únicamente cuando esa opción esté seleccionada y ocultarlo de forma accesible al dejar de estarlo. (Inspección estática de la actualización de `hidden` y `aria-expanded`; no se realizó prueba interactiva.)
- [x] Usar la etiqueta y ayuda aprobadas; conservar una etiqueta accesible visible aunque desaparezca el placeholder al empezar a escribir. (Etiqueta asociada y ayuda visibles en HTML; placeholder añadido. No se realizó una prueba de escritura en navegador.)
- [x] Aplicar la altura inicial acordada, el crecimiento vertical mientras se escribe y el límite/comportamiento al alcanzarlo según la decisión registrada. (Inspección estática: `rows="2"`, ajuste en `input` y límite CSS de 8 rem; se corrigió la conversión de ese límite a píxeles en `validation.js`. No se probó el crecimiento en navegador.)
- [x] Revisar el comportamiento con el campo vacío, texto de una línea, texto multilínea, texto largo y cambios de selección, sin descartar inadvertidamente datos que deban conservarse. (El usuario confirmó que completó la revisión de la tarea 5; no se ejecutó una prueba independiente en esta sesión.)

**Criterio de cierre:** la inspección estática respalda los indicadores, el campo condicional y la lógica de crecimiento, pero no demuestra su funcionamiento interactivo ni su operabilidad con teclado/tecnologías de asistencia. Tarea abierta hasta probar campo vacío, texto corto, multilínea y largo, cambios de selección y los límites de altura en navegador.

## 6. Crear el resumen editable y el retorno a edición (implementación; recorrido dinámico pendiente)

- [x] Mostrar un resumen legible de las respuestas de las secciones anteriores, incluidos los valores opcionales solo cuando corresponda y sin inventar datos. (Inspección estática de `summaryItems`/`renderSummary`; el detalle de «Otro» se condiciona a que esté seleccionado.)
- [x] Hacer accionable cada dato editable y asociarlo con la sección correspondiente, con nombres accesibles que indiquen qué se puede editar. (Inspección estática de los botones de edición, `data-edit-step` y `aria-label`.)
- [x] Al activar un dato, regresar a la sección correcta y enfocar el control correspondiente cuando sea posible. (Inspección estática del manejador delegado de edición y del enfoque al control.)
- [x] Permitir volver al resumen tras editar, conservar las otras respuestas y actualizar el contenido del resumen con el valor más reciente. (Inspección estática de `returnToSummaryButton`, `showStep(3)` y los listeners de `input`/`change`.)
- [x] Representar la confirmación de demostración y la preferencia de ofertas de manera clara, distinguiendo lo obligatorio de lo voluntario. (Se añadieron al resumen dos filas de estado, con obligatoriedad/opcionalidad y valor actual; sin acción de edición.)
- [x] Confirmar que la presentación del resumen no expone información más allá de los valores que la persona ya introdujo y mantiene el aviso de demostración. (Inspección estática: el resumen usa valores de los controles y el aviso existente permanece; los valores se insertan con `textContent`.)

**Criterio de cierre:** la implementación y su sincronización se revisaron estáticamente, pero las rutas de edición, el retorno y las confirmaciones aún deben probarse interactivamente. No cerrar la tarea hasta ejecutar esas pruebas o registrar que el usuario las realizó.

## 7. Aplicar estilos del formulario sin alterar la landing

- [x] Estilizar en `/styles.css` las secciones, navegación, progreso, controles, errores, foco y resumen, limitando las reglas a la página o componentes del formulario. (Inspección estática de las reglas existentes y del aislamiento añadido; no se hizo una inspección visual en navegador.)
- [x] Seguir el enfoque mobile-first y la dirección de tonos pastel de tierra y naturaleza documentada en `contexto-website.md`, sin fijar colores exactos no acordados. (Reglas base y breakpoints existentes revisados; se reutilizan los tokens actuales y no se definieron colores nuevos.)
- [x] Diferenciar paso activo/inactivo, errores y estados con señales que no dependan exclusivamente del color. (Inspección estática de clases de progreso, numeración/texto accesible y mensajes de error; no se ejecutó prueba visual o de contraste.)
- [ ] Mantener foco visible, legibilidad, contraste, targets y orden visual/teclado coherentes.
- [x] Revisar selectores compartidos para evitar efectos colaterales en `/index.html`; ajustar el alcance de selectores únicamente dentro de los archivos autorizados. (Inspección estática: reglas de `section` restringidas a `body:not(.application-page)`, reglas de envío y navegación acotadas al formulario, estilos globales de foco conservados. No hubo comparación visual antes/después de la landing.)

**Criterio de cierre:** el aislamiento y la dirección CSS se revisaron estáticamente. La tarea permanece abierta hasta comprobar visualmente foco, legibilidad/contraste y targets, y comparar la landing en navegador; esas comprobaciones no se ejecutaron en esta sesión.

## 8. Verificar funcionalidad, accesibilidad, privacidad y responsive

- [ ] Recorrer el flujo completo desde la primera sección hasta el éxito simulado con entradas válidas.
- [ ] Probar errores en cada sección, foco/mensajes, corrección y bloqueo de avance; comprobar el caso de edad exactamente 18 y mayor de 18 conforme a la regla actual.
- [ ] Probar retroceso, conservación de valores y actualizaciones país/ciudad/ubicación favorita, incluidos los casos que invalidan selecciones previas.
- [ ] Probar preferencias opcionales vacías y «Otro» vacío/corto/largo y su límite, según las decisiones registradas.
- [ ] Probar cada enlace del resumen y el regreso al resumen después de editar, confirmando que el resto de las respuestas permanece igual.
- [ ] Recorrer todo el flujo con teclado y revisar etiquetas, nombres accesibles, orden y visibilidad del foco, anuncios de paso, progreso, errores, resumen y resultado final con tecnologías de asistencia disponibles.
- [ ] Revisar el formulario en móvil y tamaños mayores; comprobar legibilidad, controles, desbordamiento horizontal y que el foco no quede oculto al cambiar de paso.
- [x] Comparar la landing antes/después o inspeccionar los estilos aplicables para confirmar que no fue modificada. (Inspección estática de `styles.css`: reglas de secciones limitadas con `body:not(.application-page)` y reglas de navegación/envío bajo `.application-page`; no se hizo comparación visual en navegador.)
- [x] Inspeccionar estáticamente `/application.html` y `/validation.js` para confirmar que el manejador no envía los datos y no se añaden solicitudes de red, almacenamiento, cookies, consola, URL ni analítica. (El submit llama `preventDefault()`; búsqueda estática sin APIs de red, almacenamiento, cookies, consola ni escritura en URL en ambos archivos. La página conserva su CDN existente de Tailwind, no usado para transmitir valores del formulario. No hubo captura de tráfico.)
- [x] Verificar que se conserva el enlace hacia la landing y el aviso de demostración; no afirmar que se realizó captura de tráfico si no se hizo. (Inspección estática de `application.html`: header enlaza `./index.html` y el aviso de no envío/no guardado sigue antes del formulario.)
- [x] Revisar los diagnósticos disponibles para HTML, JavaScript y CSS; ejecutar únicamente comprobaciones definidas y disponibles para esta área, registrando resultados y límites. (Diagnósticos del editor sin errores para `application.html`, `validation.js`, `styles.css` e `index.html`. Se omitió `node --check validation.js` y `git diff --check` al elegir el usuario no ejecutar esas comprobaciones.)
- [x] Registrar qué verificaciones se ejecutaron, cuáles fueron informadas por el usuario y cuáles quedaron sin realizar; no presentar una revisión estática como prueba dinámica o de asistencia. (Este registro distingue inspección estática, diagnósticos del editor, verificaciones previamente informadas por el usuario y recorridos no realizados.)

**Criterio de cierre:** criterios de aceptación de `plan.md` y `sepc.md` revisados individualmente y respaldados por verificaciones registradas; todo pendiente debe quedar explícito. No cerrar la tarea si hay defectos, bloqueos o pruebas críticas pendientes sin documentar.

## 9. Revisión final y cierre

- [ ] Revisar el diff para confirmar que solo se modificaron los archivos autorizados y que no se amplió el alcance.
- [x] Comparar el resultado y el estado registrado con `sepc.md`, `plan.md` y los criterios de aceptación; dejar explícito que los recorridos críticos pendientes impiden declarar completa la tarea 003. (Comparación documental realizada; no se identificó autorización para ampliar alcance.)
- [x] Confirmar estáticamente que la landing, las rutas, el aviso de demostración, la validación vigente y la ausencia de envío/persistencia se conservan. (Inspección previa de los archivos activos; no equivale a prueba dinámica ni captura de tráfico.)
- [x] Actualizar este checklist con las casillas verdaderamente verificadas y dejar documentado cualquier pendiente sin marcarlo como completado. (Tareas 4–8 y revisión del diff siguen pendientes; tarea 003 permanece abierta.)
- [ ] Presentar el informe final con archivos y líneas afectadas, razonamiento, comprobaciones realizadas y omitidas, y límites conocidos.

**Criterio de cierre:** tarea 9 y tarea 003 permanecen abiertas: no se revisó el diff y continúan pendientes verificaciones críticas de tareas anteriores. No iniciar la auditoría final ni marcar el checklist completo hasta completar esas verificaciones y comunicar los límites restantes. Este cierre no convierte la demostración en un registro real ni amplía el alcance aprobado.
