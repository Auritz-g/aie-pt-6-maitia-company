- Al elegir «Otro» aparece un campo de texto explicativo con etiqueta «Cuéntanos más sobre tu preferencia» y ayuda «Describe brevemente tu preferencia alimentaria». Crece desde una altura inicial similar a los campos actuales hasta 8 rem y permite desplazamiento interno al alcanzar el límite. La explicación es opcional y se puede continuar si queda vacía; las preferencias también pueden quedar vacías.

# Plan de implementación — 003 Retocado visual y progresivo del formulario Brasa Points

**Estado:** plan aprobado para implementación secuencial; tareas 1 y 2 cerradas documentalmente. Auditoría previa presentada; el código sigue sin iniciarse y espera decisión del usuario.
**Fecha:** 2026-10-22  
**Base:** [`sepc.md`](./sepc.md), [`../002-formulario-brasa-points/spec.md`](../002-formulario-brasa-points/spec.md), [`../002-formulario-brasa-points/tasks.md`](../002-formulario-brasa-points/tasks.md) y [`../contexto-website.md`](../contexto-website.md).

> El usuario autorizó avanzar tarea por tarea y confirmó las decisiones de la fase 1. Antes de modificar código se completará la inspección de la tarea 2 y se presentará la auditoría requerida por `skills/proyect-audit.md`. La landing queda fuera de alcance.

## Objetivo

Retocar la presentación y el flujo del formulario demostrativo de Brasa Points para que se complete en cuatro secciones, permita revisar y editar las respuestas y conserve la validación, accesibilidad, diseño responsive y privacidad ya establecidos. La experiencia seguirá siendo una demostración local: no enviará ni almacenará datos ni creará una cuenta real.

## Estado de partida y archivos previstos

El formulario activo se encuentra en `/application.html`, su lógica en `/validation.js` y los estilos compartidos en `/styles.css`. El formulario presenta actualmente sus campos juntos; ya cuenta con campos dependientes, validaciones, mensajes accesibles, confirmación demostrativa y estado de éxito simulado, según la especificación y el registro de cierre de la tarea 002.

La implementación secuencial está autorizada. Se prevé trabajar únicamente en estos archivos existentes de la raíz, después de completar la tarea 2 y la auditoría:

- `/application.html`: estructura de las cuatro secciones, controles de navegación, progreso, resumen editable y campo condicional de preferencia «Otro».
- `/validation.js`: control del paso actual, avance/retroceso, actualización del resumen, retorno a la sección para editar, validación pertinente y conservación de valores.
- `/styles.css`: estilos de pasos y progreso, controles y estados, sin afectar visualmente la landing.

No se crearán archivos de implementación nuevos, no se moverán los existentes y no se modificarán `/index.html` ni otros archivos. Si la inspección identifica una necesidad fuera de alcance, se detendrá el trabajo y se solicitará autorización aparte.

## Dirección funcional acordada

El flujo estará compuesto por cuatro secciones, en este orden:

1. **Información personal:** nombre completo, email, teléfono y fecha de nacimiento.
2. **Ubicación y preferencias:** país, ciudad, ubicación favorita y preferencias alimentarias. Se conservan las dependencias país → ciudad → ubicación favorita. Ubicación favorita y preferencias son opcionales. Al elegir «Otro» aparece un campo con etiqueta «Cuéntanos más sobre tu preferencia» y ayuda «Describe brevemente tu preferencia alimentaria». Crece desde una altura inicial similar a los campos actuales hasta un máximo de 8 rem y permite desplazamiento interno al alcanzar el límite. La explicación es opcional.
3. **Cómo nos conociste:** campo obligatorio con las opciones existentes.
4. **Resumen y confirmaciones:** resumen de las respuestas anteriores, editable antes de finalizar; confirmación obligatoria de que se entiende que es una demostración y opción voluntaria de recibir ofertas por email, desmarcada inicialmente.

Interacciones acordadas:

- Navegación mediante botones «Volver atrás» y «Continuar», ubicados abajo a la izquierda y a la derecha, respectivamente, cuando corresponda.
- Progreso mediante cuatro círculos numerados, uno por sección. El paso activo será más grande y saturado; los inactivos, más pequeños y visualmente inactivos.
- Activar un dato en el resumen lleva a la sección correspondiente para editarlo.
- Activar un dato editable en el resumen lleva a la sección correspondiente; después de editar, se regresa mediante «Volver al resumen».
- Con errores al continuar, conservar mensajes/ayudas asociados, enfocar el primer campo inválido según el orden actual sin reordenar controles y anunciar el error accesiblemente. Al avanzar correctamente, enfocar el encabezado de la sección siguiente.
- Al empezar a escribir en un campo, desaparece su placeholder; las etiquetas accesibles permanecen visibles.
- Se conservan los valores al avanzar, retroceder, editar o corregir errores.
- Se mantienen las validaciones existentes, los campos dependientes, los estados accesibles y la simulación sin envío ni persistencia.

## Fases propuestas

### 1. Confirmar decisiones y alcance antes del código — completada

Las decisiones se confirmaron con el usuario y se registraron en `sepc.md`: navegación con botones, progreso de cuatro círculos, placeholder, edición desde el resumen, campo «Otro» (8 rem y scroll interno; textos exactos; explicación opcional), tratamiento accesible del foco/errores y preservación de landing y alcance demostrativo. No se asumirán reglas adicionales.

