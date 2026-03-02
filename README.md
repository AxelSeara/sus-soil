## SUS-SOIL Frontend

Aplicación frontend del proyecto europeo **SUS-SOIL**, desarrollada con **React 18**, **Vite** y **TailwindCSS**.

La app muestra información del proyecto (About, Work Packages, Partners, Living Labs, recursos, etc.) y consume contenido dinámico (noticias y eventos) desde una instancia de **WordPress** mediante su REST API (`/wp-json/wp/v2`).

---

### Requisitos

- Node.js LTS (18+ recomendado)
- npm o pnpm

---

### Instalación

```bash
npm install
```

---

### Variables de entorno

Crear un archivo `.env` en la raíz del proyecto (no se debe commitear a Git con secretos reales). Variables actualmente relevantes:

```bash
VITE_UNDER_CONSTRUCTION=false
# Opcional: contraseña para el modo "under construction"
# VITE_CONSTRUCTION_PASS=lo_que_quieras
```

- **`VITE_UNDER_CONSTRUCTION`**:
  - `true`: la web se muestra en modo *under construction* y pide una contraseña.
  - `false`: la web se muestra normalmente.
- **`VITE_CONSTRUCTION_PASS`**:
  - Se usa solo como **mecanismo de acceso temporal para stakeholders**.
  - **No es seguridad real**: nunca debe usarse para proteger información sensible.

---

### Scripts principales

- **`npm run dev`**: arranca el servidor de desarrollo Vite.
- **`npm run build`**: genera el build de producción.
- **`npm run preview`**: sirve el build de producción en local.
- **`npm run lint`**: ejecuta ESLint sobre el código fuente.

Si existen scripts adicionales (por ejemplo, para optimizar imágenes), se recomienda documentarlos también aquí.

---

### Estructura general

- `src/App.jsx`: enrutado principal con `react-router-dom`, `Navbar`, `Footer`, cookie banner y analítica.
- `src/Project/*`: páginas (Home, News, Events, Regions / LivingLabs, Project overview, Resources, etc.).
- `src/components/*`: componentes compartidos (Navbar, Footer, ScrollToTop, LLRelatedNews, etc.).
- `src/services/wpApi.js`: capa ligera para consumir la REST API de WordPress (noticias y eventos).
- `src/data/regions.js`: datos estáticos de bioregiones y Living Labs.

---

### Notas sobre la API de WordPress

La capa `src/services/wpApi.js` centraliza las llamadas a:

- Listado de posts por categoría (paginado o completo).
- Post individual por id.
- Últimas noticias y eventos.
- Posts relacionados por tags.
- Navegación Previous / Next dentro de la categoría de noticias/eventos.

Si en el futuro cambian las URLs o parámetros de WordPress, el lugar recomendado para ajustar la lógica es este servicio.
