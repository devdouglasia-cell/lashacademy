/* =========================================================================
   LASH ACADEMY — ILUSTRAÇÕES ANIMADAS DE APLICAÇÃO
   Gera, em SVG puro, uma animação delicada mostrando os fios sendo
   "aplicados" sobre a linha do cílio para cada modelo do catálogo.
   Sem imagens externas — tudo desenhado e animado via CSS/SVG.
   ========================================================================= */

const LASH_ILLUS_PALETTE = {
  lid: "#F6E4DA",
  lidShadow: "#EFD2C4",
  liner: "#3A2E2B",
  blush: "#F7C9CE",
  roseA: "#D98A93",
  roseB: "#C97B84",
  ouroA: "#E7CD82",
  ouroB: "#C9A227"
};

let _lashIllusUID = 0;

function _eyePoint(t, p0, p1, p2){
  const x = (1-t)**2*p0.x + 2*(1-t)*t*p1.x + t*t*p2.x;
  const y = (1-t)**2*p0.y + 2*(1-t)*t*p1.y + t*t*p2.y;
  return { x, y };
}

function _lashEndpoint(x, y, angleDeg, len){
  const rad = angleDeg * Math.PI / 180;
  return { x: x + len * Math.sin(rad), y: y - len * Math.cos(rad) };
}

function _lashCurvePath(x, y, angleDeg, len, curl){
  const end = _lashEndpoint(x, y, angleDeg, len);
  const mid = _lashEndpoint(x, y, angleDeg + curl, len * 0.58);
  return `M${x.toFixed(1)},${y.toFixed(1)} Q${mid.x.toFixed(1)},${mid.y.toFixed(1)} ${end.x.toFixed(1)},${end.y.toFixed(1)}`;
}

const LASH_ILLUS_CONFIG = {
  "fio-a-fio": {
    titulo: "Fio a Fio (Clássico)",
    legenda: "1 fio de extensão para 1 fio natural — leve, discreto e natural.",
    pontos: 12, fan: 1, comprimento: 25, spreadDeg: 0, modo: "draw"
  },
  "volume-russo": {
    titulo: "Volume Russo",
    legenda: "Fans de vários fios finíssimos por fio natural — densidade sem peso.",
    pontos: 7, fan: 5, comprimento: 21, spreadDeg: 24, modo: "draw"
  },
  "hibrido": {
    titulo: "Volume Híbrido",
    legenda: "Alterna fio a fio e pequenos fans — textura mista.",
    pontos: 10, fan: "alterna", comprimento: 23, spreadDeg: 16, modo: "draw"
  },
  "brasileiro": {
    titulo: "Brasileiro / Tecnológico (YY-W)",
    legenda: "Fio bifurcado em Y — volume expressivo com aplicação ágil.",
    pontos: 9, fan: "y", comprimento: 25, spreadDeg: 15, modo: "draw"
  },
  "tufo": {
    titulo: "Cílios Postiços em Tufo",
    legenda: "Tufos pré-montados posicionados pontualmente — ideal para eventos.",
    pontos: 5, fan: 4, comprimento: 24, spreadDeg: 28, modo: "pop"
  }
};

const ICONE_PARA_ILUSTRACAO = {
  single: "fio-a-fio",
  fan: "volume-russo",
  mix: "hibrido",
  y: "brasileiro",
  tuft: "tufo"
};

