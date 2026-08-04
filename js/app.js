/* =========================================================================
   LASH ACADEMY — APP.JS
   Estado local (localStorage), roteamento por hash e renderização das telas.
   ========================================================================= */

const STORAGE_KEY = "lashacademy_state_v1";

const ICONS = {
  dashboard: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z"/></svg>`,
  cursos: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5A1.5 1.5 0 0 1 18.5 20H6.5A2.5 2.5 0 0 1 4 17.5v-12Z"/><path stroke-linecap="round" d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20"/></svg>`,
  mapa: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20 3 17.5V6.5L9 4m0 16 6-2m-6 2V4m6 14 6 2.5V9.5L15 7m0 11V7m0 0L9 4"/></svg>`,
  extras: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.5 12.5 12.5 20.5a1.5 1.5 0 0 1-2.12 0L3.5 13.62a1.5 1.5 0 0 1 0-2.12L11.5 3.5H18a2.5 2.5 0 0 1 2.5 2.5v6.5Z"/><circle cx="15.5" cy="8.5" r="1.4"/></svg>`,
  conquistas: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path stroke-linecap="round" d="M17 5h2.5a2.5 2.5 0 0 1-2.5 4.5M7 5H4.5A2.5 2.5 0 0 0 7 9.5"/></svg>`,
  perfil: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3.4"/><path stroke-linecap="round" d="M5 20c1-3.6 4-5.6 7-5.6s6 2 7 5.6"/></svg>`,
};

/* ---------------- Estado ---------------- */
function defaultState(){
  return {
    perfil: { nome: "Sua Aluna" },
    xp: 0,
    concluidas: [],
    quizzesAprovados: [],
    pago: false,
    badges: [],
    certificado: null, // { codigo, data }
    extrasComprados: [] // ids de COURSE_DATA.extras já adquiridos (comprados ou resgatados como bônus)
  };
}

let state = loadState();

// Seleção temporária de extras na loja (carrinho da página "Extras") — não persiste entre sessões
let carrinhoExtras = new Set();

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed };
  }catch(e){
    return defaultState();
  }
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addXP(amount){
  state.xp += amount;
  saveState();
  showToast(`+${amount} XP`);
  checkBadges();
}

function getNivel(xp){
  return COURSE_DATA.niveis.find(n => xp >= n.min && xp <= n.max) || COURSE_DATA.niveis[0];
}

function unlockBadge(id){
  if(!state.badges.includes(id)){
    state.badges.push(id);
    saveState();
    const b = COURSE_DATA.badges.find(x => x.id === id);
    if(b) showToast(`Medalha desbloqueada: ${b.icone} ${b.nome}`);
  }
}

function checkBadges(){
  const aulasGratis = COURSE_DATA.aulas.filter(a => a.modulo === "gratis").map(a=>a.id);
  const aulasPago = COURSE_DATA.aulas.filter(a => a.modulo === "pago").map(a=>a.id);

  if(state.concluidas.length >= 1) unlockBadge("primeira_aula");
  if(aulasGratis.every(id => state.concluidas.includes(id))) unlockBadge("modulo_gratis");
  if(state.quizzesAprovados.includes("gratis")) unlockBadge("quiz_gratis");
  if(state.pago) unlockBadge("desbloqueou_formacao");
  if(aulasPago.every(id => state.concluidas.includes(id))) unlockBadge("modulo_pago");
  if(state.quizzesAprovados.includes("pago")) unlockBadge("quiz_pago");
  if(state.certificado) unlockBadge("certificado");
}

function cursoCompletoPago(){
  const aulasPago = COURSE_DATA.aulas.filter(a => a.modulo === "pago").map(a=>a.id);
  return state.pago && aulasPago.every(id => state.concluidas.includes(id)) && state.quizzesAprovados.includes("pago");
}

/* ---------------- Extras / Bônus — helpers ---------------- */
function extraBonusAtivo(extra){
  return !!extra.bonusGratisAte && new Date(extra.bonusGratisAte).getTime() > Date.now();
}

function possuiExtra(id){
  return state.extrasComprados.includes(id);
}

function formatarDataCurta(iso){
  return new Date(iso).toLocaleDateString("pt-BR");
}

function formatarPreco(valor){
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ---------------- Toast ---------------- */
let toastTimer = null;
function showToast(msg){
  let el = document.getElementById("toast");
  if(!el){
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.innerHTML = msg;
  el.style.display = "flex";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.display = "none"; }, 2600);
}

/* ---------------- Roteador ---------------- */
function currentRoute(){
  const hash = location.hash.replace("#/", "") || "dashboard";
  const [page, param] = hash.split("/");
  return { page, param };
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  buildSidebar();
  render();
});

function navigate(route){
  location.hash = "#/" + route;
}

function buildSidebar(){
  const items = [
    { key: "dashboard", label: "Dashboard", icon: ICONS.dashboard },
    { key: "cursos", label: "Cursos / Módulos", icon: ICONS.cursos },
    { key: "mapeamentos", label: "Mapeamentos", icon: ICONS.mapa },
    { key: "extras", label: "Extras / Bônus", icon: ICONS.extras },
    { key: "conquistas", label: "Minhas Conquistas", icon: ICONS.conquistas },
    { key: "perfil", label: "Perfil / Certificado", icon: ICONS.perfil },
  ];
  const nav = document.getElementById("sidebar-nav");
  nav.innerHTML = items.map(it => `
    <button class="nav-item" data-route="${it.key}">
      ${it.icon}<span>${it.label}</span>
    </button>
  `).join("");
  nav.querySelectorAll(".nav-item").forEach(btn=>{
    btn.addEventListener("click", () => {
      navigate(btn.dataset.route);
      document.getElementById("sidebar").classList.remove("mobile-open");
    });
  });
}

function highlightSidebar(page){
  document.querySelectorAll(".nav-item").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.route === page
      || (page==="aula" && btn.dataset.route==="cursos")
      || (page==="extra" && btn.dataset.route==="extras"));
  });
}

function render(){
  const { page, param } = currentRoute();
  highlightSidebar(page);
  const root = document.getElementById("app-root");
  switch(page){
    case "cursos": root.innerHTML = viewCursos(); attachCursosEvents(); break;
    case "aula": root.innerHTML = viewAula(param); attachAulaEvents(param); break;
    case "mapeamentos": root.innerHTML = viewMapeamentos(); attachMapeamentosEvents(); break;
    case "extras": root.innerHTML = viewExtras(); attachExtrasEvents(); break;
    case "extra": root.innerHTML = viewExtraDetalhe(param); attachExtraDetalheEvents(); break;
    case "conquistas": root.innerHTML = viewConquistas(); break;
    case "perfil": root.innerHTML = viewPerfil(); attachPerfilEvents(); break;
    default: root.innerHTML = viewDashboard(); attachDashboardEvents();
  }
  window.scrollTo({top:0, behavior:"instant"});
}

/* ---------------- Componentes reutilizáveis ---------------- */
function fanMeterSVG(nivelIndex){
  // 4 linhas em leque — cada linha "acende" conforme o nível sobe (elemento assinatura)
  const angles = [-40,-14,14,40];
  const lines = angles.map((ang,i)=>{
    const lit = i <= nivelIndex ? "lit" : "";
    const rad = ang * Math.PI/180;
    const len = 55;
    const x2 = 65 + Math.sin(rad)*len;
    const y2 = 85 - Math.cos(rad)*len;
    return `<line x1="65" y1="85" x2="${x2}" y2="${y2}" class="${lit}"/>`;
  }).join("");
  return `<svg viewBox="0 0 130 90" width="100%" height="100%">${lines}<circle cx="65" cy="85" r="4" fill="#C9A227"/></svg>`;
}

