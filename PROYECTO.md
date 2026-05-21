# Los Elegidos Colombia — Documentación del Proyecto Web

## ¿Qué es este proyecto?

Sitio web estático de una sola página (landing page) para **Los Elegidos Colombia**, firma de consultoría empresarial premium orientada a pequeñas y medianas empresas (pymes) colombianas.

El objetivo principal de la página es **captar leads calificados**: dueños de pymes, gerentes generales y directores que buscan crecer con orden, procesos, datos, automatización e inteligencia artificial aplicada.

---

## La empresa

**Los Elegidos Colombia** es una firma de consultoría integral para pymes que ayuda a empresas a pasar de una operación desordenada a una organización controlada, medible y preparada para escalar.

### Sub-marca: DataWorld

**DataWorld** es la unidad especializada en Business Intelligence dentro de Los Elegidos Colombia. Se encarga de:

- Dashboards gerenciales en Power BI
- Integración de fuentes de datos (ERP, Excel, CRM, POS)
- Modelos de datos empresariales
- Automatización de reportes
- Analítica para pymes

---

## Archivos del proyecto

```
AI_Claude_Curso/
│
├── index.html       → Estructura completa de la página (15 secciones)
├── styles.css       → Todo el diseño visual (CSS puro, sin frameworks)
├── script.js        → Funcionalidades interactivas (JavaScript puro)
└── PROYECTO.md      → Este archivo de documentación
```

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de la página |
| CSS3 | Diseño visual, animaciones, responsive |
| JavaScript (ES6+) | Interactividad sin frameworks |
| Google Fonts | Playfair Display (títulos) + Inter (cuerpo) |
| Font Awesome 6 | Íconos via CDN |

**No se usa ningún framework** (sin React, Vue, Next.js, Bootstrap ni jQuery). El proyecto se puede abrir directamente con **Live Server** en VS Code.

---

## Paleta de colores

| Nombre | Código HEX | Uso |
|---|---|---|
| Negro profundo | `#06080f` | Fondo principal, hero |
| Azul oscuro | `#0b0f1e` | Secciones secundarias |
| Grafito tarjeta | `#0f1525` | Tarjetas y cards |
| Dorado (acento) | `#c9a84c` | CTAs, títulos destacados, acento |
| Azul eléctrico | `#00d4ff` | Sección DataWorld, acento tech |
| Azul principal | `#3b6bfa` | Detalles, íconos |
| Blanco texto | `#f0f4fc` | Texto principal |
| Gris texto | `#8892a4` | Texto secundario |

---

## Tipografía

- **Playfair Display** → Títulos, encabezados de sección, nombres de fases
- **Inter** → Cuerpo, párrafos, botones, etiquetas

---

## Secciones de la página

| # | Sección | ID | Descripción |
|---|---|---|---|
| 1 | Navbar | `#navbar` | Fijo, glass effect al hacer scroll, menú hamburguesa en móvil |
| 2 | Hero | `#inicio` | Título principal, CTA, dashboard simulado con métricas flotantes |
| 3 | Trust Bar | — | Métricas de credibilidad (+120 pymes, 8+ años, etc.) |
| 4 | Problemas | `#problemas` | 8 dolores del empresario en tarjetas |
| 5 | Solución | `#solucion` | Los 5 pilares del modelo de Los Elegidos |
| 6 | Método | `#metodo` | Las 4 fases del proceso (timeline vertical) |
| 7 | Servicios | `#servicios` | 7 tarjetas de servicios, DataWorld destacada |
| 8 | DataWorld | `#dataworld` | Sección especial tech con 10 módulos de datos |
| 9 | Programa | `#programa` | Programa Empresa Escalable (producto premium) |
| 10 | Diagnóstico | `#diagnostico` | Quiz interactivo de 5 preguntas con resultado automático |
| 11 | Calculadora | `#calculadora` | Calcula la pérdida mensual estimada por desorden operativo |
| 12 | Industrias | `#industrias` | 7 sectores con descripción de cómo se les ayuda |
| 13 | Recursos | `#recursos` | 5 recursos descargables con modal de captura de email |
| 14 | Contacto | `#contacto` | Formulario de 10 campos con validación y mensaje de éxito |
| 15 | Footer | — | Logo, servicios, contacto, redes sociales, DataWorld badge |

Elementos adicionales: botón flotante de WhatsApp y botón "volver arriba".

---

## Funcionalidades en JavaScript

### 1. Menú hamburguesa (móvil)
- Se activa en pantallas ≤ 768px
- El ícono anima a una X al abrirse
- Se cierra al hacer clic en un enlace, en el overlay o con la tecla `Escape`

