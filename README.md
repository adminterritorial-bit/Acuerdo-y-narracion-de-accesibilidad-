# Portal accesible — Acuerdo Municipal 008 de 2023 (San Pedro, Valle del Cauca)

Portal público: https://adminterritorial-bit.github.io/Acuerdo-y-narracion-de-accesibilidad-/

Este proyecto ofrece una consulta inicial y multimodal de la **Política Pública de Discapacidad e Inclusión Social**, aprobada el 21 de noviembre de 2023.

## Interfaz nueva

- **Lengua de Señas Colombiana primero**: acceso directo, reproductor de introducción, diez secciones LSC y otro reproductor para una futura versión interpretada del video educativo.
- **Audio**: reproductor del archivo explicativo suministrado y opción de leer texto mediante voces del navegador. Se priorizan las voces de Google en español latinoamericano `es-CO`, `es-MX`, `es-419`; si no existen se informa, sin atribuir a Google voces de otros proveedores.
- **Video educativo**: `Igualdad vs Equidad`, con espacio para subtítulos y versión LSC validada.
- **Cinco ejes** de la política con resúmenes orientativos y escucha por temas, así como lectura por página de los 25 folios.
- **Documento original y texto TXT**, controles de tamaño, contraste, espaciado, teclado y diseño para pantallas pequeñas.

## IMPORTANTE: publicar los archivos multimedia adjuntos

El HTML ya está en el repositorio, pero los tres archivos grandes que el usuario aportó no se transfieren automáticamente desde el chat a GitHub. Después de descargarlos, subir individualmente estos archivos con **Add file > Upload files** en la carpeta `media/`:

1. `acuerdo-original.pdf` — documento original de 25 páginas.
2. `audio-explicativo.mp3` — “Cuando la ciudad es la discapacitada”, 20 min 40 s.
3. `video-igualdad-equidad.mp4` — video educativo de 8 min 15 s.

Son menores de 25 MB cada uno. Tras confirmar los cambios en `main`, GitHub Actions los incorporará automáticamente a GitHub Pages. **El sitio detecta la presencia real de cada archivo, y solo entonces activa su reproductor o descarga.**

Instrucciones completas: [media/INSTRUCCIONES.md](media/INSTRUCCIONES.md).

## Pendientes para accesibilidad integral

1. Verificar la transcripción OCR del escaneo, especialmente las tablas de las páginas 15–22 y sus responsables.
2. Crear y revisar los subtítulos WebVTT para el video educativo; preparar transcripción del audio y audiodescripción de las imágenes si no aparecen descritas en la narración.
3. Grabar y validar interpretación **real en Lengua de Señas Colombiana** (no una sucesión automática de gestos). Usar `media/lsc/00-bienvenida.mp4` y los diez clips de [media/lsc/INSTRUCCIONES.md](media/lsc/INSTRUCCIONES.md), además de `media/video-igualdad-equidad-lsc.mp4`.
4. Realizar pruebas manuales con personas sordas, con discapacidad visual, motriz y cognitiva; verificar con NVDA, VoiceOver y navegación exclusivamente por teclado.
5. No atribuir certificación WCAG o PDF/UA sin pruebas formales.

No hay reproducción automática con sonido. El documento original es la fuente jurídica. Los textos de orientación no sustituyen su contenido.

## Publicación automatizada

Workflow `.github/workflows/pages.yml`: cada cambio en `main` dispara pruebas básicas y despliega el sitio en GitHub Pages.

## Fuentes y buenas prácticas

- [Guía de producción audiovisual accesible para personas sordas del INSOR](https://conecta.insor.gov.co/guia-audiovisual/).
- [Servicio Signos en Red](https://www.signosenred.gov.co/).
- [Web Speech API (MDN)](https://developer.mozilla.org/es/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API).
- [Resolución 1519 de 2020](https://normograma.mintic.gov.co/mintic/compilacion/docs/resolucion_mintic_1519_2020.htm).
