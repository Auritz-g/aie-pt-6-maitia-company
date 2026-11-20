# Tareas de implementación — 002 Formulario Brasa Points

**Estado:** completado según las verificaciones informadas por el usuario.  
**Base:** [`spec.md`](./spec.md) · [`plan.md`](./plan.md) · [`../BRIEFING.md`](../BRIEFING.md)

> Seguir las tareas en orden. No comenzar una tarea hasta que la anterior esté completa y verificada. Si una tarea se bloquea por una decisión o aprobación pendiente, detenerse, documentar el bloqueo y no marcarla como completada. Las casillas registran únicamente trabajo realizado y comprobado. Este checklist no autoriza cambios de código por sí solo.

## 1. Resolver decisiones y confirmar rutas de implementación

- [x] Confirmar que la página y el JavaScript se implementarán en los placeholders existentes `/application.html` y `/validation.js`, compartiendo `/styles.css` y el CDN Tailwind existente.
- [x] Confirmar las rutas relativas entre la landing `/index.html` y la página de aplicación: `./application.html` y `./index.html`.
- [x] Definir la casilla obligatoria como confirmación de comprensión de la demostración; no representará aceptación legal ni inventará términos o enlaces.
- [x] Mantener “Sin restricciones” como preferencia seleccionable de manera independiente, sin regla de exclusividad no definida.
- [x] Tratar “Otro” como opción simple sin campo de texto adicional no especificado.
- [x] Interpretar literalmente “mayor de 18 años”: la edad debe ser estrictamente superior a 18.
- [x] Confirmar español como idioma de esta versión, sin añadir inglés.
- [x] Registrar la decisión del usuario de que la simulación no enviará ni guardará datos.

**Criterio de cierre:** completado. Las rutas y decisiones de comportamiento están documentadas aquí y en `spec.md`; el flujo permanece simulado, sin envío ni persistencia.

## 2. Crear la estructura semántica y el contenido del formulario

- [x] Crear la página independiente en la ruta aprobada, con idioma español, metadatos básicos, título y estructura semántica.
- [x] Incluir identidad Brasaland, propósito de registro demostrativo, enlace de regreso a la landing y aviso visible de que los datos no se envían ni guardan.
- [x] Añadir todos los controles del briefing: nombre completo, email, teléfono, país, ciudad, ubicación favorita, preferencias alimentarias, cómo conoció Brasaland, fecha de nacimiento, confirmación demostrativa obligatoria y ofertas por email.
- [x] Añadir las opciones definidas para países, ciudades, locales y “Cómo nos conociste”, respetando los listados del briefing.
- [x] Marcar los campos obligatorios de forma visible y programática, explicar la convención utilizada y distinguir los campos opcionales.
- [x] Verificar por lectura que no se añadieron afirmaciones de cuenta activa, beneficios ya concedidos, pedidos, reservas ni condiciones legales inventadas.

**Criterio de cierre:** completado. La página contiene los campos, etiquetas y opciones acordados, refleja la simulación sin ambigüedad y enlaza de regreso a `./index.html`. La estructura no contiene aún comportamiento de validación.

## 3. Implementar campos dependientes y comportamiento de selección

- [x] Al seleccionar Colombia, ofrecer Medellín, Bogotá y Cali; al seleccionar Estados Unidos, ofrecer Miami y Orlando.
- [x] Filtrar las ubicaciones favoritas según país y ciudad utilizando exactamente la lista del briefing.
- [x] Limpiar la ciudad y la ubicación favorita seleccionadas cuando un cambio de país las invalide.
- [x] Limpiar la ubicación favorita cuando un cambio de ciudad la invalide.
- [x] Permitir que la ubicación favorita y las preferencias alimentarias permanezcan vacías, pues son opcionales.
- [x] Aplicar las decisiones aprobadas sobre exclusividad de “Sin restricciones” y el tratamiento de “Otro”.
- [x] Comprobar manualmente todas las combinaciones país/ciudad y los cambios de selección antes de continuar. (Verificación manual informada por el usuario.)

**Criterio de cierre:** completado. El usuario comprobó manualmente que los campos dependientes funcionan; la lógica implementada reconstruye las opciones y reinicia selecciones inválidas. Las opciones opcionales pueden quedar vacías.

## 4. Implementar validación del formulario

- [x] Añadir JavaScript sencillo, sin dependencias, que valide al enviar y no transmita ni persista valores.
- [x] Validar nombre completo con al menos dos segmentos no vacíos tras normalizar espacios.
- [x] Validar email con formato razonable sin rechazar innecesariamente direcciones válidas.
- [x] Validar teléfono para exigir `+`, prefijo `+57` o `+1` y dígitos suficientes; admitir los formatos de ejemplo del briefing.
- [x] Validar país, ciudad y opción “Cómo nos conociste” como campos obligatorios con opciones válidas.
- [x] Validar la fecha de nacimiento con el umbral definido en la tarea 1 y con comparación de fecha completa, incluidos los casos cercanos al cumpleaños.
- [x] Validar la casilla de términos según la solución demostrativa acordada, sin presentarla como consentimiento legal efectivo.
- [x] Mantener la suscripción a ofertas desmarcada por defecto y opcional (verificado por inspección del HTML).
- [x] Mostrar los mensajes de error del briefing para nombre, email, teléfono, país, ciudad, “Cómo nos conociste”, fecha de nacimiento y términos.
- [x] No invalidar campos opcionales vacíos; conservar los valores ingresados cuando se muestren errores.
- [x] Verificar casos válidos e inválidos de cada regla antes de continuar. (Verificación informada por el usuario.)