function progressBar(pct){
  return `<div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,pct)}%"></div></div>`;
}

function headerBlock(eyebrow, titulo, sub){
  return `
    <div class="eyebrow">${eyebrow}</div>
    <h1 class="font-display" style="font-size:2rem;margin:6px 0 4px;">${titulo}</h1>
    ${sub ? `<p style="color:var(--cinza);max-width:640px;margin:0 0 10px;">${sub}</p>` : ""}
    <div class="lash-divider"><div class="line"></div><span>✦</span><div class="line"></div></div>
  `;
}

/* ---------------- DASHBOARD ---------------- */
function viewDashboard(){
  const nivel = getNivel(state.xp);
  const nivelIndex = COURSE_DATA.niveis.findIndex(n => n.nome === nivel.nome);
  const totalAulas = COURSE_DATA.aulas.length;
  const pct = (state.concluidas.length / totalAulas) * 100;
  const proxima = COURSE_DATA.aulas.find(a => !state.concluidas.includes(a.id) && (a.modulo === "gratis" || state.pago));

  return `
    ${headerBlock("Bem-vinda de volta", `Olá, ${escapeHtml(state.perfil.nome)} ✨`, "Continue sua jornada para se tornar uma Master Lash Designer.")}

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px;margin-bottom:22px;">
      <div class="card" style="display:flex;align-items:center;gap:16px;">
        <div class="fan-meter">${fanMeterSVG(nivelIndex)}</div>
        <div>
          <div class="eyebrow">Nível atual</div>
          <div class="font-display" style="font-size:1.2rem;">${nivel.nome}</div>
          <div style="font-size:0.82rem;color:var(--cinza);">${state.xp} XP acumulado</div>
        </div>
      </div>

      <div class="card">
        <div class="eyebrow">Progresso do curso</div>
        <div style="font-size:1.6rem;font-family:'Playfair Display',serif;margin:4px 0 10px;">${state.concluidas.length}/${totalAulas} aulas</div>
        ${progressBar(pct)}
      </div>

      <div class="card">
        <div class="eyebrow">Status da Formação</div>
        <div style="font-size:1.05rem;margin:6px 0 10px;">${state.pago ? "Formação Completa liberada 🎓" : "Módulo gratuito"}</div>
        ${!state.pago ? `<button class="btn btn-gold" id="btn-upsell-dash">Liberar Formação Completa</button>` : `<span style="color:var(--dourado-lt);background:var(--preto);padding:6px 12px;border-radius:999px;font-size:0.8rem;">Acesso Premium</span>`}
      </div>
    </div>

    <div class="card" style="margin-bottom:22px;">
      <div class="eyebrow">Continue de onde parou</div>
      ${proxima ? `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;margin-top:8px;">
          <div>
            <div class="font-display" style="font-size:1.15rem;">${proxima.titulo}</div>
            <div style="font-size:0.85rem;color:var(--cinza);">${proxima.duracao} · ${proxima.modulo === 'pago' ? 'Formação Completa' : 'Módulo Gratuito'}</div>
          </div>
          <button class="btn btn-primary" data-goto-aula="${proxima.id}">Continuar aula →</button>
        </div>
      ` : `<p style="margin-top:8px;">Você concluiu todas as aulas disponíveis. Confira suas conquistas! 🎉</p>`}
    </div>

    <div class="card">
      <div class="eyebrow">Últimas medalhas</div>
      <div style="display:flex;gap:14px;margin-top:10px;flex-wrap:wrap;">
        ${COURSE_DATA.badges.slice(0,7).map(b => `
          <div style="text-align:center;width:70px;${state.badges.includes(b.id) ? "" : "opacity:0.3;filter:grayscale(1);"}">
            <div style="font-size:1.7rem;">${b.icone}</div>
            <div style="font-size:0.68rem;color:var(--cinza);">${b.nome}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function attachDashboardEvents(){
  document.querySelectorAll("[data-goto-aula]").forEach(btn=>{
    btn.addEventListener("click", ()=> navigate(`aula/${btn.dataset.gotoAula}`));
  });
  const upsell = document.getElementById("btn-upsell-dash");
  if(upsell) upsell.addEventListener("click", ()=> openUpsellModal());
}

/* ---------------- CURSOS ---------------- */
function viewCursos(){
  const gratis = COURSE_DATA.aulas.filter(a => a.modulo === "gratis");
  const pago = COURSE_DATA.aulas.filter(a => a.modulo === "pago");

  function row(a){
    const done = state.concluidas.includes(a.id);
    const locked = a.modulo === "pago" && !state.pago;
    return `
      <div class="lesson-row ${done ? "done":""} ${locked ? "locked":""}" data-lesson="${a.id}" data-locked="${locked}">
        <div class="lesson-badge-num">${done ? "✓" : a.id}</div>
        <div style="flex:1;">
          <div style="font-weight:600;">${a.titulo}</div>
          <div style="font-size:0.8rem;color:var(--cinza);">${a.duracao} · +${a.xp} XP</div>
        </div>
        ${locked ? `<span style="font-size:1.1rem;">🔒</span>` : `<span style="color:var(--rosa-forte);">→</span>`}
      </div>
    `;
  }

  const quizGratisDone = state.quizzesAprovados.includes("gratis");
  const quizPagoDone = state.quizzesAprovados.includes("pago");
  const gratisCompletas = gratis.every(a => state.concluidas.includes(a.id));
  const pagoCompletas = pago.every(a => state.concluidas.includes(a.id));

  return `
    ${headerBlock("Trilha de aprendizado", "Cursos & Módulos", "Avance aula por aula. Cada aula concluída soma XP e te aproxima do certificado.")}

    <div class="card" style="margin-bottom:24px;">
      <div class="eyebrow">Módulo 1 · Gratuito</div>
      <h3 class="font-display" style="margin:4px 0 14px;">Fundamentos de Lash Designer</h3>
      ${gratis.map(row).join("")}
      <div style="margin-top:14px;padding:14px 16px;border-radius:14px;background:${quizGratisDone ? '#F2F8EC':'var(--nude)'};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div>
          <strong>Quiz de fixação</strong>
          <div style="font-size:0.82rem;color:var(--cinza);">+100 XP ao acertar</div>
        </div>
        <button class="btn ${quizGratisDone ? 'btn-outline':'btn-primary'}" data-quiz="gratis" ${!gratisCompletas ? "disabled":""}>
          ${quizGratisDone ? "Refazer quiz" : "Fazer quiz"}
        </button>
      </div>
    </div>

    <div class="card">
      <div class="eyebrow">Módulo 2 · Formação Profissional Completa ${!state.pago ? "🔒":""}</div>
      <h3 class="font-display" style="margin:4px 0 14px;">Técnica Avançada & Negócio</h3>
      ${pago.map(row).join("")}
      <div style="margin-top:14px;padding:14px 16px;border-radius:14px;background:${quizPagoDone ? '#F2F8EC':'var(--nude)'};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div>
          <strong>Quiz final da Formação</strong>
          <div style="font-size:0.82rem;color:var(--cinza);">+100 XP ao acertar</div>
        </div>
        <button class="btn ${quizPagoDone ? 'btn-outline':'btn-primary'}" data-quiz="pago" ${!state.pago || !pagoCompletas ? "disabled":""}>
          ${quizPagoDone ? "Refazer quiz" : "Fazer quiz"}
        </button>
      </div>
      ${!state.pago ? `<button class="btn btn-gold" style="margin-top:16px;" id="btn-upsell-cursos">Liberar Formação Completa</button>` : ""}
    </div>
  `;
}

function attachCursosEvents(){
  document.querySelectorAll("[data-lesson]").forEach(row=>{
    row.addEventListener("click", ()=>{
      if(row.dataset.locked === "true"){ openUpsellModal(); return; }
      navigate(`aula/${row.dataset.lesson}`);
    });
  });
  document.querySelectorAll("[data-quiz]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      if(btn.disabled) return;
      openQuizModal(btn.dataset.quiz);
    });
  });
  const upsell = document.getElementById("btn-upsell-cursos");
  if(upsell) upsell.addEventListener("click", ()=> openUpsellModal());
}

