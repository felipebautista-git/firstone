/* ================================================================
   LOS ELEGIDOS COLOMBIA — script.js
   Funcionalidades: navbar, menú móvil, animaciones scroll,
   diagnóstico interactivo, calculadora, formulario, modal recursos.
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   1. NAVBAR: transparente → glass al hacer scroll
   ---------------------------------------------------------------- */
const navbar    = document.getElementById('navbar');
const backTop   = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  // Activa fondo del navbar al bajar 50px
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // Muestra botón "volver arriba" al bajar 400px
  backTop.classList.toggle('show', window.scrollY > 400);
  // Resalta enlace de nav activo según sección visible
  highlightNavLink();
}, { passive: true });


/* ----------------------------------------------------------------
   2. MENÚ HAMBURGUESA (móvil)
   ---------------------------------------------------------------- */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMobileMenu() {
  hamburger.classList.add('open');
  navLinks.classList.add('open');
  navOverlay.classList.add('show');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  navOverlay.classList.remove('show');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

navOverlay.addEventListener('click', closeMobileMenu);

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Cerrar con tecla Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});


/* ----------------------------------------------------------------
   3. NAV LINK ACTIVO según sección en pantalla
   ---------------------------------------------------------------- */
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id], div[id="inicio"]');
  const links    = document.querySelectorAll('.nav-link');
  let current    = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}


/* ----------------------------------------------------------------
   4. ANIMACIONES AL HACER SCROLL (IntersectionObserver)
   ---------------------------------------------------------------- */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      animObserver.unobserve(entry.target); // solo una vez
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));


/* ----------------------------------------------------------------
   5. DIAGNÓSTICO INTERACTIVO
   ---------------------------------------------------------------- */
let diagScores  = {};   // { q1: val, q2: val, ... }
let diagArea    = '';   // área de dolor seleccionada en pregunta 3

// Escucha cambios en los radio buttons de cada pregunta
document.querySelectorAll('.diag-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    const q    = opt.closest('.diag-q');
    const qNum = q.dataset.q;
    const val  = parseInt(opt.dataset.val);

    // Registrar valor y área si aplica
    diagScores[`q${qNum}`] = val;
    if (opt.dataset.area) diagArea = opt.dataset.area;

    // Marcar visualmente la opción seleccionada
    q.querySelectorAll('.diag-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');

    // Activar botón siguiente
    const btn = q.querySelector('.btn-diag-next');
    if (btn) btn.disabled = false;
  });
});

// Avanzar a la siguiente pregunta
function diagNext(currentQ) {
  const current  = document.querySelector(`.diag-q[data-q="${currentQ}"]`);
  const nextQ    = currentQ + 1;
  const next     = document.querySelector(`.diag-q[data-q="${nextQ}"]`);

  // Animar salida
  current.classList.remove('active');

  if (next) {
    next.classList.add('active');
  } else {
    // Última pregunta → mostrar resultado
    showDiagResult();
  }

  // Actualizar barra de progreso
  const progress = nextQ > 5 ? 100 : (nextQ / 5) * 100;
  document.getElementById('diagBar').style.width = `${progress}%`;
  document.getElementById('diagProgressText').textContent =
    nextQ > 5 ? 'Resultado' : `Pregunta ${nextQ} de 5`;
}

function showDiagResult() {
  // Calcular puntaje total
  const total = Object.values(diagScores).reduce((sum, v) => sum + v, 0);

  // Definir resultados según puntaje (rango 6-17)
  const results = [
    {
      max:  9,
      icon: '🔴',
      title: 'Crecimiento Desordenado',
      desc: `Tu empresa tiene potencial, pero el desorden operativo está frenando el crecimiento. Sin un sistema claro de procesos, datos y control, cada mes que pasa tiene un costo invisible. Necesitas una intervención estructurada que empiece por el diagnóstico.${diagArea ? ` El área de ${diagArea} es crítica en tu caso.` : ''}`
    },
    {
      max: 12,
      icon: '🟡',
      title: 'Control Parcial',
      desc: `Tienes algunas bases, pero aún hay zonas críticas sin estructura. La empresa depende demasiado de personas clave y las decisiones no siempre están respaldadas por datos confiables. Un acompañamiento en las áreas de mayor debilidad puede generar un impacto rápido y visible.${diagArea ? ` Tu dolor principal en ${diagArea} es un punto de partida claro.` : ''}`
    },
    {
      max: 15,
      icon: '🟢',
      title: 'Empresa Lista para Escalar',
      desc: `Tu empresa tiene una base sólida. Los procesos existen, se revisan indicadores con cierta frecuencia y la operación no depende completamente de una persona. El siguiente nivel es la automatización, el Business Intelligence y el seguimiento gerencial estructurado para crecer con control.`
    },
    {
      max: 17,
      icon: '⚡',
      title: 'Alto Potencial de Automatización',
      desc: `Tu empresa está bien estructurada. Tienes claridad operativa y buen control. El gran salto que puedes dar ahora es la automatización de procesos repetitivos, dashboards en tiempo real y la implementación de IA aplicada para tomar mejores decisiones aún más rápido.`
    }
  ];

  const result = results.find(r => total <= r.max) || results[results.length - 1];

  // Ocultar preguntas y mostrar resultado
  document.getElementById('diagQuestions').style.display = 'none';
  document.getElementById('diagProgress').style.display  = 'none';

  const resultEl = document.getElementById('diagResult');
  document.getElementById('diagResultIcon').textContent  = result.icon;
  document.getElementById('diagResultTitle').textContent = result.title;
  document.getElementById('diagResultDesc').textContent  = result.desc;
  document.getElementById('diagScore').textContent       = total;

  resultEl.classList.add('show');
}

