// ============================================================
// DIAGNÓSTICO DE MADUREZ EMPRESARIAL — Los Elegidos Colombia
// diagnostico.js
// ============================================================

// ── ÁREAS Y PREGUNTAS ─────────────────────────────────────
const DIAG_AREAS = [
  {
    id: 'estrategia',
    nombre: 'Estrategia y Dirección',
    icono: 'fa-chess-king',
    color: '#c9a84c',
    preguntas: [
      '¿La empresa tiene una visión y misión claramente definidas y comunicadas a todo el equipo?',
      '¿Existe un plan estratégico formal con objetivos medibles para los próximos 1 a 3 años?',
      '¿La gerencia revisa periódicamente el avance hacia los objetivos estratégicos?',
      '¿Las decisiones importantes se toman basadas en datos e información confiable?',
      '¿La empresa tiene claramente identificadas sus ventajas competitivas frente al mercado?'
    ]
  },
  {
    id: 'finanzas',
    nombre: 'Finanzas y Control',
    icono: 'fa-coins',
    color: '#3b6bfa',
    preguntas: [
      '¿La empresa genera estados financieros mensuales confiables y los analiza con regularidad?',
      '¿Se proyecta y controla el flujo de caja con al menos 3 meses de anticipación?',
      '¿Se conoce la rentabilidad real por producto, cliente o línea de negocio?',
      '¿La estructura de costos está definida, actualizada y es conocida por la gerencia?',
      '¿Las finanzas de la empresa están separadas claramente de las del propietario?'
    ]
  },
  {
    id: 'ventas',
    nombre: 'Ventas y Mercadeo',
    icono: 'fa-chart-line',
    color: '#00d4ff',
    preguntas: [
      '¿Existe un proceso comercial definido y seguido de forma consistente por el equipo de ventas?',
      '¿Se hace seguimiento sistematizado a los prospectos y oportunidades en el pipeline?',
      '¿La empresa mide su tasa de conversión y el costo de adquisición de clientes?',
      '¿Existe una estrategia de mercadeo activa con presupuesto y objetivos definidos?',
      '¿Las metas comerciales son claras, medibles y conocidas por todo el equipo?'
    ]
  },
  {
    id: 'operaciones',
    nombre: 'Operaciones y Procesos',
    icono: 'fa-gears',
    color: '#8b5cf6',
    preguntas: [
      '¿Los procesos críticos de la empresa están documentados, estandarizados y actualizados?',
      '¿La operación puede funcionar correctamente sin la presencia constante del gerente?',
      '¿Se miden indicadores de eficiencia operativa como tiempos, errores y productividad?',
      '¿Existe un sistema de gestión de calidad o mejora continua en la operación?',
      '¿Los empleados conocen claramente sus responsabilidades y los procedimientos de su cargo?'
    ]
  },
  {
    id: 'talento',
    nombre: 'Talento Humano',
    icono: 'fa-users',
    color: '#10b981',
    preguntas: [
      '¿La empresa tiene procesos estructurados de selección, contratación y onboarding?',
      '¿Existen planes formales de capacitación y desarrollo profesional para el equipo?',
      '¿Se realizan evaluaciones de desempeño periódicas con indicadores claros?',
      '¿La rotación de personal clave es baja y la empresa retiene su talento esencial?',
      '¿La empresa tiene una propuesta de valor diferenciadora para sus colaboradores?'
    ]
  },
  {
    id: 'tecnologia',
    nombre: 'Tecnología e Innovación',
    icono: 'fa-microchip',
    color: '#f59e0b',
    preguntas: [
      '¿La empresa utiliza sistemas digitales centralizados para gestionar su operación?',
      '¿La información del negocio está centralizada y no dispersa en Excel, WhatsApp u otras fuentes?',
      '¿Se han automatizado procesos o tareas repetitivas para mejorar la eficiencia del equipo?',
      '¿La empresa evalúa y adopta regularmente tecnologías que mejoran su competitividad?',
      '¿La seguridad de la información y los datos del negocio está garantizada?'
    ]
  },
  {
    id: 'indicadores',
    nombre: 'Indicadores y Datos',
    icono: 'fa-chart-pie',
    color: '#ef4444',
    preguntas: [
      '¿La empresa tiene un tablero de indicadores clave (KPIs) actualizado de forma regular?',
      '¿Los KPIs están definidos para todas las áreas críticas del negocio?',
      '¿La información gerencial está disponible en tiempo real o casi en tiempo real?',
      '¿Las decisiones gerenciales se fundamentan en datos concretos y no solo en intuición?',
      '¿Los informes periódicos generan acciones concretas y planes de mejora?'
    ]
  },
  {
    id: 'clientes',
    nombre: 'Clientes y Experiencia',
    icono: 'fa-star',
    color: '#06b6d4',
    preguntas: [
      '¿Se mide la satisfacción del cliente de forma sistemática y periódica?',
      '¿La empresa tiene una estrategia activa de retención y fidelización de clientes?',
      '¿Las quejas y reclamos se gestionan con un proceso claro y tiempos de respuesta definidos?',
      '¿Se realiza seguimiento post-venta a los clientes de forma regular?',
      '¿La empresa conoce el valor del ciclo de vida de sus clientes y lo gestiona activamente?'
    ]
  }
];

