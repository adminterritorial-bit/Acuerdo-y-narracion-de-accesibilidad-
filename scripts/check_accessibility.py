"""Verificaciones técnicas básicas. No equivalen a una auditoría WCAG completa."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / "index.html").read_text(encoding="utf-8")
js = (ROOT / "pages.js").read_text(encoding="utf-8")
class Tags(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.media = []
        self.headings = []
        self.skip = []
        self.images = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.append(a["id"])
        if tag == "a" and a.get("href", "").startswith("#"):
            self.links.append(a["href"][1:])
        if tag in ("audio", "video", "iframe"):
            self.media.append((tag, a))
        if tag in ("h1", "h2", "h3"):
            self.headings.append(tag)
        if tag == "img":
            self.images.append(a)
p = Tags()
p.feed(html)
errors = []
if len(p.ids) != len(set(p.ids)):
    errors.append("Hay IDs HTML duplicados")
for target in p.links:
    if target and target not in p.ids:
        errors.append("Enlace interno sin destino: #" + target)
if html.count("<main") != 1 or "id=\"contenido\"" not in html:
    errors.append("Falta un único contenido principal")
if html.count("<h1") != 1:
    errors.append("Debe existir un solo h1")
if not html.startswith("<!doctype html>") or 'lang="es-CO"' not in html:
    errors.append("Falta HTML5 o idioma es-CO")
if 'class="skip"' not in html or 'href="#contenido"' not in html:
    errors.append("Falta enlace para saltar al contenido")
if 'id="lengua-senas"' not in html or html.index('id="lengua-senas"') > html.index('id="escuchar"'):
    errors.append("La LSC no aparece antes de audio")
for tag, a in p.media:
    if a.get("autoplay") is not None or "autoplay" in a:
        errors.append("Reproducción automática no permitida")
    if tag == "iframe" and not a.get("title"):
        errors.append("Iframe sin título")
    if tag in ("audio", "video") and "controls" not in a:
        errors.append(tag + " sin controles nativos")
for a in p.images:
    if "alt" not in a:
        errors.append("Imagen sin atributo alt")
for keyword in ("id=\"audioMissing\"", "id=\"videoMissing\"", "id=\"pdfMissing\"", "id=\"voiceStatus\"", "id=\"pageResults\"", "id=\"highContrast\""):
    if keyword not in html:
        errors.append("No existe una señalización de estado: "+keyword)
if not js.startswith("/**") or "window.ACUERDO_PAGES=" not in js:
    errors.append("No hay datos OCR separados")
else:
    data = json.loads(js.split("window.ACUERDO_PAGES=",1)[1].rstrip().rstrip(";"))
    if len(data) != 25 or [p["n"] for p in data] != list(range(1,26)):
        errors.append("Los 25 folios deben estar ordenados")
if errors:
    print("\n".join("ERROR: "+x for x in errors))
    sys.exit(1)
print("OK: 25 folios, LSC primero, enlaces internos, reproductores y estados; pruebas de usuario pendientes.")