// Reiniciar diagnóstico
function restartDiag() {
  diagScores = {};
  diagArea   = '';

  // Resetear UI
  document.querySelectorAll('.diag-q').forEach((q, i) => {
    q.classList.remove('active');
    q.querySelectorAll('.diag-opt').forEach(o => o.classList.remove('selected'));
    q.querySelectorAll('.btn-diag-next').forEach(btn => (btn.disabled = true));
    if (i === 0) q.classList.add('active');
  });

  // Resetear radios
  document.querySelectorAll('.diag-q input[type="radio"]').forEach(r => (r.checked = false));

  // Resetear progreso
  document.getElementById('diagBar').style.width = '20%';
  document.getElementById('diagProgressText').textContent = 'Pregunta 1 de 5';

  // Ocultar resultado, mostrar preguntas
  document.getElementById('diagResult').classList.remove('show');
  document.getElementById('diagQuestions').style.display = 'block';
  document.getElementById('diagProgress').style.display  = 'block';
}

// Exponer funciones al scope global (llamadas desde onclick en HTML)
window.diagNext   = diagNext;
window.restartDiag = restartDiag;


/* ----------------------------------------------------------------
   6. CALCULADORA DE PÉRDIDA POR DESORDEN OPERATIVO
   Estimaciones orientativas. No son exactas — sirven para generar
   conciencia sobre el costo del desorden operativo en una pyme.
   ---------------------------------------------------------------- */