**Criterio de cierre:** completado según la verificación manual informada por el usuario. La inspección estática del script confirma las reglas y que se evita el envío nativo; no se ejecutó `node --check`.

## 5. Implementar comunicación accesible de errores y éxito simulado

- [x] Asociar etiquetas, instrucciones y errores con los controles correspondientes; utilizar `fieldset` y `legend` para grupos de casillas cuando proceda.
- [x] Identificar obligatorios visual y programáticamente y no depender solo del color para comunicar errores.
- [x] Mostrar resumen o mensajes de error de forma accesible y dirigir el foco de manera predecible al primer error o resumen.
- [x] Anunciar de forma moderada los cambios de opciones dependientes y los estados de validación.
- [x] Mostrar éxito únicamente si la validación es correcta, indicando que la demostración terminó sin enviar ni guardar datos y sin crear una cuenta.
- [x] No mostrar la promesa de correo de confirmación del mensaje original del briefing ni afirmar que los beneficios están activos.
- [x] Definir el estado de la interfaz tras el éxito sin guardar datos; el botón se deshabilita tras completar la simulación.
- [x] Verificar el estado de éxito con teclado/tecnología de asistencia antes de continuar. (Verificación informada por el usuario.)

**Criterio de cierre:** los errores y el éxito se entienden con tecnologías de asistencia y teclado; el mensaje final deja claro que el registro es solo una simulación.

## 6. Aplicar estilos y diseño responsive

- [x] Mantener Tailwind CSS v4 disponible mediante la integración existente; utilizar `/styles.css` para los estilos propios y patrones del formulario.
- [x] Mantener consistencia visual con la landing y estilos legibles para controles, instrucciones, errores y estado de éxito.
- [x] Implementar el layout mobile-first y ajustar la presentación en los breakpoints `sm`, `md` y `lg`.
- [x] Mantener foco visible, contraste legible, orden visual y de teclado coherente, y controles utilizables en pantallas estrechas. (Verificación responsive informada por el usuario; estilos y estructura confirmados por inspección.)
- [x] Revisar que el formulario no produzca desbordamiento horizontal en los tamaños comprobados. (Verificación informada por el usuario.)

**Criterio de cierre:** completado según la verificación responsive informada por el usuario. El layout mobile-first y sus ajustes están implementados; los diagnósticos del editor no reportan errores.

## 7. Conectar la landing con el formulario

- [x] Sustituir el destino de ambos CTA “Únete a Brasa Points” de `/index.html` por la ruta aprobada del formulario.
- [x] Confirmar que el enlace de regreso de la página de aplicación lleva a la landing.
- [x] Comprobar por inspección que landing, formulario y destino de regreso usan rutas relativas coherentes; la navegación en navegador no se probó por separado.
- [x] Confirmar que el enlace “Menú” permanece sin destino inventado y que no se alteraron secciones o enlaces ajenos al alcance.

**Criterio de cierre:** rutas relativas alineadas con archivos en la raíz; el recorrido se verificó por inspección estática, no por una sesión de navegador.

## 8. Verificar simulación, privacidad y ausencia de transmisión

- [x] Revisar estáticamente JavaScript y formulario: no contienen acciones a backend/API ni envío de correo; `submit` se cancela y la lógica no contiene solicitudes de red.
- [x] Revisar estáticamente que no hay uso de `localStorage`, `sessionStorage`, cookies ni archivos.
- [x] Revisar que el script no escribe valores en URLs, consola o analítica.
- [x] Comprobar por inspección que el aviso de simulación aparece antes del formulario y que el éxito declara que nada se envió o guardó.
- [x] Registrar el método de inspección estática; no se afirma captura de red en navegador ni otras pruebas dinámicas.

**Criterio de cierre:** revisión estática completada: no se encontraron mecanismos de transmisión ni persistencia de los datos del formulario. No se realizó una captura dinámica de red.

## 9. Verificación final y cierre de tarea

- [x] Recorrer la secuencia completa: errores, corrección, cambios de país/ciudad, selección opcional, envío simulado correcto y navegación de regreso. (Verificación informada por el usuario.)
- [x] Verificar por teclado etiquetas, controles, orden de foco, foco visible, errores y estado de éxito. (Verificación informada por el usuario.)
- [x] Revisar la página en móvil y en los tamaños `sm`, `md` y `lg`; registrar limitaciones si no se pudo probar alguno. (Verificación informada por el usuario.)
- [x] Comprobar que el contenido, campos, opciones y mensajes concuerdan con `spec.md` y `BRIEFING.md`, considerando las decisiones aprobadas. (Verificación informada por el usuario; la revisión estática del agente confirmó los campos y opciones inspeccionados.)
- [x] Confirmar que no se introdujeron backend, persistencia, email, dependencias o alcance de reservas/pedidos. (Verificación informada por el usuario; inspección estática del agente para transmisión y persistencia en el formulario.)
- [x] Registrar los archivos afectados, las validaciones ejecutadas y cualquier pendiente o bloqueo antes de cerrar la tarea.

**Criterio de cierre:** completado según las verificaciones finales informadas por el usuario. La comprobación `node --check` se omitió; los diagnósticos del editor no reportan errores HTML, JS o CSS. No se realizó captura independiente de tráfico de red.