// ── NIVELES DE MADUREZ ────────────────────────────────────
const DIAG_NIVELES = [
  {
    id: 'informal',
    label: 'Informal',
    rango: [1.0, 1.9],
    color: '#ef4444',
    descripcion: 'Tu empresa opera de forma reactiva e informal. La gestión depende de personas clave y hay grandes oportunidades de estructuración. Este es el momento ideal para construir las bases.'
  },
  {
    id: 'basico',
    label: 'Básico',
    rango: [2.0, 2.9],
    color: '#f59e0b',
    descripcion: 'Existe conciencia de la necesidad de estructura, pero los sistemas son fragmentados e inconsistentes. Con un plan claro puedes avanzar rápidamente al siguiente nivel.'
  },
  {
    id: 'estructurado',
    label: 'Estructurado',
    rango: [3.0, 3.5],
    color: '#3b6bfa',
    descripcion: 'Tu empresa tiene bases sólidas. Los procesos existen y se siguen, pero la integración y la sistematización aún pueden mejorar para lograr mayor eficiencia y control.'
  },
  {
    id: 'gestionado',
    label: 'Gestionado',
    rango: [3.6, 4.2],
    color: '#10b981',
    descripcion: 'Tienes una gestión madura y sistemas que funcionan. Los datos guían decisiones y los procesos son confiables. Estás listo para optimizar y escalar con mayor velocidad.'
  },
  {
    id: 'escalable',
    label: 'Escalable',
    rango: [4.3, 5.0],
    color: '#c9a84c',
    descripcion: 'Tu empresa opera con excelencia. Cuentas con los sistemas necesarios para crecer de forma sostenible, controlada y con capacidad de replicar tu modelo a mayor escala.'
  }
];

// ── RECOMENDACIONES POR NIVEL ─────────────────────────────
const DIAG_RECOMENDACIONES = {
  informal: [
    'Documenta los 3 procesos más críticos de la empresa esta semana.',
    'Separa de inmediato las finanzas personales de las empresariales.',
    'Define la visión y el norte estratégico junto a tu equipo directivo.',
    'Establece reuniones semanales de seguimiento con al menos 3 indicadores básicos.',
    'Identifica a las personas clave de las que depende la operación y transfiere su conocimiento.'
  ],
  basico: [
    'Consolida toda la información del negocio en una sola plataforma o sistema.',
    'Implementa un dashboard básico con 5 a 10 KPIs fundamentales para la gerencia.',
    'Estandariza los procesos comerciales y operativos con manuales sencillos y prácticos.',
    'Establece metas trimestrales medibles y visibles para cada área del negocio.',
    'Asigna un responsable claro para cada proceso o área crítica de la empresa.'
  ],
  estructurado: [
    'Integra tus sistemas de información para eliminar datos dispersos y duplicados.',
    'Automatiza la generación de reportes e indicadores para ahorrar tiempo gerencial.',
    'Diseña un plan de capacitación formal y continuo para el equipo.',
    'Migra de la gestión reactiva a la gestión por objetivos con OKRs trimestrales.',
    'Implementa una revisión mensual de resultados con compromisos de mejora concretos.'
  ],
  gestionado: [
    'Instala una cultura de datos y mejora continua en toda la organización.',
    'Explora automatización avanzada e inteligencia artificial en tus procesos de mayor volumen.',
    'Desarrolla el liderazgo de segundo nivel para reducir la dependencia del gerente.',
    'Diseña un plan de expansión o escalabilidad respaldado por tus datos de desempeño.',
    'Evalúa la implementación de gobierno corporativo para una gestión más profesional.'
  ],
  escalable: [
    'Consolida tu ventaja competitiva con innovación y diferenciación constante.',
    'Explora nuevos mercados o líneas de negocio apoyado en análisis de datos avanzado.',
    'Implementa un gobierno corporativo formal con comités y políticas claras.',
    'Invierte en tecnología de punta que multiplique tu capacidad operativa actual.',
    'Diseña un modelo de franquicia, replicación o expansión basado en tus procesos documentados.'
  ]
};