/* ---------------- AULA ---------------- */
function viewAula(idStr){
  const id = parseInt(idStr, 10);
  const aula = COURSE_DATA.aulas.find(a => a.id === id);
  if(!aula) return `<p>Aula não encontrada.</p>`;

  if(aula.modulo === "pago" && !state.pago){
    setTimeout(()=> openUpsellModal(), 50);
  }

  const idx = COURSE_DATA.aulas.findIndex(a=>a.id===id);
  const anterior = COURSE_DATA.aulas[idx-1];
  const proxima = COURSE_DATA.aulas[idx+1];
  const done = state.concluidas.includes(id);

  return `
    <button class="btn btn-outline" style="margin-bottom:18px;" onclick="navigate('cursos')">← Voltar aos cursos</button>
    <div class="eyebrow">${aula.modulo === "pago" ? "Formação Completa" : "Módulo Gratuito"} · Aula ${aula.id}</div>
    <h1 class="font-display" style="font-size:1.9rem;margin:6px 0 4px;">${aula.titulo}</h1>
    <p style="color:var(--cinza);">${aula.duracao} · +${aula.xp} XP ao concluir</p>
    <div class="lash-divider"><div class="line"></div><span>✦</span><div class="line"></div></div>

    <div class="card" style="margin-bottom:20px;">
      <p style="font-style:italic;color:var(--rosa-forte);margin-top:0;">${aula.resumo}</p>
      ${aula.conteudo.map(p => `<p style="line-height:1.75;">${p}</p>`).join("")}

      ${aula.pontosChave ? `
        <div style="background:var(--nude);border-radius:14px;padding:16px 18px;margin-top:18px;">
          <strong>Pontos-chave</strong>
          <ul style="margin:8px 0 0;padding-left:20px;">
            ${aula.pontosChave.map(p=>`<li style="margin-bottom:4px;">${p}</li>`).join("")}
          </ul>
        </div>
      ` : ""}

      ${aula.hasCatalog ? `
        <div class="lash-divider"><div class="line"></div><span>✦</span><div class="line"></div></div>
        <div class="eyebrow">Demonstração animada</div>
        <h3 class="font-display" style="margin:6px 0 2px;">Veja a aplicação de cada modelo</h3>
        <p style="color:var(--cinza);font-size:0.9rem;margin-top:0;">Toque em "Repetir animação" para ver de novo a aplicação de cada técnica.</p>
        ${renderLashCatalogGrid()}
        <div style="margin-top:20px;">
          <button class="btn btn-outline" onclick="navigate('mapeamentos')">Ver Catálogo de Cílios completo →</button>
        </div>
      ` : ""}
      ${aula.hasCalculator ? `
        <div style="margin-top:20px;">
          <button class="btn btn-outline" onclick="navigate('mapeamentos')">Abrir Calculadora de Secagem de Cola →</button>
        </div>
      ` : ""}
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
      <div>${anterior ? `<button class="btn btn-outline" data-nav-aula="${anterior.id}">← Aula anterior</button>` : "<span></span>"}</div>
      <button class="btn ${done ? 'btn-outline':'btn-gold'}" id="btn-concluir-aula" ${done ? "disabled":""}>
        ${done ? "Aula concluída ✓" : `Concluir aula (+${aula.xp} XP)`}
      </button>
      <div>${proxima ? `<button class="btn btn-primary" data-nav-aula="${proxima.id}" id="btn-proxima">Próxima aula →</button>` : "<span></span>"}</div>
    </div>
  `;
}

function attachAulaEvents(idStr){
  const id = parseInt(idStr, 10);
  const btnConcluir = document.getElementById("btn-concluir-aula");
  if(btnConcluir){
    btnConcluir.addEventListener("click", ()=>{
      const aula = COURSE_DATA.aulas.find(a=>a.id===id);
      if(!state.concluidas.includes(id)){
        state.concluidas.push(id);
        saveState();
        addXP(aula.xp);
        render();
      }
    });
  }
  document.querySelectorAll("[data-nav-aula]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const targetId = parseInt(btn.dataset.navAula,10);
      const target = COURSE_DATA.aulas.find(a=>a.id===targetId);
      if(target.modulo === "pago" && !state.pago){ openUpsellModal(); return; }
      navigate(`aula/${targetId}`);
    });
  });
}

