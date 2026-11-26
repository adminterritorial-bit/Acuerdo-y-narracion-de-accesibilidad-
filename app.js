"use strict";
/* Mejora progresiva: el contenido, enlaces y navegación funcionan sin JavaScript. */
const $ = id => document.getElementById(id);
const pages = Array.isArray(window.ACUERDO_PAGES) ? window.ACUERDO_PAGES : [];
const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
const latam = /^es-(CO|MX|419|US|AR|CL|PE|EC|VE|CR|PA|UY|PY|DO|GT|HN|SV|NI|BO|CU)$/i;
let foundVoices=[], textSize=1, speechParts=[], partIndex=0, speechVersion=0, speaking=false;
function sayStatus(message){const el=$("voiceStatus");if(el)el.textContent=message;}
function stopSpeech(){speechVersion++;speaking=false;speechParts=[];partIndex=0;if(synth)synth.cancel();sayStatus("Lectura detenida.");}
function voiceScore(v){const s=(v.lang||"").toLowerCase(),n=(v.name||"").toLowerCase();
 return (n.includes("google")?0:100)+(s==="es-co"?0:s==="es-mx"?1:s==="es-419"?2:s==="es-us"?3:10);
}
function updateVoices(){
 if(!synth){sayStatus("Este navegador no admite lectura automática. Usa el audio explicativo o tu lector de pantalla.");return;}
 foundVoices=synth.getVoices().filter(v=>(v.lang||"").toLowerCase().startsWith("es")).sort((a,b)=>voiceScore(a)-voiceScore(b));
 const select=$("voicePicker"); if(!select)return; const previous=select.value;
 select.replaceChildren();
 for(const v of foundVoices){const o=document.createElement("option");o.value=v.name+"|"+v.lang;o.textContent=v.name+" ("+v.lang+")"+(/google/i.test(v.name)?" · Google":"");select.append(o);}
 if(foundVoices.some(v=>v.name+"|"+v.lang===previous))select.value=previous;
 const available=foundVoices.filter(v=>latam.test(v.lang));const chosen=foundVoices.find(v=>v.name+"|"+v.lang===select.value);
 if(available.length){if(!speaking)sayStatus("Voz en español detectada: "+(chosen?chosen.name:available[0].name)+". Pulsa Probar voz o Escuchar un tema.");}
 else if(foundVoices.length){if(!speaking)sayStatus("Solo hay voces de español de otras regiones instaladas. Para voz latinoamericana, usa Google Chrome con una voz latina configurada.");}
 else if(!speaking)sayStatus("No hay voces españolas instaladas. Puedes escuchar la explicación grabada si está publicada.");
}
function chosenVoice(){const key=$("voicePicker")?.value;return foundVoices.find(v=>v.name+"|"+v.lang===key)||foundVoices.find(v=>latam.test(v.lang))||null;}
function chunks(input){
 const clean=String(input).replace(/\s+/g," ").trim();
 const out=[],pieces=clean.match(/[^.!?;]+[.!?;]?/g)||[clean];let part="";
 for(const sentence of pieces){const w=sentence.trim();if((part+" "+w).length>160&&part){out.push(part.trim());part="";}if(w.length>160){if(part)out.push(part.trim());part="";for(let k=0;k<w.length;k+=150)out.push(w.slice(k,k+150));}else part+=" "+w;}
 if(part.trim())out.push(part.trim());return out.filter(Boolean);
}
function advance(version){
 if(!synth||!speaking||version!==speechVersion)return;
 if(partIndex>=speechParts.length){speaking=false;sayStatus("Lectura finalizada.");return;}
 const voice=chosenVoice();if(!voice){speaking=false;sayStatus("No hay voz compatible. Usa el audio disponible o tu lector de pantalla.");return;}
 const u=new SpeechSynthesisUtterance(speechParts[partIndex++]);u.voice=voice;u.lang=voice.lang;u.rate=Number($("speechRate")?.value||1);u.volume=1;u.pitch=1;
 u.onend=()=>advance(version);
 u.onerror=e=>{if(version!==speechVersion||e.error==="canceled"||e.error==="interrupted")return;speaking=false;sayStatus("No se pudo reproducir la voz del navegador. Prueba otra voz o usa el audio explicativo.");};
 try{synth.speak(u);}catch(e){speaking=false;sayStatus("Este dispositivo no pudo iniciar la voz. Usa el audio explicativo.");}
}
function speak(text,label){
 if(!synth){sayStatus("La síntesis de voz no está disponible en este navegador.");return;}
 if(!chosenVoice()){updateVoices();sayStatus("Selecciona una voz en español disponible o utiliza el audio explicativo.");return;}
 stopSpeech();speechParts=chunks(text);partIndex=0;speaking=true;
 for(const id of ["userAudio","userVideo"]){const media=$(id);if(media&&!media.paused)media.pause();}
 sayStatus("Leyendo: "+label+" con "+chosenVoice().name+".");advance(speechVersion);
}
$("tryVoice")?.addEventListener("click",()=>speak("Bienvenidas y bienvenidos. Esta página explica la política pública de discapacidad del municipio de San Pedro.","prueba de voz"));
$("stopVoice")?.addEventListener("click",stopSpeech);
$("pauseVoice")?.addEventListener("click",()=>{
 if(!synth||!speaking)return;
 if(synth.paused){synth.resume();sayStatus("Lectura reanudada.");}
 else{synth.pause();sayStatus("Lectura en pausa. Pulsa el mismo botón para continuar.");}
});
$("voicePicker")?.addEventListener("change",()=>{if(speaking)stopSpeech();});
document.querySelectorAll("[data-speak]").forEach(b=>b.addEventListener("click",()=>{
 const id=b.getAttribute("data-speak"),el=$(id);
 if(el)speak(el.innerText,el.getAttribute("data-speech-label")||"el tema seleccionado");
}));
$("largerText")?.addEventListener("click",()=>{textSize=Math.min(1.75,textSize+.12);document.documentElement.style.setProperty("--font-scale",String(textSize));});
$("smallerText")?.addEventListener("click",()=>{textSize=Math.max(1,textSize-.12);document.documentElement.style.setProperty("--font-scale",String(textSize));});
$("highContrast")?.addEventListener("click",e=>{const on=document.body.classList.toggle("high-contrast");e.currentTarget.setAttribute("aria-pressed",String(on));});
$("readingMode")?.addEventListener("click",e=>{const on=document.body.classList.toggle("reading-mode");e.currentTarget.setAttribute("aria-pressed",String(on));});
$("resetDisplay")?.addEventListener("click",()=>{
 textSize=1;document.documentElement.style.setProperty("--font-scale","1");
 document.body.classList.remove("high-contrast","reading-mode");
 for(const id of ["highContrast","readingMode"])$(id)?.setAttribute("aria-pressed","false");
});
const chapterRanges=[
 {id:"c1",p:[1,2,3,4,5,6,7,8],name:"Enfoques y principios de inclusión"},
 {id:"c2",p:[9,10,11,12,13],name:"Objetivos, definiciones y principios"},
 {id:"c3",p:[13,14],name:"Cinco ejes estratégicos"},
 {id:"c4",p:[15,16,17,18,19,20,21,22],name:"Plan de acción y responsables"},
 {id:"c5",p:[23,24,25],name:"Cierre, constancias y comunicación"}
];
function renderPages(ids){
 const list=$("pageResults");if(!list)return;list.replaceChildren();
 if(!ids.length){const p=document.createElement("p");p.textContent="No hay páginas que coincidan. Intenta otra palabra.";list.append(p);return;}
 for(const n of ids){
 const page=pages[n-1];if(!page)continue;
 const d=document.createElement("details");d.className="folio";d.id="pagina-"+n;
 const summary=document.createElement("summary");summary.textContent="Página "+n+" de 25";d.append(summary);
 const note=document.createElement("p");note.className="muted";note.textContent=n>=15&&n<=22?"Atención: las tablas de esta página tienen errores de reconocimiento y deben cotejarse con el PDF original.":"Transcripción automática preliminar. Verifica los términos con el documento original.";d.append(note);
 const content=document.createElement("pre");content.className="ocr-text";content.textContent=page.t;d.append(content);
 const b=document.createElement("button");b.type="button";b.textContent="Escuchar página "+n;b.addEventListener("click",()=>speak("Página "+n+". "+page.t,"página "+n));d.append(b);
 list.append(d);
 }
}
function selectChapter(){
 const value=$("chapterSelect")?.value||"c1";const ch=chapterRanges.find(x=>x.id===value)||chapterRanges[0];
 renderPages(ch.p);const e=$("readLabel");if(e)e.textContent=ch.name+". "+ch.p.length+" páginas del documento."; }