// ── ESCALA DESCRIPTIVA ────────────────────────────────────
const DIAG_ESCALA = [
  { val: 1, label: 'Muy bajo',  desc: 'No existe / Nunca' },
  { val: 2, label: 'Bajo',      desc: 'Incipiente / Rara vez' },
  { val: 3, label: 'Medio',     desc: 'En proceso / A veces' },
  { val: 4, label: 'Bueno',     desc: 'Establecido / Frecuente' },
  { val: 5, label: 'Óptimo',    desc: 'Excelente / Siempre' }
];

// ── SECTORES ──────────────────────────────────────────────
const DIAG_SECTORES = [
  'Retail / Puntos de venta', 'Manufactura', 'Textil', 'Servicios profesionales',
  'E-commerce', 'Empresa familiar', 'Agroindustria', 'Construcción',
  'Salud y bienestar', 'Educación', 'Alimentos y bebidas', 'Tecnología', 'Otro'
];

// ── ESTADO ────────────────────────────────────────────────
let diagState = {
  step: 0,
  reg: { nombre: '', empresa: '', cargo: '', sector: '' },
  answers: {},
  radarChart: null
};

// ── UTILIDADES ────────────────────────────────────────────
function calcAreaScore(idx) {
  const ans = diagState.answers[idx];
  if (!ans || ans.length < 5) return 0;
  return ans.reduce((a, b) => a + b, 0) / 5;
}

function calcOverallScore() {
  let total = 0;
  for (let i = 0; i < 8; i++) total += calcAreaScore(i);
  return total / 8;
}

function getNivelByScore(score) {
  const found = DIAG_NIVELES.find(n => score >= n.rango[0] && score <= n.rango[1]);
  if (found) return found;
  return score < 1.0 ? DIAG_NIVELES[0] : DIAG_NIVELES[4];
}

function getStrengths() {
  return DIAG_AREAS.filter((_, i) => calcAreaScore(i) >= 3.6);
}

function getGaps() {
  return DIAG_AREAS.filter((_, i) => calcAreaScore(i) < 2.5);
}

function fmtScore(n) { return n.toFixed(1); }

function isAreaComplete(idx) {
  const ans = diagState.answers[idx];
  return ans && ans.filter(v => v > 0).length === 5;
}