### 2. Preparar y preservar la estructura y la validación

- Agrupar en cuatro secciones los campos que ya existen, manteniendo etiquetas, ayudas, atributos, nombres de control, opciones del briefing y relaciones accesibles.
- Implementar el paso visible y la navegación «Volver atrás» / «Continuar», conservando los datos al cambiar de sección.
- Validar los campos requeridos al intentar avanzar, sin hacer obligatorias la ubicación favorita ni las preferencias opcionales. En la sección final, validar la confirmación obligatoria antes del estado de éxito simulado.
- Respetar la validación existente de fecha de nacimiento (edad estrictamente superior a 18), los mensajes y el comportamiento dependiente país/ciudad/local.

### 3. Añadir progreso, preferencias «Otro» y resumen editable

- Mostrar cuatro indicadores numerados y comunicar semánticamente el paso actual y el total.
- Mostrar el campo explicativo al seleccionar «Otro» con la etiqueta y ayuda aprobadas; crecer desde la altura inicial prevista hasta 8 rem y permitir desplazamiento interno al alcanzar ese máximo. No exigir explicación para continuar.
- Mantener el placeholder únicamente mientras el control está vacío, sin ocultar ni reemplazar su etiqueta accesible.
- Generar un resumen legible de respuestas y confirmaciones en la sección final; hacer accionables los datos editables para regresar al paso correspondiente.
- Tras editar, conservar las respuestas y volver al resumen mediante «Volver al resumen».

### 4. Aplicar el retocado visual sin modificar la landing

- Actualizar solo las reglas de formulario en `/styles.css`, siguiendo el enfoque mobile-first y la dirección de color pastel tierra/naturaleza documentada en `contexto-website.md`; mantener los acentos sobrios y no fijar valores de color no acordados.
- Diseñar estados activo/inactivo, botones, controles, resumen, errores, foco y avisos para móvil y pantallas mayores.
- Evitar cambios colaterales en la presentación de `/index.html`, aunque ambos documentos compartan la hoja de estilos.

### 5. Verificar el flujo y sus límites

- Revisar estáticamente los cambios y los diagnósticos disponibles para HTML, JavaScript y CSS.
- Comprobar cada paso: avance válido, bloqueo por errores, retroceso, preservación de respuestas y cambios en los campos dependientes.
- Comprobar que el resumen permite volver al paso correcto, editar y conservar el resto de los valores.
- Recorrer con teclado y revisar etiquetas, foco, mensajes de error, anuncio de cambios de sección, progreso y estado final con tecnologías de asistencia disponibles.
- Revisar la adaptación en distintos tamaños y la ausencia de desbordamiento horizontal; confirmar que la landing no cambió.
- Confirmar por inspección que el formulario no envía ni persiste datos y que se conserva el enlace de retorno a la landing.
- Registrar claramente qué verificaciones se realizaron y cuáles no; no afirmar pruebas visuales, de asistencia o de red que no se hayan ejecutado.

## Criterios de aceptación

La implementación futura podrá considerarse completa cuando:

1. Los campos aparecen en las cuatro secciones acordadas y en su orden.
2. Los botones y el indicador de progreso representan correctamente el paso actual y permiten avanzar/retroceder según las validaciones acordadas.
3. Ninguna respuesta se pierde al navegar, corregir o editar desde el resumen.
4. Ubicación favorita y preferencias pueden quedar vacías; las reglas para «Otro» sin explicación coinciden con la decisión previa.
5. El campo «Otro» tiene etiqueta/ayuda aprobadas, altura inicial prevista y crecimiento hasta el límite acordado.
6. El resumen es comprensible y cada dato editable lleva a la sección adecuada.
7. Los placeholders desaparecen al empezar a rellenar, sin ocultar etiquetas accesibles.
8. Se conservan las validaciones y opciones actuales, la confirmación de demostración y el carácter voluntario de las ofertas por email.
9. El flujo puede operarse con teclado, anuncia cambios relevantes y mantiene foco, errores y progreso comprensibles.
10. La presentación es usable en móvil y escritorio, no modifica la landing y no presenta desbordamiento horizontal en los tamaños comprobados.
11. No hay envío ni almacenamiento de datos, creación de cuenta real ni afirmaciones de registro efectivo.

## Alcance excluido

- Cambiar contenido, estilos, estructura o navegación de la landing.
- Modificar el destino actual del formulario o su enlace de regreso.
- Crear cuenta real, backend, solicitudes de red, almacenamiento, analítica o envío de emails.
- Cambiar las opciones, requisitos de edad, campos obligatorios o validaciones actuales sin aprobación explícita.
- Añadir dependencias, frameworks o herramientas de compilación.
- Inventar textos finales del campo «Otro», valores visuales exactos o límites no decididos.

## Dependencias y bloqueos

El usuario autorizó la implementación secuencial y confirmó las decisiones de la fase 1. Las tareas 1 y 2 están cerradas documentalmente. El informe de auditoría previa ya fue presentado; no iniciar cambios de código hasta recibir la decisión explícita posterior a la auditoría y resolver las aclaraciones que se solicitan en ella.

La base funcional y el inventario técnico se apoyan en la especificación y cierre de la tarea 002; las comprobaciones consignadas allí incluyen verificaciones informadas por el usuario y límites que deben conservarse como tales, no presentarse como pruebas independientes del agente.
