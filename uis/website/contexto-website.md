# Contexto y reglas del sitio web de Brasaland

**Estado:** guía de trabajo para el sitio; no constituye una aprobación de alcance de producción.  
**Fecha:** 2026-10-21  
**Fuentes:** [`BRIEFING.md`](./BRIEFING.md) y [`specs/spec.md`](./specs/spec.md).

## 1. Propósito y límites

El sitio descrito en el briefing presenta Brasaland, sus ubicaciones y el programa de fidelización Brasa Points. Incluye una landing y una página separada de registro.

- Trabajar por partes y limitar cada avance a lo solicitado y aprobado.
- No presentar las necesidades del briefing como un MVP, compromiso de producción o alcance empresarial aprobado.
- El sitio no debe presentarse como una experiencia de pedidos en línea ni como un sistema de reservas.
- El briefing pide que se informe visiblemente que, por ahora, los pedidos se hacen llamando a la ubicación o visitándola y que los pedidos en línea llegarán próximamente.
- No asumir que hay backend, persistencia, envío de correos o integraciones. Si el registro es una simulación en el navegador, explicarlo claramente y no afirmar que los datos fueron guardados o enviados.

## 2. Reglas de implementación acordadas

Estas reglas reflejan instrucciones expresas del usuario para el sitio:

- Usar HTML semántico; no introducir frameworks.
- Separar la landing y el formulario en archivos `.html` distintos.
- Mantener los estilos en `styles.css`.
- Usar Tailwind CSS v4 como estrategia principal y CSS cuando Tailwind no sea viable.
- En `styles.css`, definir componentes reutilizables cuando haya patrones repetidos construidos con Tailwind.
- Adoptar un enfoque mobile-first y considerar los breakpoints `sm`, `md` y `lg`.
- Usar JavaScript sencillo para las validaciones del formulario que se definan.
- No añadir dependencias ni asumir una herramienta de compilación de Tailwind: el mecanismo de integración sigue pendiente de definición y requiere autorización antes de añadir dependencias.

## 3. Accesibilidad, experiencia y contenido

- Priorizar accesibilidad, UX y adaptación responsive.
- Utilizar etiquetas explícitas y descriptivas en los controles del formulario.
- Las imágenes informativas deben tener texto `alt` descriptivo; las decorativas deben ocultarse apropiadamente a tecnologías de asistencia.
- Considerar navegación por teclado, foco visible, asociación de errores con campos y comunicación accesible de estados de error y éxito.
- No inventar contenido, datos de locales, enlaces, políticas, imágenes ni información de contacto. Mantener los datos fieles a las fuentes aprobadas.
- El idioma base debe ser uniforme en toda la experiencia. El briefing recomienda considerar español e inglés, pero el segundo idioma es opcional; no asumir que se implementará sin decisión explícita.

## 4. Dirección visual y paleta

Para la limpieza visual del sitio, orientar la paleta hacia colores pastel relacionados con la tierra y la naturaleza. Se pueden explorar tonos suaves y cálidos inspirados, por ejemplo, en arena, arcilla, vegetación y otros elementos naturales, manteniendo una apariencia armoniosa y legible.

- Reservar para el header y las secciones de énfasis un color con mayor saturación que la paleta base, pero sobrio y no estridente.
- El marrón chocolate es un ejemplo de la intensidad y el carácter buscados para esos acentos; no es una elección definitiva ni obliga a utilizar ese tono. Se pueden considerar otros colores que evoquen la marca y cumplan el mismo criterio.
- Mantener contraste suficiente entre texto, fondos, controles y estados interactivos; el carácter pastel no debe reducir legibilidad o accesibilidad.
- Esta es una dirección visual acordada para orientar futuras iteraciones, no una definición de valores HEX, tokens finales ni implementación CSS.

## 5. Contenido de la landing

El briefing define este orden general de secciones:

