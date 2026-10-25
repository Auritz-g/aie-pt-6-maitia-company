# Especificación — 002 Formulario de registro Brasa Points

**Estado:** implementación completada; verificaciones finales informadas por el usuario y registradas en [`tasks.md`](./tasks.md).  
**Fecha:** 2026-10-21  
**Fuente funcional:** [`../BRIEFING.md`](../BRIEFING.md)  
**Reglas generales del sitio:** [`../contexto-website.md`](../contexto-website.md)

> Esta especificación describe un formulario demostrativo que se comporta como uno de registro, pero no envía ni persiste datos. No es un sistema de membresía de producción, una reserva ni un formulario de pedidos.

## 1. Objetivo y alcance

Crear una página separada de la landing para que una persona pueda recorrer el flujo de registro simulado de Brasa Points. La interfaz debe presentar los campos definidos en el briefing, validar sus entradas en el navegador, mostrar errores comprensibles y ofrecer un estado de éxito demostrativo cuando las entradas sean válidas.

La simulación **no debe** enviar información a un backend, API, correo, servicio de terceros ni almacenamiento persistente. No debe afirmar que los datos se guardaron, que se creó una cuenta real o que llegará un correo de confirmación. La presentación debe explicar claramente que es una demostración y que los datos no se envían.

El alcance incluye:

- Página independiente del sitio para el registro de Brasa Points.
- Controles, etiquetas, ayudas y mensajes en español, coherentes con la landing.
- Validación en navegador y actualización de campos dependientes.
- Mensajes accesibles de error y estado de éxito simulado.
- Enlace de ida desde los CTA de Brasa Points de la landing y una vía para volver a ella.
- Diseño responsive, accesibilidad básica y estilos coherentes con el sitio.

Quedan fuera de alcance el backend, la creación real de cuentas, la persistencia, el envío de correos, la analítica, la integración con POS y cualquier recopilación/transmisión de datos reales.

## 2. Estado inicial observado y relación implementada con la landing

- La landing activa está en `/index.html` y enlaza `/styles.css`.
- En el estado inicial de esta tarea, los dos CTA “Únete a Brasa Points” apuntaban a `#brasa-points`, y `/application.html` y `/validation.js` estaban vacíos. En la implementación actual, ambos CTA apuntan a `./application.html` y el formulario ofrece el retorno a `./index.html`.
- `uis/website/002-formulario-brasa-points/` es la carpeta de documentación de esta tarea; los archivos de implementación se mantuvieron en la raíz.
- La página activa carga Tailwind CSS v4 por CDN y comparte la hoja `/styles.css`; el formulario usa esa integración existente y CSS propio para su presentación, sin dependencias ni build tooling.
- La ubicación efectiva se confirmó en la raíz; las rutas relativas se inspeccionaron estáticamente. La navegación no se probó por separado en un navegador.

La conexión implementada es: landing → CTA de Brasa Points → página del formulario simulado → enlace de regreso a la landing. La landing solo se modificó para actualizar los dos CTA dentro del alcance.

## 3. Idioma, contenido y experiencia

- El idioma base es español, igual que la landing. El inglés no se incluye en esta versión.
- La página identifica el propósito como registro de demostración para Brasa Points, disponible para personas que cumplan el requisito de edad del briefing.
- Antes del formulario se muestra un aviso claro: **“Demostración: este formulario no envía ni guarda tus datos.”** También se advierte que no se escriba información personal real.
- Se incluye un enlace accesible para volver a Brasaland/la landing.
- La simulación no se presenta como registro real ni sugiere beneficios ya activados.
- No se añaden políticas, condiciones legales ni afirmaciones corporativas inventadas.

## 4. Campos y requisitos funcionales

Usar el briefing como fuente para etiquetas, opciones y obligatoriedad:

| Campo                            | Control              | Obligatorio | Requisito descrito                                                               |
| -------------------------------- | -------------------- | ----------- | -------------------------------------------------------------------------------- |
| Nombre completo                  | Texto                | Sí          | Al menos dos palabras (nombre y apellido).                                       |
| Email                            | Email                | Sí          | Formato de email válido.                                                         |
| Teléfono                         | Teléfono             | Sí          | Incluir `+` y código de país admitido: `+57` o `+1`.                             |
| País                             | Selector             | Sí          | Colombia o Estados Unidos.                                                       |
| Ciudad                           | Selector dependiente | Sí          | Colombia: Medellín, Bogotá, Cali. Estados Unidos: Miami, Orlando.                |
| Ubicación favorita de Brasaland  | Selector dependiente | No          | Opciones filtradas por país y ciudad, según el listado del briefing.             |
| Preferencias alimentarias        | Casillas             | No          | Sin restricciones, Vegetariano, Sin gluten, Otro.                                |
| ¿Cómo nos conociste?             | Selector             | Sí          | Redes sociales, Recomendación, Pasando por el local, Búsqueda en internet, Otro. |
| Fecha de nacimiento              | Fecha                | Sí          | La persona debe ser mayor de 18 años.                                            |
| Confirmación de demostración     | Casilla              | Sí          | Confirma comprensión de la simulación; no es aceptación legal de términos.       |
| Quiero recibir ofertas por email | Casilla              | No          | Desmarcada por defecto.                                                          |