function calcularPerdida() {
  const ventas     = parseFloat(document.getElementById('cVentas').value)     || 0;
  const empleados  = parseFloat(document.getElementById('cEmpleados').value)  || 0;
  const horas      = parseFloat(document.getElementById('cHoras').value)       || 0;
  const reprocesos = parseFloat(document.getElementById('cReprocesos').value)  || 0;
  const leads      = parseFloat(document.getElementById('cLeads').value)       || 0;

  if (ventas === 0 && empleados === 0) {
    alert('Por favor ingresa al menos las ventas mensuales para calcular el estimado.');
    return;
  }

  // Cálculos estimados
  // 1. Ineficiencia operativa: 7% de los ingresos se pierde por falta de control
  const perdInef = ventas * 0.07;

  // 2. Tiempo en reportes manuales: horas semanales × 4 semanas × valor hora promedio pyme
  //    Se asume un valor de COP $30.000 por hora de personal calificado
  const VALOR_HORA = 30000;
  const perdRep = horas * 4 * VALOR_HORA;

  // 3. Reprocesos y errores: el porcentaje de reprocesos aplicado al 20% del costo operativo
  //    Se estima costo operativo = 60% de las ventas; reproceso impacta el 20% de ese costo
  const perdRep2 = ventas * 0.60 * (reprocesos / 100) * 0.20;

  // 4. Leads sin seguimiento: cada lead vale en promedio COP $1.500.000 de ticket
  //    con una tasa de conversión estimada del 8%
  const TICKET_PROM     = 1500000;
  const TASA_CONVERSION = 0.08;
  const perdLeads = leads * TICKET_PROM * TASA_CONVERSION;

  const total = perdInef + perdRep + perdRep2 + perdLeads;

  // Mostrar resultados
  const fmt = n => '$' + Math.round(n).toLocaleString('es-CO');
  document.getElementById('rInef').textContent  = fmt(perdInef);
  document.getElementById('rRep').textContent   = fmt(perdRep);
  document.getElementById('rRep2').textContent  = fmt(perdRep2);
  document.getElementById('rLeads').textContent = fmt(perdLeads);
  document.getElementById('rTotal').textContent = fmt(total);

  const resultEl = document.getElementById('calcResult');
  resultEl.classList.add('show');
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

window.calcularPerdida = calcularPerdida;


/* ----------------------------------------------------------------
   7. FORMULARIO DE CONTACTO CON VALIDACIÓN
   ---------------------------------------------------------------- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Campos requeridos con validación básica
    const fields = [
      { id: 'fNombre',  type: 'text'  },
      { id: 'fEmpresa', type: 'text'  },
      { id: 'fCargo',   type: 'text'  },
      { id: 'fWA',      type: 'tel'   },
      { id: 'fEmail',   type: 'email' },
    ];

    fields.forEach(({ id, type }) => {
      const input = document.getElementById(id);
      const group = input.closest('.form-group');

      group.classList.remove('has-error');

      const isEmpty = input.value.trim() === '';
      const isEmail = type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

      if (isEmpty || isEmail) {
        group.classList.add('has-error');
        valid = false;
      }
    });

    if (!valid) {
      // Hacer scroll al primer error
      const firstError = contactForm.querySelector('.has-error input');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Aquí puedes conectar con FormSpree, EmailJS, Google Sheets o tu propio backend.
    // TODO: Reemplaza este bloque con tu lógica de envío real.
    // Ejemplo con FormSpree: <form action="https://formspree.io/f/XXXXXX" method="POST">
    // Por ahora simulamos éxito:
    contactForm.classList.add('hidden');
    contactForm.style.display = 'none';
    formSuccess.classList.add('show');
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Limpiar error al escribir
  contactForm.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('.form-group')?.classList.remove('has-error');
    });
  });
}


/* ----------------------------------------------------------------
   8. MODAL DE RECURSOS (captura de leads)
   ---------------------------------------------------------------- */
let currentResource = '';

function openResourceModal(resource) {
  currentResource = resource;
  document.getElementById('resourceModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeResourceModal() {
  document.getElementById('resourceModal').classList.remove('show');
  document.body.style.overflow = '';
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeResourceModal();
});

function submitResourceForm(e) {
  e.preventDefault();
  const name  = document.getElementById('resName').value.trim();
  const email = document.getElementById('resEmail').value.trim();

  if (!name || !email) return;

  // TODO: Conecta aquí con tu sistema de email marketing, CRM o Google Sheets
  // Actualmente solo cierra el modal y muestra confirmación
  const box = document.querySelector('.modal-box');
  box.innerHTML = `
    <div style="text-align:center;padding:1rem 0">
      <div style="font-size:2.5rem;margin-bottom:1rem">✅</div>
      <h3 style="font-family:'Playfair Display',serif;color:#f0f4fc;margin-bottom:0.5rem">¡Listo, ${name}!</h3>
      <p style="color:#8892a4;font-size:0.88rem;line-height:1.7">
        Te enviaremos el recurso a <strong style="color:#c9a84c">${email}</strong> en los próximos minutos.
      </p>
      <button onclick="closeResourceModal()" style="margin-top:1.5rem;background:var(--gold);color:#09090f;font-weight:700;padding:0.7rem 2rem;border-radius:4px;font-size:0.85rem;cursor:pointer;border:none;">
        Cerrar
      </button>
    </div>
  `;
}

window.openResourceModal  = openResourceModal;
window.closeResourceModal = closeResourceModal;
window.submitResourceForm = submitResourceForm;


/* ----------------------------------------------------------------
   9. TARJETAS DE SERVICIOS — efecto de entrada escalonado
   ---------------------------------------------------------------- */
(function staggerCards() {
  const cards = document.querySelectorAll('.service-card, .problem-card, .industry-card');
  let delay   = 0;
  cards.forEach(card => {
    card.style.transitionDelay = `${delay}ms`;
    delay += 60;
  });
})();


/* ----------------------------------------------------------------
   10. SUAVIZADO DE ANCLAS DEL NAV (por si el browser no soporta
       scroll-behavior: smooth en CSS)
   ---------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // altura del navbar
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ----------------------------------------------------------------
   11. BARRAS DEL DASHBOARD HERO (animación de entrada)
   ---------------------------------------------------------------- */
(function animateDashBars() {
  const bars = document.querySelectorAll('.dash-bars .bar');
  bars.forEach((bar, i) => {
    bar.style.height = '0%';
    bar.style.transition = `height 0.8s ease ${0.3 + i * 0.1}s`;
    // Altura final definida en el CSS mediante variable --h
    const targetH = bar.style.getPropertyValue('--h') || bar.getAttribute('style').match(/--h:([\d.]+%)/)?.[1];
    setTimeout(() => {
      if (targetH) bar.style.height = targetH;
    }, 200);
  });
})();


/* ----------------------------------------------------------------
   12. PERSISTENCIA SIMPLE DEL DIAGNÓSTICO (localStorage)
   Guarda el último resultado para mostrarlo al volver.
   ---------------------------------------------------------------- */
(function saveDiagResult() {
  const resultEl = document.getElementById('diagResult');
  const observer = new MutationObserver(() => {
    if (resultEl.classList.contains('show')) {
      const data = {
        title: document.getElementById('diagResultTitle').textContent,
        score: document.getElementById('diagScore').textContent,
        date:  new Date().toLocaleDateString('es-CO')
      };
      localStorage.setItem('lec_diag', JSON.stringify(data));
    }
  });
  observer.observe(resultEl, { attributes: true, attributeFilter: ['class'] });
})();
