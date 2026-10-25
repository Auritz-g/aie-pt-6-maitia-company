# Plan de implementación — 002 Formulario de registro Brasa Points

**Estado:** implementación y verificaciones finales completadas; consultar `tasks.md` para el registro detallado.  
**Fecha:** 2026-10-21  
**Base:** [`spec.md`](./spec.md), [`../BRIEFING.md`](../BRIEFING.md) y [`../contexto-website.md`](../contexto-website.md)

> Este plan documenta la creación de un formulario de demostración: se comporta como un registro en el navegador, pero no envía ni guarda datos. La implementación se realizó con autorización expresa del usuario. Las decisiones de alcance adoptadas se documentan en `spec.md` y `tasks.md`.

## Objetivo

Se creó una página separada de la landing para el registro demostrativo de Brasa Points, en español, con los campos del briefing, validación en el navegador, campos dependientes y estados accesibles. El recorrido implementado es landing → formulario → enlace de regreso a la landing. La demostración no crea una cuenta real ni hace solicitudes de red, persistencia o envío de correo.

## Estado inicial observado al preparar el plan (histórico)

- La landing activa se encuentra en `/index.html` y su hoja de estilos en `/styles.css`.
- En el estado inicial, los CTA “Únete a Brasa Points” enlazaban a `#brasa-points` y `/application.html` y `/validation.js` estaban vacíos. La implementación actual se registra en las fases siguientes y en `tasks.md`.
- La carpeta `uis/website/002-formulario-brasa-points/` contiene la documentación de esta tarea; los archivos de implementación se mantuvieron en la raíz.
- La landing usa Tailwind CSS v4 por CDN y enlaza `/styles.css`; no se añadieron frameworks, dependencias ni herramientas de compilación.

## Fases de trabajo

### 1. Cerrar decisiones y confirmar archivos/rutas — completada

Decisiones adoptadas antes de implementar los componentes afectados:

- Se usaron los archivos de raíz `/application.html` y `/validation.js`, compartiendo `/styles.css` y el CDN Tailwind CSS v4 existente.
- Se usaron enlaces relativos `./application.html` y `./index.html`.
- La casilla requerida confirma comprensión de la demostración, sin representar consentimiento legal ni inventar términos.
- Las preferencias son independientes y “Otro” no añade un campo no especificado.
- “Mayor de 18” se interpreta como edad estrictamente superior a 18.
- El idioma es español.

**Resultado:** completada. Las decisiones se registran también en `spec.md`; el flujo sigue siendo una simulación sin envío ni persistencia.

### 2. Construir la estructura y el contenido de la página — completada

- Se creó un documento HTML semántico en la ruta aprobada, coherente con el idioma base y los estilos de la landing.
- Se incluyeron título, encabezado Brasaland, propósito del formulario, enlace de regreso y aviso visible de demostración: los datos no se envían ni guardan.
- Los campos se organizaron en grupos comprensibles y se adaptó su disposición a móvil y escritorio.
- Se añadieron los controles descritos en `spec.md`: nombre, email, teléfono, país, ciudad, ubicación favorita, preferencias alimentarias, cómo conoció Brasaland, fecha de nacimiento, confirmación de demostración y suscripción opcional a ofertas.
- Se identifican los obligatorios de forma visible y programática, se explica la convención y las opciones opcionales pueden quedar vacías.
- El flujo no se presenta como membresía activa, reserva o pedido.

### 3. Implementar campos dependientes y validación — completada

- Se incorporó JavaScript sencillo en el archivo aprobado, sin dependencias ni llamadas de red.
- Las ciudades se pueblan según el país y las ubicaciones favoritas según país y ciudad, usando las opciones del briefing.
- Al cambiar país o ciudad, se actualizan las opciones y se limpian selecciones que ya no son válidas.
- Se validan nombre completo, email, teléfono, selecciones requeridas, mayoría de edad y confirmación de demostración, respetando las decisiones cerradas en la fase 1.
- Se muestran los mensajes del briefing asociados a sus controles; se conservan las entradas cuando hay errores.
- Preferencias opcionales y ubicación favorita pueden permanecer vacías.
- No se imprimen datos personales en consola ni se incluyen en URL.

### 4. Diseñar estados de error, éxito y presentación — completada