1. Header con el nombre o logo Brasaland y navegación a Inicio, Ubicaciones, Menú, Brasa Points y Contacto. El selector ES/EN solo corresponde si se implementa un segundo idioma.
2. Hero con el titular, subtítulo y llamada a la acción especificados en `BRIEFING.md`; el CTA lleva al registro de Brasa Points.
3. Historia de Brasaland con el texto del briefing e imagen aprobada.
4. Diferenciadores: Calidad Consistente, Experiencia Cálida y Rapidez, con sus descripciones de origen.
5. Ubicaciones de Colombia y Florida, cantidades, ciudades y horarios especificados en el briefing.
6. Brasa Points y sus reglas de acumulación y beneficios conforme al briefing.
7. Contacto con los datos especificados.
8. Footer con copyright y enlaces sociales indicados por la fuente.

Debe incluirse el aviso de que los pedidos en línea todavía no están disponibles, con el texto proporcionado en `BRIEFING.md`. El destino y contenido de “Menú” no están definidos: no inventarlos; resolverlo antes de implementar ese enlace.

## 6. Reglas del formulario Brasa Points

El formulario solicita los campos y obligatoriedad descritos en `BRIEFING.md`: nombre completo, email, teléfono, país, ciudad, ubicación favorita opcional, preferencias alimentarias opcionales, cómo conoció Brasaland, fecha de nacimiento, aceptación de términos y suscripción opcional a ofertas por email.

Validaciones y comportamiento descritos por la fuente:

- Nombre: al menos nombre y apellido.
- Email: formato válido.
- Teléfono: incluir `+` y código de país compatible con Colombia (`+57`) o Estados Unidos (`+1`).
- País: Colombia o Estados Unidos; la ciudad disponible depende del país.
- Ubicación favorita: opcional y filtrada por país y ciudad según la lista de locales del briefing.
- Si cambia país o ciudad, actualizar las opciones dependientes y limpiar cualquier valor que deje de ser válido.
- Cómo nos conoció: obligatorio, con las opciones del briefing.
- Fecha de nacimiento: validar que la persona sea mayor de 18 años.
- Términos: aceptación obligatoria para continuar.
- Ofertas por email: opcional y desmarcada por defecto.
- Mostrar los mensajes de error previstos en `BRIEFING.md` y un estado de éxito accesible al completar la validación.
- El éxito indicado por el briefing debe tratarse como simulación mientras no exista un mecanismo real de envío. No afirmar que llegará un email de confirmación si no se implementó ese envío.

No hay texto ni URL de términos especificados, ni política de privacidad aprobada. No presentar una aceptación legal enlazada ni recopilar/transmitir datos reales hasta resolver el contenido y tratamiento de datos aplicable.

## 7. SEO y datos estructurados

- Aplicar buenas prácticas SEO: metadatos pertinentes y contenido coherente con la página y su idioma base.
- La landing requiere marcado JSON-LD Schema.org de tipo `Restaurant`, conforme a los campos y valores del briefing.
- Mantener exactos los datos de URL, contacto, direcciones e identificadores sociales de la fuente; no completar valores faltantes por conjetura.
- Si se ofrece un solo idioma, `availableLanguage` debe reflejar únicamente ese idioma base, aunque el ejemplo del briefing liste español e inglés.

## 8. Decisiones pendientes: no inferir

Resolver estos puntos antes de implementar la parte afectada:

- Destino real del enlace “Menú”.
- Si “Sin restricciones” es excluyente y si “Otro” en preferencias requiere texto adicional.
- Texto y URL de términos del programa.
- Aviso de privacidad y tratamiento de datos; finalidad, consentimiento y manejo antes de cualquier recolección real.
- Si el copyright debe mantenerse como © 2025 o actualizarse al publicar.
- Si se implementará inglés además del idioma base.
- Imagen autorizada para la sección de historia.
- Forma de integrar/compilar Tailwind CSS v4 sin introducir dependencias no aprobadas.
- Mecanismo para abrir y verificar las páginas y comprobar responsive, accesibilidad básica, validaciones y Schema.org.

## 9. Fuentes y relación con otros documentos

- [`BRIEFING.md`](./BRIEFING.md) es la fuente funcional del contenido, campos, reglas y mensajes.
- [`specs/spec.md`](./specs/spec.md) consolida hallazgos, reglas ya acordadas, pendientes y una propuesta de trabajo incremental.
- Este documento resume reglas básicas para orientar el trabajo del sitio; no sustituye las fuentes ni resuelve por sí mismo las decisiones pendientes.
