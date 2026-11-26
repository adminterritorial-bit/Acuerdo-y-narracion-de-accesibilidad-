# Materiales del portal — Acuerdo Municipal 008 de 2023

Se han recibido dos piezas aportadas por el solicitante:
- **Igualdad vs Equidad**, video MP4, 8 minutos y 15 segundos, adaptado para peso web sin eliminar secuencias.
- **Cuando la ciudad es la discapacitada**, audio explicativo, 20 minutos y 40 segundos; se convirtió de M4A a MP3 para mayor compatibilidad.

**Importante:** el material multimedia todavía debe subirse al repositorio. El sitio se ha configurado para detectarlo automáticamente tras su publicación.

## Publicar archivos sin editar el código

En la carpeta `media/`, seleccionar **Add file > Upload files**, arrastrar estos tres archivos y confirmar **Commit changes** a `main`:

| Archivo | Descripción |
|---|---|
| `media/acuerdo-original.pdf` | Copia escaneada del acuerdo original, 25 folios, fuente jurídica |
| `media/audio-explicativo.mp3` | Audio explicativo facilitado por la entidad (20 min 40 s) |
| `media/video-igualdad-equidad.mp4` | Video educativo facilitado por la entidad, optimizado para web (8 min 15 s) |

Cada archivo pesa menos de 25 MB. Después de subirlo, el workflow `Publicar consulta accesible en GitHub Pages` lo publicará.

## Requisitos de accesibilidad pendientes

- El video entregado **no incluye interpretación en Lengua de Señas Colombiana**; para añadir la versión con intérprete validada publicar `media/video-igualdad-equidad-lsc.mp4`.
- La narración en español latino de Google es una **característica del navegador** y solo está disponible si el navegador ofrece esa voz. No hay servicios Google Cloud ni API keys configurados.
- Crear subtítulos revisados en `media/video-igualdad-equidad.vtt`; el sitio detectará este archivo automáticamente.
- Crear una transcripción revisada del audio explicativo, y audiodescripción del video si el contenido visual significativo no está narrado.
- Para la política completa, producir videos profesionales LSC `media/lsc/00-bienvenida.mp4` y los diez módulos descritos en `media/lsc/INSTRUCCIONES.md`.
- Revisar OCR y tablas del acuerdo antes de declarar cumplimiento de accesibilidad o publicación jurídica.

## Guía oficial

- INSOR, `https://conecta.insor.gov.co/guia-audiovisual/`
- MinTIC, `https://www.signosenred.gov.co/`

La reproducción de audio/video nunca se inicia automáticamente.