- Se conserva Tailwind CSS v4 y `/styles.css` implementa estilos propios; no se introdujo build tooling ni dependencias.
- Se mantuvo consistencia visual con la landing y diseño mobile-first en los breakpoints `sm`, `md` y `lg`.
- Los errores se muestran de forma comprensible, no solo mediante color, con asociaciones accesibles y foco predecible al resumen.
- El estado final es claramente simulado: la validación terminó, pero no se envió ni guardó información ni se creó una cuenta.
- No se usa la promesa del briefing de correo de confirmación ni se afirma que los beneficios estén activos.
- Tras el éxito, la interfaz se mantiene visible y se deshabilita el botón; no se persisten los valores.

### 5. Conectar la navegación con la landing — completada

- Se cambiaron ambos CTA de Brasa Points de la landing para que apunten a la ruta aprobada del formulario.
- Se incluyó en la página del formulario un enlace de retorno a la landing.
- Se verificaron por inspección estática los destinos relativos; el usuario informó haber recorrido la navegación completa.
- El enlace “Menú” de la landing permanece sin destino inventado; no es parte de este cambio.

**Dependencia satisfecha:** la página y su ruta se confirmaron antes de conectar los CTA.

### 6. Verificar funcionalidad, seguridad, accesibilidad y responsive — completada según verificaciones informadas y registradas

- El usuario informó que probó casos válidos e inválidos, cambios de país/ciudad, opciones dependientes y el flujo integral.
- El usuario informó que verificó teclado, etiquetas, foco, errores, anuncios y estado de éxito, además de los tamaños responsive.
- La inspección estática del agente confirmó el manejador `submit` cancelado y no encontró mecanismos de red, persistencia ni exposición de datos en URL o consola en los archivos revisados.
- Las rutas se comprobaron por inspección estática; el recorrido de navegador y la captura de red no se ejecutaron de forma independiente por el agente.
- Los diagnósticos del editor no reportaron errores HTML, JS ni CSS. `node --check` no se ejecutó.
- Las verificaciones y límites quedan registrados en `tasks.md`; no se presenta como probada una comprobación que no se ejecutó.

## Criterios de aceptación y resultado

Los criterios de aceptación se consideran completados según las verificaciones informadas y registradas en `tasks.md`:

1. La página de registro existe en la ubicación acordada, está en español y es accesible desde los CTA de la landing y desde un enlace de regreso.
2. Están presentes los campos, opciones y reglas acordados, sin datos ni contenido inventados.
3. Las listas dependientes se actualizan y limpian de forma correcta.
4. Los errores se asocian a sus campos y el éxito simulado es claro y accesible.
5. La interfaz indica antes de completar el formulario que no se envían ni guardan datos.
6. La inspección estática no encontró envío, persistencia, llamadas de red ni exposición de datos personales en URL o consola.
7. El usuario informó que el formulario funciona por teclado y se presenta correctamente en los tamaños previstos.
8. Las decisiones de implementación están documentadas en `spec.md` y no se convirtieron en supuestos legales o funcionales.

## Dependencias y bloqueos

| Tema                       | Decisión adoptada para la demostración                                                        | Resultado                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Casilla requerida          | Confirmación de comprensión de la demostración, no aceptación legal efectiva                  | Implementada sin inventar términos ni URL legal.                           |
| Preferencias               | “Sin restricciones” independiente; “Otro” sin campo adicional                                 | Implementado.                                                              |
| Edad mínima                | “Mayor de 18” significa edad estrictamente superior a 18                                      | Implementado en validación de fecha completa.                              |
| Archivos de implementación | Uso de los archivos de raíz para HTML, estilos y JavaScript                                   | Implementado en `application.html`, `styles.css`, `validation.js`.         |
| Ruta del formulario        | `./application.html` desde landing y `./index.html` para regresar                             | Implementado y comprobado estáticamente; navegación informada por usuario. |
| Envío/persistencia         | Decisión ya definida por el usuario para esta versión: simulación sin envío ni almacenamiento | No se añadió backend, requests ni almacenamiento.                          |
| Tailwind                   | Regla del sitio: Tailwind CSS v4 como estrategia principal; integración CDN existente         | Se conservaron CDN y CSS propio, sin dependencias ni build tooling.        |

## Fuera de alcance

- Crear o registrar cuentas reales, enviar datos, persistir valores o integrar servicios.
- Enviar emails o prometer confirmaciones.
- Reservas, pedidos, pagos o integración con POS.
- Añadir framework, dependencias o herramienta de compilación.
- Traducir la experiencia al inglés sin aprobación.
- Inventar términos, política de privacidad, rutas, información legal o contenido no provisto.
- Modificar otras páginas o documentación fuera de los cambios aprobados para implementar esta tarea.