$("chapterSelect")?.addEventListener("change",selectChapter);
$("findText")?.addEventListener("input",event=>{
 const q=event.target.value.trim().toLocaleLowerCase("es-CO");
 if(q.length<2){selectChapter();return;}
 const matches=pages.filter(p=>p.t.toLocaleLowerCase("es-CO").includes(q)||String(p.n)===q).map(p=>p.n);
 renderPages(matches);const status=$("readLabel");if(status)status.textContent=matches.length+" páginas contienen la búsqueda: "+q;
});
$("readSelected")?.addEventListener("click",()=>{
 const d=[...document.querySelectorAll("#pageResults details")].filter(x=>x.open).map(x=>Number(x.id.slice(7)));
 const selected=d.length?d:(chapterRanges.find(x=>x.id===$("chapterSelect")?.value)||chapterRanges[0]).p;
 speak(selected.map(n=>"Página "+n+". "+pages[n-1].t).join(". "),"capítulo seleccionado");
});
$("readPDFAll")?.addEventListener("click",()=>speak(pages.map(p=>"Página "+p.n+". "+p.t).join(". "),"documento completo (transcripción preliminar)"));
selectChapter();
function showFile(url,readyId,missingId){
 fetch(url,{method:"HEAD",cache:"no-cache"}).then(r=>{
  if(!r.ok)throw Error("missing");
  const ready=$(readyId),missing=$(missingId);if(ready)ready.hidden=false;if(missing)missing.hidden=true;
 }).catch(()=>{const ready=$(readyId),missing=$(missingId);if(ready)ready.hidden=true;if(missing)missing.hidden=false;});
}
showFile("media/audio-explicativo.mp3","audioReady","audioMissing");
showFile("media/video-igualdad-equidad.mp4","videoReady","videoMissing");
showFile("media/acuerdo-original.pdf","pdfReady","pdfMissing");
showFile("media/video-igualdad-equidad.vtt","captionsAvailable","captionsMissing");
const intro=$("localSignVideo");if(intro)fetch("media/lsc/00-bienvenida.mp4",{method:"HEAD"}).then(r=>{if(r.ok)intro.hidden=false;}).catch(()=>{});
window.addEventListener("pagehide",()=>{if(synth)synth.cancel();});
if(synth){updateVoices();if(typeof synth.addEventListener==="function")synth.addEventListener("voiceschanged",updateVoices);else synth.onvoiceschanged=updateVoices;}