### 2. Navbar dinámico
- Transparent inicialmente → fondo glass oscuro al hacer scroll
- Resalta el enlace activo según la sección visible en pantalla

### 3. Animaciones al hacer scroll
- Usa `IntersectionObserver` para activar clases CSS al entrar al viewport
- Efectos: `fade-up`, `fade-left`, `fade-right`
- Cada elemento se anima solo una vez

### 4. Diagnóstico interactivo
- 5 preguntas de selección múltiple
- Barra de progreso que avanza con cada respuesta
- 4 posibles resultados según puntaje total (rango 6–17 puntos):
  - 🔴 Crecimiento Desordenado (6–9 pts)
  - 🟡 Control Parcial (10–12 pts)
  - 🟢 Empresa Lista para Escalar (13–15 pts)
  - ⚡ Alto Potencial de Automatización (16–17 pts)
- El resultado menciona el área de dolor específica seleccionada en la pregunta 3
- Se guarda en `localStorage` para persistir entre visitas

### 5. Calculadora de pérdida por desorden
Estima cuánto pierde una pyme mensualmente por no tener orden. Recibe 5 entradas:

| Entrada | Fórmula aplicada |
|---|---|
| Ventas mensuales | × 7% = pérdida por ineficiencia general |
| Horas en reportes | × 4 semanas × $30.000/hora |
| % reprocesos | Ventas × 60% × reprocesos% × 20% |
| Leads sin seguimiento | × $1.500.000 ticket prom × 8% conversión |

> Los valores son estimaciones orientativas en pesos colombianos (COP).

### 6. Formulario de contacto
- Validación de campos requeridos (nombre, empresa, cargo, WhatsApp, email)
- Validación de formato de email con regex
- Muestra errores por campo
- Muestra mensaje de éxito al enviar
- **Pendiente:** conectar a FormSpree, EmailJS o backend real

### 7. Modal de recursos
- Se abre al hacer clic en "Descargar gratis"
- Captura nombre y correo antes de dar acceso al recurso
- Muestra confirmación personalizada con el nombre del usuario

---

## Datos de contacto actuales

| Campo | Valor |
|---|---|
| WhatsApp | +57 317 370 0578 |
| Correo | Felipebautista@loselegidoscolombia.com |
| Teléfono | +57 317 370 0578 |
| Ubicación | Bogotá, Colombia |

---

## Pendientes / TODOs

Estos elementos están en el código marcados con comentarios `<!-- TODO: -->`:

- [ ] Agregar URL real de LinkedIn
- [ ] Agregar URL real de Instagram
- [ ] Agregar URL real de Facebook
- [ ] Agregar URL real de YouTube
- [ ] Conectar formulario de contacto a backend (FormSpree, EmailJS, Google Sheets, etc.)
- [ ] Agregar enlaces reales a los 5 recursos descargables (PDF / Google Drive)
- [ ] Subir logo oficial PNG/SVG (sin la palabra "Pos") y reemplazar el texto del navbar
- [ ] Agregar meta tags Open Graph para compartir en redes sociales
- [ ] Agregar Google Analytics o similar para medir tráfico

---

## Cómo correr el proyecto localmente

1. Abre la carpeta `AI_Claude_Curso` en **Visual Studio Code**
2. Instala la extensión **Live Server** (si no la tienes)
3. Clic derecho en `index.html` → **"Open with Live Server"**
4. La página abre en `http://127.0.0.1:5500/index.html`

No se necesita instalar nada más. No hay dependencias de Node.js ni npm.

---

## Responsive / Breakpoints

| Breakpoint | Comportamiento |
|---|---|
| > 1024px | Layout completo en escritorio: 3 columnas, hero con dashboard |
| ≤ 1024px | Hero apilado, DataWorld en columna, programa en columna |
| ≤ 768px | Menú hamburguesa, todas las grids en 1 columna, dashboard oculto |
| ≤ 480px | Botones apilados, diagnóstico en 2 columnas, tipografía reducida |

---

## Historial de versiones

| Versión | Descripción |
|---|---|
| v1.0 | Landing page inicial: Hero, Sobre nosotros, 3 servicios (Formalización, Bancoldex, Digital), Contacto. Un solo archivo HTML con CSS interno. |
| v2.0 | Rediseño completo premium. 3 archivos separados. 15 secciones. JavaScript puro. Diagnóstico interactivo, calculadora, 7 servicios, DataWorld, Programa Empresa Escalable. |

---

*Documentación generada con Claude Code · Los Elegidos Colombia · 2026*