function buildLashIllustration(kind, options){
  const opts = Object.assign({ caption: true }, options || {});
  const cfg = LASH_ILLUS_CONFIG[kind];
  if(!cfg) return "";
  _lashIllusUID++;
  const uid = `li${_lashIllusUID}`;

  const P0 = { x: 16, y: 80 }, P1 = { x: 82, y: 32 }, P2 = { x: 158, y: 66 };

  let lashMarkup = "";
  let lastDelay = 0;
  const stepDelay = cfg.modo === "pop" ? 0.34 : 0.14;

  for(let i=0; i<cfg.pontos; i++){
    const t = 0.06 + (i/(cfg.pontos-1)) * 0.9;
    const { x, y } = _eyePoint(t, P0, P1, P2);
    const baseAngle = -52 + t * 96;
    const groupDelay = i * stepDelay;
    lastDelay = groupDelay;

    let fanCount = cfg.fan;
    if(cfg.fan === "alterna") fanCount = (i % 2 === 0) ? 1 : 3;
    if(cfg.fan === "y") fanCount = 2;

    let fanMarkup = "";
    for(let f=0; f<fanCount; f++){
      const spread = fanCount > 1 ? (f/(fanCount-1) - 0.5) * cfg.spreadDeg : 0;
      const angle = baseAngle + spread;
      const curl = 13;
      const d = _lashCurvePath(x, y, angle, cfg.comprimento, curl);
      const strokeUrl = (f % 2 === 0) ? `url(#grad-rosa-${uid})` : `url(#grad-ouro-${uid})`;
      const fDelay = (groupDelay + f * 0.04).toFixed(2);

      if(cfg.modo === "draw"){
        fanMarkup += `<path d="${d}" pathLength="1" class="lash-stroke lash-draw" style="--delay:${fDelay}s" stroke="${strokeUrl}"/>`;
      }else{
        fanMarkup += `<path d="${d}" class="lash-stroke" stroke="${strokeUrl}"/>`;
      }
    }

    if(cfg.modo === "pop"){
      lashMarkup += `<g class="lash-tuft" style="--delay:${groupDelay.toFixed(2)}s; transform-origin:${x.toFixed(1)}px ${y.toFixed(1)}px;">${fanMarkup}</g>`;
    }else{
      lashMarkup += fanMarkup;
    }
  }

  const totalDelay = lastDelay + 0.55;
  const sparkle1 = `<text x="150" y="30" class="lash-sparkle" style="--delay:${(totalDelay).toFixed(2)}s">✦</text>`;
  const sparkle2 = `<text x="18" y="26" class="lash-sparkle lash-sparkle-sm" style="--delay:${(totalDelay+0.5).toFixed(2)}s">✦</text>`;

  return `
    <div class="lash-illus" data-illus-id="${uid}">
      <svg viewBox="0 0 172 100" class="lash-illus-svg" aria-hidden="true">
        <defs>
          <linearGradient id="grad-rosa-${uid}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${LASH_ILLUS_PALETTE.roseA}"/>
            <stop offset="100%" stop-color="${LASH_ILLUS_PALETTE.roseB}"/>
          </linearGradient>
          <linearGradient id="grad-ouro-${uid}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${LASH_ILLUS_PALETTE.ouroA}"/>
            <stop offset="100%" stop-color="${LASH_ILLUS_PALETTE.ouroB}"/>
          </linearGradient>
          <radialGradient id="grad-glow-${uid}" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stop-color="${LASH_ILLUS_PALETTE.blush}" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="${LASH_ILLUS_PALETTE.blush}" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <ellipse cx="86" cy="58" rx="82" ry="46" fill="url(#grad-glow-${uid})"/>

        <path d="M16,80 Q82,32 158,66 Q90,56 16,80Z" fill="${LASH_ILLUS_PALETTE.lid}" opacity="0.9"/>
        <path d="M16,80 Q82,32 158,66" fill="none" stroke="${LASH_ILLUS_PALETTE.liner}" stroke-width="2.4" stroke-linecap="round"/>

        <path d="M22,84 Q84,98 152,80" fill="none" stroke="${LASH_ILLUS_PALETTE.lidShadow}" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="1 5"/>

        ${lashMarkup}
        ${sparkle1}
        ${sparkle2}
      </svg>
      ${opts.caption ? `
        <div class="lash-illus-caption">
          <strong>${cfg.titulo}</strong>
          <span>${cfg.legenda}</span>
        </div>
      ` : ""}
      <button type="button" class="lash-illus-replay" onclick="replayLashIllustration('${uid}', this)">↻ Repetir animação</button>
    </div>
  `;
}

function replayLashIllustration(uid, btn){
  const wrapper = document.querySelector(`[data-illus-id="${uid}"]`);
  if(!wrapper) return;
  const svg = wrapper.querySelector("svg");
  const clone = svg.cloneNode(true);
  svg.replaceWith(clone);
}

function renderLashCatalogGrid(){
  const order = ["fio-a-fio","volume-russo","hibrido","brasileiro","tufo"];
  return `
    <div class="lash-illus-grid">
      ${order.map(k => buildLashIllustration(k)).join("")}
    </div>
  `;
}