// ── MODAL: APERTURA / CIERRE ──────────────────────────────
function openDiagnostico() {
  diagState = {
    step: 0,
    reg: { nombre: '', empresa: '', cargo: '', sector: '' },
    answers: {},
    radarChart: null
  };
  document.getElementById('diagOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  diagRender();
}

function closeDiagnostico() {
  document.getElementById('diagOverlay').classList.remove('active');
  document.body.style.overflow = '';
  if (diagState.radarChart) {
    diagState.radarChart.destroy();
    diagState.radarChart = null;
  }
}

// ── PROGRESO ──────────────────────────────────────────────
function updateProgress() {
  const total = 10;
  const pct = Math.round((diagState.step / total) * 100);
  const fill = document.getElementById('diagProgressFill');
  const label = document.getElementById('diagStepLabel');
  if (fill) fill.style.width = pct + '%';
  if (label) {
    if (diagState.step === 0) label.textContent = 'Registro · Paso 1 de 10';
    else if (diagState.step <= 8) label.textContent = `Área ${diagState.step} de 8 · Paso ${diagState.step + 1} de 10`;
    else label.textContent = 'Resultados · Diagnóstico completo';
  }
}

// ── RENDER PRINCIPAL ──────────────────────────────────────
function diagRender() {
  updateProgress();
  const content = document.getElementById('diagContent');
  if (!content) return;

  if (diagState.step === 0) {
    content.innerHTML = renderRegistrationHTML();
    initRegistrationListeners();
  } else if (diagState.step >= 1 && diagState.step <= 8) {
    content.innerHTML = renderAreaHTML(diagState.step - 1);
    initAreaListeners(diagState.step - 1);
  } else {
    content.innerHTML = renderResultsHTML();
    setTimeout(() => {
      renderRadarChart();
      initResultsListeners();
    }, 120);
  }

  content.scrollTop = 0;
}

// ── PASO 0: REGISTRO ──────────────────────────────────────
function renderRegistrationHTML() {
  const sectoresHTML = DIAG_SECTORES.map(s =>
    `<option value="${s}"${diagState.reg.sector === s ? ' selected' : ''}>${s}</option>`
  ).join('');

  return `
    <div class="diag-step diag-step--reg">
      <div class="diag-step-header">
        <div class="diag-step-icon">
          <i class="fas fa-building"></i>
        </div>
        <div>
          <h2>Datos de la empresa</h2>
          <p>El diagnóstico es completamente gratuito y confidencial. Tus datos nunca son compartidos.</p>
        </div>
      </div>

      <div class="diag-reg-form">
        <div class="diag-form-row">
          <div class="diag-form-group">
            <label>Nombre completo <span class="req">*</span></label>
            <input type="text" id="dRegNombre" placeholder="Tu nombre" value="${diagState.reg.nombre}">
          </div>
          <div class="diag-form-group">
            <label>Empresa <span class="req">*</span></label>
            <input type="text" id="dRegEmpresa" placeholder="Nombre de tu empresa" value="${diagState.reg.empresa}">
          </div>
        </div>
        <div class="diag-form-row">
          <div class="diag-form-group">
            <label>Cargo <span class="req">*</span></label>
            <input type="text" id="dRegCargo" placeholder="Gerente, Director, Dueño..." value="${diagState.reg.cargo}">
          </div>
          <div class="diag-form-group">
            <label>Sector</label>
            <select id="dRegSector">
              <option value="">Selecciona tu sector</option>
              ${sectoresHTML}
            </select>
          </div>
        </div>
        <div id="dRegError" class="diag-error" style="display:none;">
          <i class="fas fa-triangle-exclamation"></i> Por favor completa los campos obligatorios.
        </div>
      </div>

      <div class="diag-areas-preview">
        <p class="diag-areas-preview-label">Este diagnóstico evaluará 8 áreas críticas de tu empresa:</p>
        <div class="diag-areas-chips">
          ${DIAG_AREAS.map(a => `
            <div class="diag-area-chip">
              <i class="fas ${a.icono}" style="color:${a.color}"></i>
              <span>${a.nombre}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="diag-nav">
        <div></div>
        <button class="btn-diag-primary" id="dRegNext">
          Comenzar diagnóstico <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;
}

function initRegistrationListeners() {
  document.getElementById('dRegNext').addEventListener('click', () => {
    const nombre  = document.getElementById('dRegNombre').value.trim();
    const empresa = document.getElementById('dRegEmpresa').value.trim();
    const cargo   = document.getElementById('dRegCargo').value.trim();
    const sector  = document.getElementById('dRegSector').value;
    const errEl   = document.getElementById('dRegError');

    if (!nombre || !empresa || !cargo) {
      errEl.style.display = 'flex';
      return;
    }
    errEl.style.display = 'none';
    diagState.reg = { nombre, empresa, cargo, sector };
    diagState.step = 1;
    diagRender();
  });
}

// ── PASOS 1-8: ÁREAS ──────────────────────────────────────
function renderAreaHTML(areaIdx) {
  const area    = DIAG_AREAS[areaIdx];
  const answers = diagState.answers[areaIdx] || [0, 0, 0, 0, 0];

  const questionsHTML = area.preguntas.map((pregunta, qIdx) => {
    const val = answers[qIdx] || 0;
    const scaleHTML = DIAG_ESCALA.map(s => `
      <button
        class="diag-scale-btn${val === s.val ? ' selected' : ''}"
        data-q="${qIdx}"
        data-val="${s.val}"
        title="${s.desc}"
        ${val === s.val ? `style="--btn-color:${area.color}"` : ''}
      >
        <span class="dsb-num">${s.val}</span>
        <span class="dsb-label">${s.label}</span>
      </button>
    `).join('');

    return `
      <div class="diag-question${val > 0 ? ' answered' : ''}">
        <div class="diag-q-num">${qIdx + 1}</div>
        <div class="diag-q-body">
          <p class="diag-q-text">${pregunta}</p>
          <div class="diag-scale">${scaleHTML}</div>
          <div class="diag-scale-labels">
            <span>No existe</span>
            <span>Excelente</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const isComplete = isAreaComplete(areaIdx);

  return `
    <div class="diag-step diag-step--area">
      <div class="diag-step-header">
        <div class="diag-step-icon" style="background:${area.color}22; color:${area.color}">
          <i class="fas ${area.icono}"></i>
        </div>
        <div>
          <span class="diag-area-tag">Área ${areaIdx + 1} de 8</span>
          <h2>${area.nombre}</h2>
        </div>
      </div>

      <div class="diag-questions-wrap">
        ${questionsHTML}
      </div>

      <div class="diag-answer-hint${isComplete ? ' complete' : ''}">
        ${isComplete
          ? '<i class="fas fa-circle-check"></i> Todas las preguntas respondidas'
          : '<i class="fas fa-circle-info"></i> Responde las 5 preguntas para continuar'
        }
      </div>

      <div class="diag-nav">
        <button class="btn-diag-secondary" id="dAreaPrev">
          <i class="fas fa-arrow-left"></i> ${areaIdx === 0 ? 'Volver al registro' : 'Área anterior'}
        </button>
        <button class="btn-diag-primary${!isComplete ? ' disabled' : ''}" id="dAreaNext"${!isComplete ? ' disabled' : ''}>
          ${areaIdx === 7
            ? 'Ver resultados <i class="fas fa-chart-line"></i>'
            : 'Siguiente área <i class="fas fa-arrow-right"></i>'
          }
        </button>
      </div>
    </div>
  `;
}

function initAreaListeners(areaIdx) {
  document.getElementById('dAreaPrev').addEventListener('click', () => {
    diagState.step--;
    diagRender();
  });

  document.getElementById('dAreaNext').addEventListener('click', () => {
    if (!isAreaComplete(areaIdx)) return;
    diagState.step++;
    diagRender();
  });

  document.querySelectorAll('.diag-scale-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qIdx = parseInt(btn.dataset.q);
      const val  = parseInt(btn.dataset.val);

      if (!diagState.answers[areaIdx]) diagState.answers[areaIdx] = [0, 0, 0, 0, 0];
      diagState.answers[areaIdx][qIdx] = val;

      // Update UI for just this question row
      const row = btn.closest('.diag-question');
      row.querySelectorAll('.diag-scale-btn').forEach(b => {
        b.classList.remove('selected');
        b.style.removeProperty('--btn-color');
      });
      btn.classList.add('selected');
      btn.style.setProperty('--btn-color', DIAG_AREAS[areaIdx].color);
      row.classList.add('answered');

      // Enable next button if all answered
      if (isAreaComplete(areaIdx)) {
        const nextBtn = document.getElementById('dAreaNext');
        const hint    = document.querySelector('.diag-answer-hint');
        nextBtn.disabled = false;
        nextBtn.classList.remove('disabled');
        if (hint) {
          hint.classList.add('complete');
          hint.innerHTML = '<i class="fas fa-circle-check"></i> Todas las preguntas respondidas';
        }
      }
    });
  });
}

// ── PASO 9: RESULTADOS ────────────────────────────────────
function renderResultsHTML() {
  const overall  = calcOverallScore();
  const nivel    = getNivelByScore(overall);
  const strengths = getStrengths();
  const gaps      = getGaps();
  const recs      = DIAG_RECOMENDACIONES[nivel.id];

  const circumference = 2 * Math.PI * 54;
  const dashOffset    = circumference * (1 - (overall - 1) / 4);

  const areaScoresHTML = DIAG_AREAS.map((area, i) => {
    const score    = calcAreaScore(i);
    const areaNiv  = getNivelByScore(score);
    const pct      = Math.max(0, ((score - 1) / 4) * 100);
    return `
      <div class="diag-area-row">
        <div class="diag-area-row-left">
          <i class="fas ${area.icono}" style="color:${area.color}"></i>
          <span>${area.nombre}</span>
        </div>
        <div class="diag-area-row-bar">
          <div class="diag-area-bar-fill" style="width:${pct}%;background:${area.color}"></div>
        </div>
        <span class="diag-area-row-score" style="color:${area.color}">${fmtScore(score)}</span>
        <span class="diag-area-row-level" style="color:${areaNiv.color}">${areaNiv.label}</span>
      </div>
    `;
  }).join('');

  const strengthsHTML = strengths.length > 0
    ? strengths.map(a => `<li><i class="fas fa-circle-check"></i> ${a.nombre} <em>(${fmtScore(calcAreaScore(DIAG_AREAS.indexOf(a)))})</em></li>`).join('')
    : '<li class="empty"><i class="fas fa-info-circle"></i> Sigue fortaleciendo todas las áreas para alcanzar el nivel Gestionado.</li>';

  const gapsHTML = gaps.length > 0
    ? gaps.map(a => `<li><i class="fas fa-circle-exclamation"></i> ${a.nombre} <em>(${fmtScore(calcAreaScore(DIAG_AREAS.indexOf(a)))})</em></li>`).join('')
    : '<li class="empty"><i class="fas fa-circle-check"></i> ¡No se detectaron brechas críticas! Excelente nivel de madurez.</li>';

  const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

  return `
    <div class="diag-step diag-step--results" id="diagResultsPanel">

      <div class="diag-results-header">
        <div class="diag-results-company">
          <i class="fas fa-building"></i>
          <div>
            <strong>${diagState.reg.empresa || 'Tu empresa'}</strong>
            <span>${diagState.reg.nombre}${diagState.reg.cargo ? ' · ' + diagState.reg.cargo : ''}${diagState.reg.sector ? ' · ' + diagState.reg.sector : ''}</span>
          </div>
        </div>
        <div class="diag-results-meta">
          <i class="fas fa-calendar"></i> ${fecha}
        </div>
      </div>

      <div class="diag-overall-score" style="--nivel-color:${nivel.color}">
        <div class="diag-score-ring">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
            <circle cx="60" cy="60" r="54" fill="none"
              stroke="${nivel.color}" stroke-width="10"
              stroke-dasharray="${circumference.toFixed(2)}"
              stroke-dashoffset="${dashOffset.toFixed(2)}"
              stroke-linecap="round"
              transform="rotate(-90 60 60)"/>
          </svg>
          <div class="diag-score-inner">
            <span class="diag-score-num">${fmtScore(overall)}</span>
            <span class="diag-score-max">/ 5.0</span>
          </div>
        </div>
        <div class="diag-score-info">
          <div class="diag-nivel-badge" style="background:${nivel.color}22;color:${nivel.color};border-color:${nivel.color}44">
            ${nivel.label}
          </div>
          <h3>Nivel de Madurez Empresarial</h3>
          <p>${nivel.descripcion}</p>
        </div>
      </div>

      <div class="diag-radar-section">
        <h4><i class="fas fa-chart-radar"></i> Mapa de madurez por área</h4>
        <div class="diag-radar-wrap">
          <canvas id="diagRadarChart"></canvas>
        </div>
      </div>

      <div class="diag-area-scores">
        <h4><i class="fas fa-list-check"></i> Resultados por área</h4>
        <div class="diag-area-rows">${areaScoresHTML}</div>
      </div>

      <div class="diag-insights">
        <div class="diag-insight-card diag-insight--strengths">
          <h4><i class="fas fa-trophy"></i> Fortalezas identificadas</h4>
          <ul>${strengthsHTML}</ul>
        </div>
        <div class="diag-insight-card diag-insight--gaps">
          <h4><i class="fas fa-triangle-exclamation"></i> Áreas de mejora prioritaria</h4>
          <ul>${gapsHTML}</ul>
        </div>
      </div>

      <div class="diag-recommendations">
        <h4><i class="fas fa-lightbulb"></i> Plan de acción recomendado</h4>
        <ol>${recs.map(r => `<li>${r}</li>`).join('')}</ol>
      </div>

      <div class="diag-results-cta">
        <div class="diag-cta-text">
          <h3>¿Quieres transformar tu empresa?</h3>
          <p>Agenda una sesión estratégica sin costo y descubre cómo podemos ayudarte a pasar al siguiente nivel de madurez.</p>
        </div>
        <div class="diag-cta-btns">
          <a href="https://wa.me/573173700578?text=Hola%2C%20acabo%20de%20realizar%20el%20diagnóstico%20de%20madurez%20y%20quiero%20agendar%20una%20sesión%20estratégica"
             class="btn-diag-wa" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-whatsapp"></i> Agendar sesión por WhatsApp
          </a>
          <button class="btn-diag-pdf" id="dExportPDF">
            <i class="fas fa-file-pdf"></i> Descargar PDF del diagnóstico
          </button>
        </div>
      </div>

      <div class="diag-nav diag-nav--results">
        <button class="btn-diag-secondary" onclick="openDiagnostico()">
          <i class="fas fa-rotate-left"></i> Nuevo diagnóstico
        </button>
        <button class="btn-diag-secondary" onclick="closeDiagnostico()">
          Cerrar <i class="fas fa-xmark"></i>
        </button>
      </div>

      <p class="diag-footer-note">
        Diagnóstico elaborado por <strong>Los Elegidos Colombia</strong> ·
        loselegidoscolombia.com · +57 317 370 0578
      </p>
    </div>
  `;
}

function initResultsListeners() {
  const pdfBtn = document.getElementById('dExportPDF');
  if (pdfBtn) pdfBtn.addEventListener('click', exportDiagPDF);
}

// ── RADAR CHART ───────────────────────────────────────────
function renderRadarChart() {
  const canvas = document.getElementById('diagRadarChart');
  if (!canvas || !window.Chart) return;

  if (diagState.radarChart) diagState.radarChart.destroy();

  diagState.radarChart = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: DIAG_AREAS.map(a => a.nombre),
      datasets: [{
        label: diagState.reg.empresa || 'Tu empresa',
        data: DIAG_AREAS.map((_, i) => calcAreaScore(i)),
        backgroundColor: 'rgba(201,168,76,0.15)',
        borderColor: '#c9a84c',
        pointBackgroundColor: '#c9a84c',
        pointBorderColor: '#0b0f1e',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#e8c96d',
        borderWidth: 2,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        r: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
            color: '#5a6478',
            backdropColor: 'transparent',
            font: { size: 10 }
          },
          grid: { color: 'rgba(255,255,255,0.07)' },
          angleLines: { color: 'rgba(255,255,255,0.09)' },
          pointLabels: {
            color: '#8892a4',
            font: { size: 11, family: "'Inter', sans-serif" }
          }
        }
      }
    }
  });
}

// ── EXPORT PDF ────────────────────────────────────────────
async function exportDiagPDF() {
  if (!window.jspdf) {
    alert('La librería de PDF aún se está cargando. Espera unos segundos e intenta de nuevo.');
    return;
  }

  const btn = document.getElementById('dExportPDF');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando PDF...';
  }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const PW   = 210;
    const ML   = 15;
    const MR   = 15;
    const CW   = PW - ML - MR;
    let y      = 0;

    const CGOLD  = [201, 168, 76];
    const CDARK  = [15, 21, 37];
    const CLIGHT = [240, 244, 252];
    const CGRAY  = [136, 146, 164];
    const CMID   = [230, 234, 242];

    // ── Header
    doc.setFillColor(...CDARK);
    doc.rect(0, 0, PW, 42, 'F');
    doc.setFillColor(...CGOLD);
    doc.rect(0, 0, 5, 42, 'F');

    doc.setTextColor(...CGOLD);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Los Elegidos Colombia', 12, 16);
    doc.setFontSize(11);
    doc.setTextColor(...CLIGHT);
    doc.text('Diagnóstico de Madurez Empresarial', 12, 26);
    doc.setFontSize(8);
    doc.setTextColor(...CGRAY);
    const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`${diagState.reg.empresa || 'Empresa'}  ·  ${diagState.reg.nombre}  ·  ${diagState.reg.cargo || ''}  ·  ${fecha}`, 12, 36);

    y = 52;

    // ── Score general
    const overall = calcOverallScore();
    const nivel   = getNivelByScore(overall);

    doc.setFillColor(...CMID);
    doc.roundedRect(ML, y, CW, 26, 3, 3, 'F');

    doc.setTextColor(...CDARK);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.text(fmtScore(overall), ML + 8, y + 16);
    doc.setFontSize(9);
    doc.setTextColor(...CGRAY);
    doc.text('/ 5.0', ML + 28, y + 16);

    doc.setFontSize(13);
    doc.setTextColor(...CDARK);
    doc.text(`Nivel: ${nivel.label}`, ML + 48, y + 10);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(60, 70, 90);
    const nivelLines = doc.splitTextToSize(nivel.descripcion, CW - 52);
    doc.text(nivelLines.slice(0, 3), ML + 48, y + 17);
    y += 34;

    // ── Radar chart
    const chartCanvas = document.getElementById('diagRadarChart');
    if (chartCanvas) {
      try {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...CDARK);
        doc.text('Mapa de Madurez por Área', ML, y + 5);
        y += 10;
        const imgData = chartCanvas.toDataURL('image/png');
        const cW = 95, cH = 95;
        doc.addImage(imgData, 'PNG', (PW - cW) / 2, y, cW, cH);
        y += cH + 8;
      } catch (_) { y += 4; }
    }

    // ── Puntajes por área
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...CDARK);
    doc.text('Resultados por Área', ML, y);
    y += 7;

    DIAG_AREAS.forEach((area, i) => {
      const score   = calcAreaScore(i);
      const aNivel  = getNivelByScore(score);
      const barMaxW = CW - 65;
      const barW    = Math.max(0, barMaxW * ((score - 1) / 4));

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...CDARK);
      doc.text(area.nombre, ML, y + 4);

      doc.setFillColor(...CMID);
      doc.rect(ML + 58, y, barMaxW, 4, 'F');
      doc.setFillColor(...CGOLD);
      if (barW > 0) doc.rect(ML + 58, y, barW, 4, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...CDARK);
      doc.text(fmtScore(score), ML + 58 + barMaxW + 2, y + 4);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...CGRAY);
      doc.text(aNivel.label, ML + 58 + barMaxW + 12, y + 4);

      y += 9;
    });

    y += 6;

    // ── Recomendaciones
    if (y > 240) { doc.addPage(); y = 20; }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...CDARK);
    doc.text('Plan de Acción Recomendado', ML, y);
    y += 7;

    DIAG_RECOMENDACIONES[nivel.id].forEach((rec, i) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(40, 50, 70);
      const lines = doc.splitTextToSize(`${i + 1}. ${rec}`, CW);
      if (y + lines.length * 5 > 268) { doc.addPage(); y = 20; }
      doc.text(lines, ML, y);
      y += lines.length * 5 + 2;
    });

    y += 8;

    // ── CTA block
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFillColor(...CGOLD);
    doc.roundedRect(ML, y, CW, 24, 3, 3, 'F');
    doc.setTextColor(...CDARK);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('¿Quieres transformar tu empresa?', ML + 6, y + 9);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Agenda una sesión estratégica sin costo: wa.me/573173700578', ML + 6, y + 18);

    // ── Footer en todas las páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      doc.setFillColor(...CDARK);
      doc.rect(0, 285, PW, 12, 'F');
      doc.setTextColor(...CGRAY);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(
        'Diagnóstico elaborado por Los Elegidos Colombia  ·  loselegidoscolombia.com  ·  +57 317 370 0578',
        PW / 2, 292, { align: 'center' }
      );
    }

    const empresa = (diagState.reg.empresa || 'Empresa').replace(/[^a-z0-9]/gi, '_');
    doc.save(`Diagnostico_Madurez_${empresa}.pdf`);

  } catch (err) {
    console.error('Error generando PDF:', err);
    alert('Ocurrió un error al generar el PDF. Por favor intenta de nuevo.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-file-pdf"></i> Descargar PDF del diagnóstico';
    }
  }
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-open-diag]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openDiagnostico();
    });
  });

  const closeBtn = document.getElementById('diagCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeDiagnostico);

  const overlay = document.getElementById('diagOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDiagnostico();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const ov = document.getElementById('diagOverlay');
      if (ov && ov.classList.contains('active')) closeDiagnostico();
    }
  });
});
