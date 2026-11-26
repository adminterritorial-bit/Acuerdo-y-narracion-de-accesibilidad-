"use strict";
(() => {
  /* Narración orientativa opcional y controles accesibles. No pretende sustituir lectores de pantalla. */
  const narrator = window.PortalNarration;
  const $ = id => document.getElementById(id);
  const toggle=$("guideToggle"), replay=$("guideReplay"), stop=$("guideStop"), hint=$("guideHint");
  if(!toggle||!replay||!stop||!hint||!narrator)return;
  const WELCOME="Bienvenidas y bienvenidos al portal de la Política Pública de Discapacidad e Inclusión Social del municipio de San Pedro. En primer lugar hay tres opciones: ver el video, escuchar la explicación, o consultar y descargar el documento oficial. Debajo encontrarás seis accesos rápidos. Puedes usar el teclado, ampliar las letras y detener la narración cuando quieras.";
  let enabled=true, welcomeAttempted=false, welcomed=false, hoverTimer=null;
  let lastDescription="",lastAnnouncedAt=0;
  try{const saved=localStorage.getItem("sanpedro-guided-voice");if(saved==="off")enabled=false;}catch(_){}
  const update=()=>{
    toggle.setAttribute("aria-pressed",String(enabled));
    toggle.textContent=enabled?"Narración guiada: activada":"Narración guiada: desactivada";
  };
  const store=()=>{try{localStorage.setItem("sanpedro-guided-voice",enabled?"on":"off");}catch(_){}};
  const mediaPlaying=()=>["userAudio","userVideo"].some(id=>{const e=$(id);return e&&!e.paused&&!e.ended;});
  function voiceWelcome(reason){
    if(!enabled||!narrator.hasSpeech()||document.visibilityState!=="visible")return;
    if(mediaPlaying())return;
    welcomeAttempted=true;
    narrator.speak(WELCOME,"bienvenida al portal","guide");
    if(reason==="manual"){welcomed=true;hint.textContent="La bienvenida se solicitó al sistema de voz. Puedes detenerla o desactivar la guía en cualquier momento.";}
    else {
      window.setTimeout(()=>{
        const ss=window.speechSynthesis;
        if(ss&&ss.speaking){welcomed=true;hint.textContent="Narración de bienvenida iniciada. Puedes detenerla o desactivar la guía.";}
        else if(enabled&&!welcomed){hint.textContent="El navegador puede bloquear audio sin una interacción. Pulsa «Escuchar bienvenida» para activarlo.";narrator.stopSpeech(true);}
      },1100);
    }
  }
  function cancelHover(){if(hoverTimer!==null){clearTimeout(hoverTimer);hoverTimer=null;}}
  function setEnabled(value){
    enabled=value;store();update();cancelHover();
    if(!enabled){narrator.stopSpeech(true);hint.textContent="Narración guiada desactivada. Puedes volver a activarla cuando quieras.";}
    else{hint.textContent="Narración guiada activada. Al pasar el cursor o enfocar un recurso importante podrás escuchar su descripción.";voiceWelcome("manual");}
  }
  toggle.addEventListener("click",()=>setEnabled(!enabled));
  replay.addEventListener("click",()=>{if(!enabled){enabled=true;update();store();}voiceWelcome("manual");});
  stop.addEventListener("click",()=>setEnabled(false));
  const relevant=[...document.querySelectorAll("[data-announce]")];
  const announce = (element,kind) => {
    if(!enabled||!narrator.hasSpeech()||mediaPlaying()||narrator.getMode()==="manual")return;
    const description=element.getAttribute("data-announce");
    if(!description)return;
    cancelHover();
    const pause=kind==="hover"?580:390;
    hoverTimer=window.setTimeout(()=>{
      hoverTimer=null;
      if(!enabled||mediaPlaying()||narrator.getMode()==="manual")return;
      const now=Date.now();
      if(description===lastDescription&&now-lastAnnouncedAt<3500)return;
      lastDescription=description;lastAnnouncedAt=now;
      narrator.speak(description,"descripción de recurso","guide");
    },pause);
  };
  for(const el of relevant){
    el.addEventListener("pointerenter",e=>{if(e.pointerType==="mouse"||e.pointerType==="pen")announce(el,"hover");});
    el.addEventListener("pointerleave",cancelHover);
    el.addEventListener("focusin",()=>announce(el,"focus"));
    el.addEventListener("focusout",cancelHover);
  }
  ["userAudio","userVideo"].forEach(id=>{
    const el=$(id);if(!el)return;
    el.addEventListener("play",()=>{cancelHover();if(narrator.isSpeaking())narrator.stopSpeech(true);});
  });
  document.addEventListener("visibilitychange",()=>{
    cancelHover();
    if(document.visibilityState==="hidden"&&narrator.getMode()==="guide")narrator.stopSpeech(true);
  });
  update();
  if(!narrator.hasSpeech()){
    hint.textContent="Este navegador no admite voz sintética. Los reproductores de video y audio funcionan de forma independiente.";
    toggle.disabled=true;replay.disabled=true;stop.disabled=true;
  }else if(enabled){
    // Mejor esfuerzo: los navegadores pueden bloquear la voz sin interacción del usuario.
    window.addEventListener("load",()=>window.setTimeout(()=>{
      if(!welcomeAttempted&&enabled)voiceWelcome("auto");
    },550),{once:true});
  }else{
    hint.textContent="La narración guiada quedó desactivada según tu preferencia anterior. Pulsa el botón para activarla.";
  }
})();