### Ubicaciones por país y ciudad

- Colombia — Medellín: Brasaland El Poblado, Brasaland Laureles, Brasaland Envigado, Brasaland Sabaneta.
- Colombia — Bogotá: Brasaland Usaquén, Brasaland Chapinero, Brasaland Zona Rosa.
- Colombia — Cali: Brasaland Granada, Brasaland Ciudad Jardín, Brasaland Unicentro.
- Estados Unidos — Miami: Brasaland Brickell, Brasaland Coral Gables.
- Estados Unidos — Orlando: Brasaland Downtown, Brasaland International Drive.

La ubicación favorita es opcional. Sus opciones corresponden a la combinación seleccionada, no a la lista completa de locales.

## 5. Validación e interacciones

La validación del navegador está implementada con JavaScript sencillo, sin dependencias:

- Nombre completo: exige al menos dos segmentos no vacíos después de normalizar espacios.
- Email: comprueba el formato mediante la validez del control HTML de email, sin restringir innecesariamente direcciones válidas.
- Teléfono: comprueba que comienza con `+` y contiene uno de los prefijos indicados (`+57` o `+1`) y diez dígitos; admite separadores habituales. No pretende realizar validación telefónica internacional exhaustiva.
- País y ciudad: exigen una selección válida.
- País → ciudad: al cambiar país, se actualizan las ciudades y se limpia la ciudad y ubicación favorita seleccionadas previamente.
- País + ciudad → ubicación favorita: se actualizan opciones al cambiar país o ciudad y se limpia la ubicación anterior si ya no corresponde.
- Cómo nos conociste: exige una opción válida.
- Fecha de nacimiento: rechazar una fecha que no cumpla el requisito “mayor de 18 años”, comprobando la fecha completa. Decisión adoptada: la edad debe ser estrictamente superior a 18; el día del 18.º cumpleaños no cumple.
- Confirmación demostrativa: el control obligatorio confirma que la persona entiende que se trata de una demostración; no se presenta como consentimiento legal efectivo ni inventa términos o destino legal.
- Ofertas por email: permite elección independiente, opcional y sin selección inicial.
- Preferencias alimentarias: “Sin restricciones” puede seleccionarse junto con otras opciones; “Otro” no añade un campo de texto.
- La validación ocurre al enviar y comunica errores asociados a los campos.
- Si todo es válido, mostrar un estado de éxito **simulado** en la página, sin llamadas de red, almacenamiento ni envío. No mostrar promesa de email de confirmación.
- El comportamiento conserva los valores al informar errores. Tras un éxito simulado, el botón queda deshabilitado; no se persisten los valores.

## 6. Mensajes de validación del briefing

Se conserva el contenido de estos mensajes, ajustando su presentación semántica sin cambiar su significado:

- Nombre completo: “Ingresa tu nombre completo (nombre y apellido)”
- Email: “Ingresa un email válido (ejemplo: nombre@correo.com)”
- Teléfono: “El teléfono debe incluir código de país (ejemplo: +57 300 123 4567 o +1 305 123 4567)”
- País: “Selecciona tu país”
- Ciudad: “Selecciona tu ciudad”
- Cómo nos conociste: “Cuéntanos cómo conociste Brasaland”
- Fecha de nacimiento: “Debes ser mayor de 18 años para registrarte en Brasa Points”
- Términos del programa: “Debes aceptar los términos del programa Brasa Points para continuar”

El briefing no define mensajes específicos para ubicación favorita ni preferencias alimentarias porque son opcionales; la implementación no las invalida cuando se dejan vacías.

## 7. Estado de éxito simulado

El briefing propone el encabezado “¡Bienvenido a Brasa Points!” y un mensaje que afirma que el registro fue exitoso y que llegará un correo. Para esta versión simulada:

- El encabezado se presenta como respuesta visual de demostración y deja inequívoco que no se creó una cuenta real.
- No se muestra el texto que promete confirmación por email ni se afirma que la persona ya disfruta de beneficios en locales.
- El mensaje final indica que la validación de demostración terminó correctamente, que no se envió ni guardó información y que no se creó una cuenta.
- El estado de éxito se anuncia de forma accesible y permite entender que el flujo terminó.

## 8. Accesibilidad y responsive