/* ---------------- MAPEAMENTOS (Catálogo + Calculadora) ---------------- */
function viewMapeamentos(){
  return `
    ${headerBlock("Ferramentas da profissional", "Mapeamentos", "Catálogo de técnicas e calculadora de secagem de cola — suas ferramentas de consulta rápida no dia a dia.")}

    <div class="card" style="margin-bottom:24px;">
      <h3 class="font-display" style="margin-top:0;">Catálogo de Cílios</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;margin-top:14px;">
        ${COURSE_DATA.catalogo.map(c => `
          <div class="catalog-card">
            ${buildLashIllustration(ICONE_PARA_ILUSTRACAO[c.icone] || "fio-a-fio", { caption:false })}
            <div style="font-weight:700;font-family:'Playfair Display',serif;font-size:1.05rem;margin:12px 0 6px;">${c.tipo}</div>
            <div style="font-size:0.85rem;color:var(--cinza);margin-bottom:10px;">${c.proporcao}</div>
            <div style="margin-bottom:8px;"><strong style="font-size:0.8rem;">Espessura:</strong> <span style="font-size:0.85rem;">${c.espessura}</span></div>
            <div style="margin-bottom:8px;">
              <strong style="font-size:0.8rem;">Curvaturas:</strong>
              ${c.curvaturasIndicadas.map(cv=>`<span class="curve-pill">${cv}</span>`).join("")}
            </div>
            <div style="margin-bottom:8px;"><strong style="font-size:0.8rem;">Efeito:</strong> <span style="font-size:0.85rem;">${c.efeito}</span></div>
            <div style="font-size:0.85rem;color:var(--rosa-forte);"><strong>Indicado para:</strong> ${c.indicadoPara}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="card">
      <h3 class="font-display" style="margin-top:0;">Calculadora de Secagem de Cola</h3>
      <p style="color:var(--cinza);">Informe a umidade e a temperatura do ambiente para estimar o tempo de cura ideal.</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin:16px 0;">
        <div style="flex:1;min-width:160px;">
          <label style="font-size:0.85rem;font-weight:600;">Umidade relativa (%)</label>
          <input type="number" id="input-umidade" min="0" max="100" value="50" style="width:100%;padding:10px 12px;border-radius:10px;border:1.5px solid rgba(34,28,26,0.15);margin-top:6px;">
        </div>
        <div style="flex:1;min-width:160px;">
          <label style="font-size:0.85rem;font-weight:600;">Temperatura (°C)</label>
          <input type="number" id="input-temp" min="0" max="45" value="22" style="width:100%;padding:10px 12px;border-radius:10px;border:1.5px solid rgba(34,28,26,0.15);margin-top:6px;">
        </div>
      </div>
      <button class="btn btn-primary" id="btn-calcular">Calcular secagem ideal</button>
      <div id="resultado-calculadora" style="margin-top:18px;"></div>
    </div>
  `;
}

function attachMapeamentosEvents(){
  const btn = document.getElementById("btn-calcular");
  if(!btn) return;
  btn.addEventListener("click", ()=>{
    const umidade = parseFloat(document.getElementById("input-umidade").value) || 0;
    const temp = parseFloat(document.getElementById("input-temp").value) || 0;
    const resultado = calcularSecagem(umidade, temp);
    document.getElementById("resultado-calculadora").innerHTML = `
      <div style="background:var(--nude);border-radius:14px;padding:18px;">
        <div class="eyebrow">Resultado estimado</div>
        <div class="font-display" style="font-size:1.6rem;margin:6px 0;">${resultado.tempo}</div>
        <p style="margin:0;color:var(--cinza);">${resultado.mensagem}</p>
      </div>
    `;
  });
}

function calcularSecagem(umidade, temp){
  // Faixa ideal: 40-60% umidade, 20-24°C
  const umidadeIdeal = umidade >= 40 && umidade <= 60;
  const tempIdeal = temp >= 20 && temp <= 24;

  if(umidadeIdeal && tempIdeal){
    return { tempo: "0.5 a 1 segundo", mensagem: "Ambiente dentro da faixa ideal — cura rápida e uniforme. Ótimo para volumes e trabalhos de precisão." };
  }
  if(umidade < 40){
    return { tempo: "2 a 3 segundos (ou mais)", mensagem: "Ar seco: a cura será mais lenta. Considere usar um umidificador próximo à estação de trabalho." };
  }
  if(umidade > 60){
    return { tempo: "Menos de 0.5 segundo", mensagem: "Ar muito úmido: a cola cura rápido demais e pode 'flowerar' (esbranquiçar). Reduza a umidade do ambiente se possível." };
  }
  if(temp < 20){
    return { tempo: "1.5 a 2 segundos", mensagem: "Ambiente frio: a reação química fica mais lenta. Aqueça levemente o espaço de trabalho." };
  }
  return { tempo: "1 a 1.5 segundo", mensagem: "Temperatura acima do ideal: fique atenta ao ressecamento precoce da cola no pote." };
}

/* ---------------- EXTRAS / BÔNUS (loja + carrinho) ---------------- */
function viewExtras(){
  const cards = COURSE_DATA.extras.map(extra => {
    const owned = possuiExtra(extra.id);
    const bonusAtivo = extraBonusAtivo(extra);
    const temConteudo = !!(extra.capitulos && extra.capitulos.length);

    let acaoHtml = "";
    if(owned){
      acaoHtml = temConteudo
        ? `<button class="btn btn-primary" data-abrir-extra="${extra.id}" style="width:100%;">Ler agora →</button>`
        : `<span style="color:var(--rosa-forte);font-weight:600;font-size:0.85rem;">✓ Adquirido — conteúdo em breve</span>`;
    } else if(bonusAtivo){
      acaoHtml = state.pago
        ? `<button class="btn btn-gold" data-resgatar-bonus="${extra.id}" style="width:100%;">Resgatar bônus grátis 🎁</button>`
        : `<button class="btn btn-gold" data-ver-formacao="1" style="width:100%;">Incluso grátis na Formação</button>`;
    } else {
      acaoHtml = `
        <label style="display:flex;align-items:center;gap:8px;font-size:0.85rem;cursor:pointer;">
          <input type="checkbox" data-select-extra="${extra.id}" ${carrinhoExtras.has(extra.id) ? "checked":""}>
          Adicionar ao carrinho
        </label>
      `;
    }

    const precoTag = (bonusAtivo && !owned)
      ? `<span style="background:var(--dourado);color:var(--preto);font-size:0.72rem;font-weight:700;padding:3px 10px;border-radius:999px;display:inline-block;">🎁 BÔNUS até ${formatarDataCurta(extra.bonusGratisAte)}</span>`
      : `<span class="font-display" style="font-size:1.3rem;color:var(--rosa-forte);">${formatarPreco(extra.precoAvulso)}</span>`;

    return `
      <div class="card" style="display:flex;flex-direction:column;gap:10px;">
        <div class="eyebrow">${extra.tipo === "ebook" ? "E-book" : "Material para imprimir"}</div>
        <h3 class="font-display" style="margin:0;font-size:1.1rem;">${extra.nome}</h3>
        <p style="color:var(--cinza);font-size:0.88rem;flex:1;margin:0;">${extra.resumo}</p>
        ${precoTag}
        <div style="margin-top:6px;">${acaoHtml}</div>
      </div>
    `;
  }).join("");

  const totalCarrinho = [...carrinhoExtras].reduce((sum,id)=>{
    const e = COURSE_DATA.extras.find(x=>x.id===id);
    return sum + (e ? e.precoAvulso : 0);
  }, 0);

  return `
    ${headerBlock("Loja da Academy", "Extras & Bônus", "Materiais complementares para acelerar seus resultados como Lash Designer.")}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;${carrinhoExtras.size ? "margin-bottom:90px;":""}">
      ${cards}
    </div>
    ${carrinhoExtras.size ? `
      <div style="position:sticky;bottom:16px;background:var(--preto);color:var(--branco);border-radius:16px;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:0 8px 24px rgba(0,0,0,0.25);">
        <div>${carrinhoExtras.size} ${carrinhoExtras.size===1 ? "item":"itens"} no carrinho — <strong>${formatarPreco(totalCarrinho)}</strong></div>
        <button class="btn btn-gold" id="btn-finalizar-carrinho">Finalizar compra →</button>
      </div>
    ` : ""}
  `;
}

function attachExtrasEvents(){
  document.querySelectorAll("[data-select-extra]").forEach(chk=>{
    chk.addEventListener("change", ()=>{
      const id = chk.dataset.selectExtra;
      if(chk.checked) carrinhoExtras.add(id); else carrinhoExtras.delete(id);
      render();
    });
  });
  document.querySelectorAll("[data-abrir-extra]").forEach(btn=>{
    btn.addEventListener("click", ()=> navigate(`extra/${btn.dataset.abrirExtra}`));
  });
  document.querySelectorAll("[data-resgatar-bonus]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.dataset.resgatarBonus;
      if(!state.extrasComprados.includes(id)){
        state.extrasComprados.push(id);
        saveState();
        showToast("Bônus resgatado! Já está disponível para leitura.");
        render();
      }
    });
  });
  document.querySelectorAll("[data-ver-formacao]").forEach(btn=>{
    btn.addEventListener("click", ()=> openUpsellModal());
  });
  const btnFinalizar = document.getElementById("btn-finalizar-carrinho");
  if(btnFinalizar){
    btnFinalizar.addEventListener("click", ()=>{
      openCheckoutModal({ incluirFormacao: false, extraIdsPreSelecionados: [...carrinhoExtras] });
    });
  }
}

function viewExtraDetalhe(id){
  const extra = COURSE_DATA.extras.find(e => e.id === id);
  if(!extra) return `<p>Item não encontrado.</p>`;

  if(!possuiExtra(id)){
    return `
      <button class="btn btn-outline" style="margin-bottom:18px;" onclick="navigate('extras')">← Voltar aos Extras</button>
      <div class="card">
        <p>Você ainda não adquiriu <strong>${extra.nome}</strong>.</p>
        <button class="btn btn-gold" onclick="navigate('extras')">Ver na loja de Extras</button>
      </div>
    `;
  }

  if(!extra.capitulos || !extra.capitulos.length){
    return `
      <button class="btn btn-outline" style="margin-bottom:18px;" onclick="navigate('extras')">← Voltar aos Extras</button>
      <div class="card"><p>Conteúdo em preparação — em breve disponível aqui.</p></div>
    `;
  }

  return `
    <button class="btn btn-outline" style="margin-bottom:18px;" onclick="navigate('extras')">← Voltar aos Extras</button>
    ${headerBlock("E-book Bônus", extra.nome, extra.resumo)}
    <div class="card" id="extra-print">
      ${extra.capitulos.map(cap => `
        <h3 class="font-display" style="margin:18px 0 8px;">${cap.titulo}</h3>
        ${cap.paragrafos.map(p=>`<p style="line-height:1.75;">${p}</p>`).join("")}
      `).join("")}
      ${extra.checklist ? `
        <div style="background:var(--nude);border-radius:14px;padding:16px 18px;margin-top:18px;">
          <strong>Checklist rápido</strong>
          <ul style="margin:8px 0 0;padding-left:20px;">
            ${extra.checklist.map(i=>`<li style="margin-bottom:4px;">${i}</li>`).join("")}
          </ul>
        </div>
      ` : ""}
    </div>
    <div class="no-print" style="margin-top:16px;">
      <button class="btn btn-primary" onclick="window.print()">Imprimir / Salvar em PDF</button>
    </div>
  `;
}

function attachExtraDetalheEvents(){
  // sem eventos adicionais por enquanto — navegação usa onclick inline (mesmo padrão de viewAula)
}

/* ---------------- CONQUISTAS ---------------- */
function viewConquistas(){
  const nivel = getNivel(state.xp);
  const nivelIndex = COURSE_DATA.niveis.findIndex(n => n.nome === nivel.nome);
  const proximoNivel = COURSE_DATA.niveis[nivelIndex+1];
  const pctNivel = proximoNivel ? ((state.xp - nivel.min) / (proximoNivel.min - nivel.min)) * 100 : 100;

  return `
    ${headerBlock("Sua evolução", "Minhas Conquistas", "Acompanhe seu XP, nível e medalhas desbloqueadas ao longo da formação.")}

    <div class="card" style="margin-bottom:24px;display:flex;gap:24px;flex-wrap:wrap;align-items:center;">
      <div class="fan-meter" style="width:170px;height:120px;">${fanMeterSVG(nivelIndex)}</div>
      <div style="flex:1;min-width:220px;">
        <div class="eyebrow">Nível atual</div>
        <div class="font-display" style="font-size:1.7rem;">${nivel.nome}</div>
        <div style="margin:10px 0 6px;">${progressBar(pctNivel)}</div>
        <div style="font-size:0.82rem;color:var(--cinza);">
          ${proximoNivel ? `${state.xp} / ${proximoNivel.min} XP para virar <strong>${proximoNivel.nome}</strong>` : "Nível máximo atingido — Master Lash Designer!"}
        </div>
      </div>
    </div>

    <div class="card">
      <h3 class="font-display" style="margin-top:0;">Medalhas</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:14px;margin-top:14px;">
        ${COURSE_DATA.badges.map(b=>{
          const unlocked = state.badges.includes(b.id);
          return `
            <div class="badge-tile ${unlocked ? "":"locked"}">
              <span class="badge-emoji">${b.icone}</span>
              <div style="font-weight:600;font-size:0.88rem;">${b.nome}</div>
              <div style="font-size:0.72rem;color:var(--cinza);margin-top:2px;">${b.descricao}</div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

/* ---------------- PERFIL / CERTIFICADO ---------------- */
function viewPerfil(){
  const podeEmitir = cursoCompletoPago();
  return `
    ${headerBlock("Sua identidade na plataforma", "Perfil & Certificado", "Edite seu nome de exibição e emita seu certificado ao concluir a Formação Completa.")}

    <div class="card" style="margin-bottom:24px;max-width:460px;">
      <h3 class="font-display" style="margin-top:0;">Dados do perfil</h3>
      <label style="font-size:0.85rem;font-weight:600;">Nome completo (aparece no certificado)</label>
      <input id="input-nome" type="text" value="${escapeHtml(state.perfil.nome)}" style="width:100%;padding:10px 12px;border-radius:10px;border:1.5px solid rgba(34,28,26,0.15);margin:8px 0 14px;">
      <button class="btn btn-primary" id="btn-salvar-perfil">Salvar perfil</button>
    </div>

    <div class="card">
      <h3 class="font-display" style="margin-top:0;">Certificado Oficial</h3>
      ${podeEmitir ? `
        <p>Parabéns! Você concluiu a Formação Profissional Completa e está apta a emitir seu certificado.</p>
        <button class="btn btn-gold" id="btn-emitir-certificado">Emitir Certificado</button>
      ` : `
        <p style="color:var(--cinza);">Para liberar seu certificado, conclua todas as aulas da <strong>Formação Profissional Completa</strong> e seja aprovada no quiz final.</p>
        <ul style="color:var(--cinza);font-size:0.9rem;">
          <li>${state.pago ? "✅" : "⬜"} Acesso à Formação Completa liberado</li>
          <li>${COURSE_DATA.aulas.filter(a=>a.modulo==="pago").every(a=>state.concluidas.includes(a.id)) ? "✅" : "⬜"} Todas as aulas pagas concluídas</li>
          <li>${state.quizzesAprovados.includes("pago") ? "✅" : "⬜"} Aprovação no quiz final</li>
        </ul>
      `}

      ${state.certificado ? renderCertificado() : ""}
    </div>
  `;
}

function renderCertificado(){
  return `
    <div class="lash-divider"><div class="line"></div><span>✦</span><div class="line"></div></div>
    <div class="certificate" id="certificado-print">
      <div style="text-align:center;">
        <div class="eyebrow" style="letter-spacing:0.3em;">Lash Academy</div>
        <h2 class="font-display" style="font-size:1.6rem;margin:14px 0 2px;">Certificado de Conclusão</h2>
        <div style="font-size:0.95rem;color:var(--cinza);margin-bottom:22px;">Formação Profissional em Lash Designer</div>

        <p style="font-size:0.95rem;">Certificamos que</p>
        <div class="font-display" style="font-size:1.9rem;margin:6px 0 6px;color:var(--rosa-forte);">${escapeHtml(state.perfil.nome)}</div>
        <p style="font-size:0.95rem;max-width:480px;margin:0 auto 22px;">
          concluiu com aproveitamento a Formação Profissional Completa em Lash Designer,
          com carga horária de <strong>40 horas</strong>, contemplando técnicas de mapeamento,
          isolamento, aplicação, manutenção e precificação.
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:36px;flex-wrap:wrap;gap:20px;">
          <div style="text-align:left;font-size:0.78rem;color:var(--cinza);">
            <div>Código de autenticidade</div>
            <div style="font-weight:700;color:var(--preto);">${state.certificado.codigo}</div>
            <div style="margin-top:6px;">Emitido em ${state.certificado.data}</div>
          </div>

          ${qrDecorativoSVG(state.certificado.codigo)}

          <div style="text-align:center;">
            <div style="font-family:'Playfair Display',serif;font-style:italic;font-size:1.1rem;border-bottom:1px solid var(--preto);padding:0 24px 4px;">Instrutora Lash Academy</div>
            <div style="font-size:0.72rem;color:var(--cinza);margin-top:4px;">Assinatura da Instrutora</div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-print" style="margin-top:16px;">
      <button class="btn btn-primary" onclick="window.print()">Imprimir / Salvar em PDF</button>
    </div>
  `;
}

function qrDecorativoSVG(seed){
  // Padrão pseudo-aleatório decorativo baseado no código — não é um QR code escaneável.
  let hash = 0;
  for(let i=0;i<seed.length;i++){ hash = (hash*31 + seed.charCodeAt(i)) >>> 0; }
  const size = 7;
  let cells = "";
  for(let y=0;y<size;y++){
    for(let x=0;x<size;x++){
      hash = (hash * 1103515245 + 12345) >>> 0;
      if((hash >> 16) % 2 === 0){
        cells += `<rect x="${x*8}" y="${y*8}" width="7" height="7" fill="#221C1A"/>`;
      }
    }
  }
  return `<svg width="60" height="60" viewBox="0 0 56 56" style="flex-shrink:0;">${cells}</svg>`;
}

function attachPerfilEvents(){
  const btnSalvar = document.getElementById("btn-salvar-perfil");
  if(btnSalvar){
    btnSalvar.addEventListener("click", ()=>{
      const nome = document.getElementById("input-nome").value.trim();
      state.perfil.nome = nome || "Sua Aluna";
      saveState();
      showToast("Perfil atualizado");
      render();
    });
  }
  const btnEmitir = document.getElementById("btn-emitir-certificado");
  if(btnEmitir){
    btnEmitir.addEventListener("click", ()=>{
      const codigo = gerarCodigoAutenticidade();
      const data = new Date().toLocaleDateString("pt-BR");
      state.certificado = { codigo, data };
      saveState();
      unlockBadge("certificado");
      render();
    });
  }
}

function gerarCodigoAutenticidade(){
  const rand = Math.random().toString(36).slice(2,8).toUpperCase();
  const ts = Date.now().toString(36).toUpperCase().slice(-4);
  return `LA-${ts}-${rand}`;
}

/* ---------------- MODAL: Checkout unificado (Formação + Extras) + Pix real ----------------
   openCheckoutModal({ incluirFormacao, extraIdsPreSelecionados })
   - incluirFormacao (default true): inclui a Formação Profissional Completa no carrinho
   - extraIdsPreSelecionados: array de ids de COURSE_DATA.extras já marcados ao abrir
   openUpsellModal() continua existindo como atalho para o fluxo de upsell da Formação. */
function openCheckoutModal(opts){
  opts = opts || {};
  const incluirFormacao = opts.incluirFormacao !== false;
  const selecaoExtras = new Set(opts.extraIdsPreSelecionados || []);

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "checkout-overlay";

  let pollTimer = null;
  let countdownTimer = null;

  const precoFormacao = COURSE_DATA.formacao.preco;
  const precoOriginalFormacao = COURSE_DATA.formacao.precoOriginal;
  const promoDeadline = COURSE_DATA.formacao.promocaoValidaAte
    ? new Date(COURSE_DATA.formacao.promocaoValidaAte)
    : null;

  function bonusAutomaticoIds(){
    if(!incluirFormacao) return [];
    return COURSE_DATA.extras.filter(e => extraBonusAtivo(e) && !possuiExtra(e.id)).map(e => e.id);
  }
  function extrasCompraveis(){
    const bonusIds = bonusAutomaticoIds();
    return COURSE_DATA.extras.filter(e => !possuiExtra(e.id) && !bonusIds.includes(e.id));
  }
  function calcularTotal(){
    let total = incluirFormacao ? precoFormacao : 0;
    selecaoExtras.forEach(id=>{
      const e = COURSE_DATA.extras.find(x=>x.id===id);
      if(e) total += e.precoAvulso;
    });
    return total;
  }

  function stopPolling(){ if(pollTimer){ clearInterval(pollTimer); pollTimer = null; } }
  function stopCountdown(){ if(countdownTimer){ clearInterval(countdownTimer); countdownTimer = null; } }
  function fechar(){ stopPolling(); stopCountdown(); overlay.remove(); }

  function formatarContagem(diffMs){
    if(diffMs <= 0) return null;
    const totalSeg = Math.floor(diffMs / 1000);
    const dias = Math.floor(totalSeg / 86400);
    const horas = Math.floor((totalSeg % 86400) / 3600);
    const min = Math.floor((totalSeg % 3600) / 60);
    const seg = totalSeg % 60;
    const pad = n => String(n).padStart(2, "0");
    return dias > 0
      ? `${dias}d ${pad(horas)}h ${pad(min)}m`
      : `${pad(horas)}h ${pad(min)}m ${pad(seg)}s`;
  }

  function iniciarContagem(){
    if(!promoDeadline) return;
    const tick = () => {
      const diff = promoDeadline.getTime() - Date.now();
      const texto = formatarContagem(diff);
      const alvo = overlay.querySelector("#contagem-promo");
      if(!alvo) { stopCountdown(); return; }
      if(!texto){
        alvo.textContent = "Condição promocional encerrada";
        stopCountdown();
        return;
      }
      alvo.textContent = `Condição especial expira em ${texto}`;
    };
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  function paintIntro(){
    stopCountdown();
    const nomeAtual = (state.perfil.nome && state.perfil.nome !== "Sua Aluna") ? state.perfil.nome : "";
    const bonusIds = bonusAutomaticoIds();
    const bonusExtras = COURSE_DATA.extras.filter(e => bonusIds.includes(e.id));
    const compraveis = extrasCompraveis();
    const total = calcularTotal();
    const totalFormatado = formatarPreco(total);
    const precoFormacaoFormatado = formatarPreco(precoFormacao);
    const precoOriginalFormatado = precoOriginalFormacao ? formatarPreco(precoOriginalFormacao) : null;
    const desconto = precoOriginalFormacao ? Math.round((1 - precoFormacao / precoOriginalFormacao) * 100) : 0;

    overlay.innerHTML = `
      <div class="modal-box" style="max-width:480px;max-height:88vh;overflow:auto;">
        <button class="modal-close" aria-label="Fechar">✕</button>
        ${incluirFormacao ? `
          <div class="eyebrow">Você domina a teoria!</div>
          <h2 class="font-display" style="margin:8px 0 14px;">Libere a Formação Profissional Completa</h2>
          <p style="color:var(--cinza);line-height:1.6;">
            Isolamento perfeito, química da cola para retenção de 30 dias, mapeamentos avançados
            e <strong>certificado oficial</strong> de 40h.
          </p>
        ` : `
          <div class="eyebrow">Seu carrinho</div>
          <h2 class="font-display" style="margin:8px 0 14px;">Finalizar compra</h2>
        `}

        <div style="background:var(--nude);border-radius:14px;padding:16px 18px;margin-bottom:18px;">
          ${incluirFormacao ? `
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
              <span>${COURSE_DATA.formacao.descricao}</span>
              <span style="text-align:right;white-space:nowrap;">
                ${precoOriginalFormatado ? `<span style="font-size:0.8rem;color:var(--cinza);text-decoration:line-through;margin-right:6px;">${precoOriginalFormatado}</span>` : ""}
                <strong>${precoFormacaoFormatado}</strong>
              </span>
            </div>
            ${desconto > 0 ? `<div style="margin-top:6px;"><span style="background:var(--rosa-forte);color:var(--branco);font-size:0.72rem;font-weight:700;padding:3px 10px;border-radius:999px;">-${desconto}% hoje</span></div>` : ""}
          ` : ""}

          ${bonusExtras.map(e => `
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:10px;padding-top:10px;border-top:1px dashed rgba(34,28,26,0.15);">
              <span>🎁 ${e.nome} <span style="color:var(--rosa-forte);font-size:0.76rem;">(bônus grátis)</span></span>
              <strong style="color:var(--rosa-forte);white-space:nowrap;">Grátis</strong>
            </div>
          `).join("")}

          ${compraveis.map(e => `
            <label style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:10px;padding-top:10px;border-top:1px dashed rgba(34,28,26,0.15);cursor:pointer;">
              <span style="display:flex;align-items:center;gap:8px;">
                <input type="checkbox" data-modal-extra="${e.id}" ${selecaoExtras.has(e.id) ? "checked":""}>
                ${e.nome}
              </span>
              <strong style="white-space:nowrap;">+ ${formatarPreco(e.precoAvulso)}</strong>
            </label>
          `).join("")}

          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:14px;padding-top:12px;border-top:1.5px solid var(--preto);">
            <span style="font-weight:700;">Total</span>
            <span class="font-display" style="font-size:1.7rem;color:var(--rosa-forte);">${totalFormatado}</span>
          </div>
          <div style="font-size:0.78rem;color:var(--cinza);margin-top:4px;">pagamento único via Pix · acesso liberado na hora</div>
          ${incluirFormacao && promoDeadline ? `<div id="contagem-promo" style="font-size:0.82rem;color:var(--rosa-forte);font-weight:600;margin-top:8px;">calculando...</div>` : ""}
        </div>

        <label style="font-size:0.85rem;font-weight:600;display:block;margin-bottom:6px;">
          Seu nome completo ${incluirFormacao ? `<span style="font-weight:400;color:var(--cinza);">(vai aparecer no seu certificado)</span>` : ""}
        </label>
        <input id="input-nome-checkout" type="text" placeholder="Digite seu nome completo aqui"
               value="${escapeHtml(nomeAtual)}"
               style="width:100%;padding:12px 14px;border-radius:10px;border:1.5px solid rgba(34,28,26,0.15);margin-bottom:18px;font-size:0.95rem;">

        <button class="btn btn-gold" id="btn-gerar-pix" style="width:100%;" ${total <= 0 ? "disabled" : ""}>
          Pagar ${totalFormatado} com Pix →
        </button>
        <p style="font-size:0.72rem;color:var(--cinza);margin-top:10px;text-align:center;">
          ${incluirFormacao ? "Sua vaga na condição promocional fica reservada só para hoje." : "Seu acesso é liberado automaticamente após a confirmação do Pix."}
        </p>
      </div>
    `;

    overlay.querySelector(".modal-close").addEventListener("click", fechar);
    overlay.querySelectorAll("[data-modal-extra]").forEach(chk=>{
      chk.addEventListener("change", ()=>{
        const id = chk.dataset.modalExtra;
        if(chk.checked) selecaoExtras.add(id); else selecaoExtras.delete(id);
        paintIntro(); // repinta com o novo total
      });
    });
    overlay.querySelector("#btn-gerar-pix").addEventListener("click", () => {
      const nomeInput = overlay.querySelector("#input-nome-checkout");
      const nome = (nomeInput.value || "").trim();
      if(!nome){
        nomeInput.style.borderColor = "var(--rosa-forte)";
        nomeInput.focus();
        showToast("Digite seu nome completo para continuar");
        return;
      }
      state.perfil.nome = nome;
      saveState();
      gerarPix();
    });
    if(incluirFormacao) iniciarContagem();
  }

  function paintCarregando(){
    stopCountdown();
    overlay.innerHTML = `
      <div class="modal-box" style="text-align:center;">
        <button class="modal-close" aria-label="Fechar">✕</button>
        <div class="eyebrow">Gerando cobrança</div>
        <h2 class="font-display" style="margin:10px 0;">Preparando seu Pix...</h2>
        <p style="color:var(--cinza);">Isso leva só alguns segundos.</p>
      </div>
    `;
    overlay.querySelector(".modal-close").addEventListener("click", fechar);
  }

  function paintErro(msg){
    overlay.innerHTML = `
      <div class="modal-box">
        <button class="modal-close" aria-label="Fechar">✕</button>
        <div class="eyebrow">Não foi possível gerar o Pix</div>
        <h2 class="font-display" style="margin:10px 0;">Ocorreu um erro</h2>
        <p style="color:var(--cinza);line-height:1.6;">${escapeHtml(msg)}</p>
        <button class="btn btn-primary" id="btn-tentar-novamente" style="width:100%;margin-top:10px;">Tentar novamente</button>
      </div>
    `;
    overlay.querySelector(".modal-close").addEventListener("click", fechar);
    overlay.querySelector("#btn-tentar-novamente").addEventListener("click", paintIntro);
  }

  function paintAguardando(pix){
    const totalFormatado = formatarPreco(calcularTotal());
    overlay.innerHTML = `
      <div class="modal-box" style="text-align:center;max-width:420px;">
        <button class="modal-close" aria-label="Fechar">✕</button>
        <div class="eyebrow">Escaneie ou copie o código</div>
        <h2 class="font-display" style="margin:8px 0 4px;">Pague ${totalFormatado} via Pix</h2>
        <p id="status-texto" style="color:var(--cinza);font-size:0.88rem;margin-bottom:16px;">
          <span class="pix-pulse"></span> Aguardando confirmação do pagamento...
        </p>

        <img src="data:image/png;base64,${pix.qr_code_base64}" alt="QR Code Pix" style="width:200px;height:200px;margin:0 auto 16px;border-radius:12px;border:1px solid rgba(34,28,26,0.1);">

        <label style="font-size:0.78rem;font-weight:600;display:block;margin-bottom:6px;">Pix copia e cola</label>
        <div style="display:flex;gap:8px;margin-bottom:10px;">
          <input id="pix-copia-cola" readonly value="${escapeHtml(pix.qr_code)}" style="flex:1;min-width:0;padding:10px 12px;border-radius:10px;border:1.5px solid rgba(34,28,26,0.15);font-size:0.78rem;">
          <button class="btn btn-outline" id="btn-copiar-pix" style="flex-shrink:0;">Copiar</button>
        </div>
        <p style="font-size:0.72rem;color:var(--cinza);">O acesso é liberado automaticamente assim que o pagamento for confirmado — não é preciso fazer nada aqui.</p>
      </div>
    `;
    overlay.querySelector(".modal-close").addEventListener("click", fechar);
    overlay.querySelector("#btn-copiar-pix").addEventListener("click", async ()=>{
      try{
        await navigator.clipboard.writeText(pix.qr_code);
        showToast("Código Pix copiado!");
      }catch(e){
        overlay.querySelector("#pix-copia-cola").select();
        showToast("Selecione e copie o código");
      }
    });

    pollTimer = setInterval(async ()=>{
      try{
        const r = await fetch(`/api/status-pagamento?id=${encodeURIComponent(pix.id)}`);
        const dados = await r.json();
        if(!r.ok){ return; }
        if(dados.status === "approved"){
          stopPolling();
          if(incluirFormacao){
            state.pago = true;
            unlockBadge("desbloqueou_formacao");
          }
          const bonusIds = bonusAutomaticoIds();
          const idsLiberados = [...new Set([...bonusIds, ...selecaoExtras])];
          idsLiberados.forEach(id=>{
            if(!state.extrasComprados.includes(id)) state.extrasComprados.push(id);
          });
          carrinhoExtras.clear();
          saveState();
          paintSucesso();
          render();
        }else if(["rejected","cancelled"].includes(dados.status)){
          stopPolling();
          paintErro("O pagamento foi cancelado ou recusado. Gere um novo Pix para tentar de novo.");
        }
      }catch(e){ /* mantém tentando no próximo intervalo */ }
    }, 4000);
  }

  function paintSucesso(){
    overlay.innerHTML = `
      <div class="modal-box" style="text-align:center;">
        <button class="modal-close" aria-label="Fechar">✕</button>
        <div style="font-size:2.4rem;">🎉</div>
        <h2 class="font-display" style="margin:10px 0;">Pagamento confirmado!</h2>
        <p style="color:var(--cinza);">${incluirFormacao ? "A Formação Profissional Completa já está liberada no seu acesso." : "Seus itens já estão disponíveis na aba Extras."}</p>
        <button class="btn btn-gold" id="btn-fechar-sucesso" style="width:100%;margin-top:16px;">Continuar</button>
      </div>
    `;
    overlay.querySelector(".modal-close").addEventListener("click", fechar);
    overlay.querySelector("#btn-fechar-sucesso").addEventListener("click", fechar);
  }

  async function gerarPix(){
    paintCarregando();
    const total = calcularTotal();
    const itens = [
      ...(incluirFormacao ? ["formacao"] : []),
      ...bonusAutomaticoIds(),
      ...[...selecaoExtras]
    ];
    try{
      const resp = await fetch("/api/criar-pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: state.perfil.nome, valor: total, itens })
      });
      const dados = await resp.json();
      if(!resp.ok){
        paintErro(dados.error || "Não foi possível gerar a cobrança Pix agora.");
        return;
      }
      paintAguardando(dados);
    }catch(e){
      paintErro("Não foi possível conectar ao servidor de pagamentos. Verifique sua conexão e tente novamente.");
    }
  }

  document.body.appendChild(overlay);
  paintIntro();
  overlay.addEventListener("click", (e)=>{ if(e.target === overlay) fechar(); });
}

// Atalho mantido por compatibilidade — usado em toda a base de código sempre que
// uma aula paga é bloqueada, ou o botão "Liberar Formação Completa" é clicado.
function openUpsellModal(){
  openCheckoutModal({ incluirFormacao: true });
}

/* ---------------- MODAL: Quiz ---------------- */
function openQuizModal(moduloKey){
  const quiz = COURSE_DATA.quizzes[moduloKey];
  let respostas = new Array(quiz.perguntas.length).fill(null);
  let corrigido = false;

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  function renderQuizBody(){
    return `
      <div class="modal-box" style="max-width:560px;max-height:85vh;overflow:auto;">
        <button class="modal-close" aria-label="Fechar">✕</button>
        <div class="eyebrow">Quiz de fixação</div>
        <h2 class="font-display" style="margin:6px 0 16px;">${quiz.titulo}</h2>
        ${quiz.perguntas.map((p, qi)=>`
          <div style="margin-bottom:20px;">
            <p style="font-weight:600;margin-bottom:8px;">${qi+1}. ${p.pergunta}</p>
            ${p.opcoes.map((op, oi)=>{
              let cls = "quiz-option";
              if(respostas[qi] === oi) cls += " selected";
              if(corrigido){
                if(oi === p.correta) cls += " correct";
                else if(respostas[qi] === oi) cls += " wrong";
              }
              return `<button class="${cls}" data-q="${qi}" data-o="${oi}" ${corrigido ? "disabled":""}>${op}</button>`;
            }).join("")}
          </div>
        `).join("")}
        <div id="quiz-feedback"></div>
        ${!corrigido ? `<button class="btn btn-primary" id="btn-corrigir" style="width:100%;">Corrigir respostas</button>` : `<button class="btn btn-gold" id="btn-fechar-quiz" style="width:100%;">Fechar</button>`}
      </div>
    `;
  }

  function paint(){
    overlay.innerHTML = renderQuizBody();
    overlay.querySelector(".modal-close").addEventListener("click", ()=> overlay.remove());
    overlay.querySelectorAll(".quiz-option").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        respostas[parseInt(btn.dataset.q)] = parseInt(btn.dataset.o);
        paint();
      });
    });
    const btnCorrigir = overlay.querySelector("#btn-corrigir");
    if(btnCorrigir){
      btnCorrigir.addEventListener("click", ()=>{
        if(respostas.includes(null)){
          showToast("Responda todas as perguntas antes de corrigir");
          return;
        }
        corrigido = true;
        const acertos = respostas.filter((r,i)=> r === quiz.perguntas[i].correta).length;
        const pctAcerto = acertos / quiz.perguntas.length;
        paint();
        const fb = overlay.querySelector("#quiz-feedback");
        if(pctAcerto >= 0.7){
          fb.innerHTML = `<div style="background:#F2F8EC;border-radius:12px;padding:12px 16px;margin-bottom:14px;">Você acertou ${acertos}/${quiz.perguntas.length}! Quiz aprovado.</div>`;
          if(!state.quizzesAprovados.includes(moduloKey)){
            state.quizzesAprovados.push(moduloKey);
            saveState();
            addXP(100);
          }
        }else{
          fb.innerHTML = `<div style="background:#FBF0F0;border-radius:12px;padding:12px 16px;margin-bottom:14px;">Você acertou ${acertos}/${quiz.perguntas.length}. É preciso 70% para aprovação — revise a aula e tente novamente.</div>`;
        }
      });
    }
    const btnFechar = overlay.querySelector("#btn-fechar-quiz");
    if(btnFechar) btnFechar.addEventListener("click", ()=>{ overlay.remove(); render(); });
  }

  document.body.appendChild(overlay);
  paint();
  overlay.addEventListener("click", (e)=>{ if(e.target === overlay) overlay.remove(); });
}

/* ---------------- Utils ---------------- */
function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function toggleMobileSidebar(){
  document.getElementById("sidebar").classList.toggle("mobile-open");
}
