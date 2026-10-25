# Instrucciones para agentes

## Archivos del memory-bank

Leer siempre estos tres archivos antes de empezar cualquier trabajo:

- Producto: `memory-bank/projectbrief.md`
- Tecnología: `memory-bank/techContext.md`
- Progreso: `memory-bank/progress.md`

## Instrucciones y skills obligatorias por interacción

Al inicio de **cada interacción con el usuario**, antes de analizar o realizar la tarea solicitada:

- Revisar el contenido y la estructura de `.agents/`, y leer sus reglas aplicables. Las reglas marcadas como siempre activas se deben cumplir en todas las tareas.
- Revisar el contenido y la estructura de `skills/`, leer su README y consultar/leer las skills pertinentes para la solicitud. Aplicar las instrucciones de las skills que correspondan.
- Repetir esta revisión en cada interacción; no asumir que una lectura realizada en una interacción anterior sigue vigente ni que el contexto previo sustituye la lectura.
- Si una instrucción aplicable exige aprobación, aclaración o detenerse, respetar ese requisito antes de continuar.

## Comandos

- No se han verificado comandos de ejecución o pruebas de producto configurados en la raíz.
- No asumir que las herramientas mencionadas en la plantilla están instaladas o configuradas para un producto.

## Convenciones

- Seguir la organización por responsabilidades descrita en el README de la carpeta correspondiente.
- Documentar cada aplicación, servicio, agente o pipeline nuevo en su propia subcarpeta con un README.
- Diferenciar las recomendaciones de la plantilla de las decisiones implementadas o aprobadas.

## Reglas de dominio

- El briefing describe operaciones de Brasaland en Colombia y Florida, con POS distintos por país; COP y USD; y español e inglés.
- Las necesidades del briefing son candidatas para descubrimiento, no alcance aprobado.
- La personalización del menú es una idea exploratoria del estudiante, no una iniciativa aprobada.
- Si se explora esa idea, la recomendación de IA no sustituye información autoritativa sobre alérgenos ni la orientación del personal.

## Forma de trabajar

- Al empezar a trabajar en un problema, seguir estos pasos en orden:
  1.  Revisar el proyecto.
  2.  Revisar el frontend.
  3.  Revisar el backend.
  4.  Planificar los cambios.
  5.  Verificar que los cambios planificados respondan al problema que se intenta solucionar.
  6.  Implementar los cambios.
  7.  Verificar que la implementación sea correcta.
  8.  Verificar que los cambios respondan al problema solicitado.
- Al completar cada avance del proyecto, actualizar `memory-bank/progress.md` con el estado observado y las validaciones realizadas. No registrar como completado algo que no se haya verificado.
- Si un cambio modifica el alcance o el comportamiento previsto del proyecto, actualizar también `memory-bank/projectbrief.md` para reflejarlo y distinguir los cambios aprobados de las propuestas.
- Si un cambio modifica la arquitectura, las tecnologías, la configuración o cualquier otro aspecto técnico documentado, actualizar también `memory-bank/techContext.md` con el estado verificado y las decisiones pendientes que correspondan.
- Mantener explícita la diferencia entre hechos observados, propuestas y decisiones aprobadas.
- Limitar los cambios al objetivo solicitado y no completar decisiones que siguen pendientes.

## Límites

- No presentar como aprobados un producto, MVP, arquitectura o stack de producción.
- No tratar las tecnologías sugeridas por la plantilla —incluida FastAPI— como decisiones adoptadas para Brasaland.
- Las observaciones técnicas describen este repositorio; no permiten afirmar que Brasaland carezca de sistemas externos.
- No modificar `CONTEXT.md`, `CONTEXT.es.md`, `README.md`, `README.es.md` ni otros archivos o carpetas cuyo nombre o propósito sea `CONTEXT` o `README` sin el consentimiento explícito del usuario. Si una tarea parece requerir cambios en ellos, solicitar autorización antes de editarlos.

## Verificación

- Comprobar que los cambios concuerdan con las fuentes consultadas y con el estado registrado en `memory-bank/progress.md`.
- Ejecutar pruebas o comprobaciones solo si están definidas para el área modificada; no se han verificado comandos globales de producto en la raíz.