- Usar HTML semántico, etiquetas explícitas asociadas a cada control y agrupaciones con `fieldset`/`legend` donde sean apropiadas, especialmente para grupos de casillas.
- Identificar los campos obligatorios de forma visible y programática; explicar el indicador de obligatoriedad.
- Asociar los errores con sus campos mediante relaciones accesibles y anunciar el resumen/estado de validación sin depender solo del color.
- Mantener foco visible, orden de teclado lógico, controles operables por teclado y contraste legible.
- Cuando haya errores, dirigir el foco de forma predecible al resumen o primer campo inválido, sin perder el contexto.
- Anunciar los cambios en listas de ciudades/locales y el estado de éxito de manera accesible, evitando anuncios excesivos.
- Usar diseño mobile-first y los breakpoints `sm`, `md` y `lg`, coherente con la landing.
- No introducir frameworks ni dependencias. Se conserva Tailwind CSS v4 por CDN y `styles.css` contiene los estilos específicos del formulario.

## 9. Privacidad, seguridad y límites de la simulación

- La implementación no realiza solicitudes de red con los valores del formulario ni los guarda en `localStorage`, `sessionStorage`, cookies, archivos o servicios.
- No se registran los datos en consola, analítica o URLs.
- Se informa antes de la interacción que se trata de una demostración y que los datos no se envían ni guardan.
- No se solicita información adicional a los campos del briefing.
- Aunque no haya envío real, la casilla requerida se describe como confirmación de comprensión de la demostración, no como aceptación legal.
- Una futura conversión a registro real requerirá una nueva definición de privacidad, tratamiento, retención, seguridad, consentimiento y mecanismo de envío; esta especificación no la autoriza.

## 10. Decisiones de implementación

Con autorización expresa del usuario para avanzar por las tareas sin aprobación intermedia, se adoptan para esta demostración las siguientes decisiones limitadas al briefing:

1. **Rutas:** se utilizaron los archivos de raíz `/application.html` y `/validation.js`, compartiendo `/styles.css` y el CDN Tailwind CSS v4 ya cargado por la landing. La navegación usa `./application.html` y `./index.html`.
2. **Casilla requerida:** solicita confirmación de comprensión de la demostración, no aceptación legal de términos. No se inventa contenido legal ni URL.
3. **Preferencias:** “Sin restricciones” puede marcarse junto con otras opciones porque no se definió exclusividad.
4. **“Otro”:** es una opción simple, sin campo adicional no solicitado.
5. **Edad:** “mayor de 18 años” se interpreta literalmente como edad estrictamente superior a 18; la fecha del 18.º cumpleaños no cumple.
6. **Idioma:** español, sin inglés en esta versión.
7. **Privacidad:** decisión expresa del usuario: la simulación no envía ni persiste valores.

Estas decisiones no autorizan registro de producción ni constituyen aprobación de términos legales.

## 11. Fuera de alcance

- Crear cuentas reales, almacenar datos o conectarse a servicios/backend.
- Enviar emails o afirmar que se enviará una confirmación.
- Reservas, pedidos en línea, pagos o integración con POS.
- Incorporar librerías, frameworks, dependencias o herramientas de build sin aprobación.
- Traducir al inglés sin aprobación explícita.
- Inventar términos, política de privacidad o contenido legal.

## 12. Verificación y evidencia registrada

Las verificaciones finales fueron informadas por el usuario y se registran en [`tasks.md`](./tasks.md). El agente realizó las inspecciones estáticas indicadas allí y comprobó los diagnósticos del editor. No se deben interpretar las verificaciones informadas como pruebas ejecutadas por el agente. El registro cubre:

- Todos los campos, obligatoriedad, opciones y mensajes corresponden al briefing y a las decisiones aprobadas.
- Los campos dependientes se actualizan correctamente y limpian selecciones inválidas al cambiar país/ciudad.
- Casos válidos e inválidos para nombre, email, teléfono, edad y aceptación de términos; opciones voluntarias pueden permanecer vacías.
- El flujo inválido conserva entradas y expone errores asociados; el flujo válido muestra éxito simulado sin petición de red ni persistencia.
- No hay solicitudes salientes con datos ni escritura en almacenamiento del navegador; no se imprimen datos personales en consola ni URL.
- CTA de la landing y enlace de regreso llevan a destinos válidos según la ubicación efectiva de los archivos.
- Navegación completa con teclado, foco visible, errores/éxito anunciados y controles etiquetados.
- Renderizado responsive en móvil y tamaños `sm`, `md` y `lg`.
- El mensaje de demostración y la ausencia de cuenta real son inequívocos.

**Limitaciones de evidencia:** no se ejecutó `node --check`, no se realizó navegación independiente en navegador ni captura dinámica de tráfico de red. La privacidad se revisó estáticamente; los diagnósticos del editor no reportaron errores en `index.html`, `application.html`, `validation.js` ni `styles.css`.
