# Acuerdo Municipal 008 de 2023 — Consulta accesible

Micrositio público para facilitar la consulta de la Política Pública de Discapacidad e Inclusión Social de San Pedro, Valle del Cauca (Acuerdo 008 del 21 de noviembre de 2023).

## Qué contiene
- Lectura temática y página por página de los 25 folios con texto recuperado de escaneo.
- Navegación semántica, búsqueda, ajuste del tamaño del texto, alto contraste, enlaces de salto, controles para teclado y lectores de pantalla.
- Resumen en lenguaje sencillo identificado como orientativo.
- Reproductor listo para la narración humana en español colombiano y clips en Lengua de Señas Colombiana (LSC).
- Recursos de apoyo externos gratuitos: HETAH (consulta experimental de vocabulario), INSOR y Signos en Red (interpretación en línea).

## Importante: publicación con salvaguardas

**La transcripción sigue en revisión.** El OCR puede contener errores, especialmente en las tablas del plan de acción de las páginas 15 a 22. No es una transcripción jurídicamente certificada. El original aprobado conserva validez. No declarar certificación WCAG o PDF/UA sin una auditoría formal.

**La LSC no puede reemplazarse fielmente con un script que convierta palabras españolas a movimientos automáticos.** El reproductor de LSC está preparado, no publicado como interpretación auténtica hasta contar con videos verificados por profesionales y personas sordas usuarias de LSC. HETAH está enlazado únicamente como recurso auxiliar, no como traducción oficial.

## Incorporación de recursos

Para añadir tu audio, sube al repositorio (Add file > Upload files) el archivo:
`media/narracion-completa.mp3`

Si se desea distribuir el escaneo original de 25 páginas, incorpora:
`media/acuerdo-008-2023-original.pdf`

Para videos de LSC, sube un MP4 por bloque:
- `media/lsc/01-presentacion.mp4`
- `media/lsc/02-enfoques.mp4`
- `media/lsc/03-objetivos.mp4`
- `media/lsc/04-ejes.mp4`
- `media/lsc/05-plan-publico.mp4`
- `media/lsc/06-garantias.mp4`
- `media/lsc/07-capacidad.mp4`
- `media/lsc/08-diversidad.mp4`
- `media/lsc/09-disposiciones.mp4`
- `media/lsc/10-constancias.mp4`

Los reproductores se habilitan automáticamente solo cuando existen los archivos. Para videos que tienen voz, incorpora pistas de subtítulos WebVTT revisadas.

## Despliegue

`.github/workflows/pages.yml` despliega automáticamente mediante GitHub Actions a GitHub Pages al hacer push a `main`. Si GitHub indica que Pages no está habilitado, entra a Settings > Pages > Build and deployment > Source: GitHub Actions.

## Validación previa a publicación institucional definitiva
- Cotejar transcripción contra el original, reconstruyendo tablas con encabezados, filas y responsables.
- Publicar el documento original y una versión digital etiquetada revisada.
- Subir narración humana y confirmar el contenido, derechos de uso, pausas y ritmo.
- Traducir e interpretar en LSC con profesionales, y validar la calidad con población sorda.
- Pruebas de teclado, NVDA, VoiceOver, TalkBack, zoom 400%, contraste, reflujo, sin movilidad fina, y revisión con personas usuarias.
- Solicitar ajustes razonables y formatos alternativos.

Referencias:
- [Resolución MinTIC 1519 de 2020](https://normograma.mintic.gov.co/mintic/compilacion/docs/resolucion_mintic_1519_2020.htm).
- [Guía de accesibilidad de INSOR](https://conecta.insor.gov.co/guia-audiovisual/capitulo-3/).
- [W3C: Lengua de señas](https://www.w3.org/WAI/media/av/sign-languages/).
