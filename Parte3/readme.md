# README - El Camino del Té

La página web "El Camino del Té" es una guía interactiva sobre tipos de té, su preparación y ceremonia, construida con HTML, Bootstrap 5.3, CSS personalizado y múltiples scripts hechos en JavaScript para aportar funcionalidades dinámicas.

## Funcionalidad General
Proporciona información educativa sobre tés (origen, temperatura, tiempos de infusionado), un formulario de suscripción con validación y almacenamiento local, carrusel de imágenes, reloj digital/análogo, un cronómetro de infusión tipo toast, un buscador de tabla y un mapa de teterías en Madrid (funcionalidad de pago, por lo que no funciona correctamente a no ser que abras el mapa (redirección a la página de Google Maps)). Incluye tema claro/oscuro persistente y notificaciones toast para aportar feedback. La tabla de tés se genera dinámicamente desde un array de objetos en `mejoras.js` con datos como Sencha (Japón, 70°C, 2-3 min) o Assam (India, 95°C, 3-5 min).

## Elementos Principales

### Navbar y Navegación
- Barra de navegación responsive con Bootstrap (marca "El Camino del Té", menú: Inicio, Tipos de té, Ceremonia, dropdown Recursos: Suscripción, Servicios, Contacto). 
- Botón toggle tema claro/oscuro accesible (íconos luna/sol, aria-labels).

### Sidebar (Guía Rápida)
- Lista de temperaturas/tiempos (Verde 70°C 2-3 min, Negro 95°C 3-5 min, etc.) y consejos.
- Reloj digital/análogo interactivo (toggle analógico, actualiza cada segundo con Canvas).

### Sección Principal
- **Carrusel**: 4 slides con imágenes de efecto blur (picsum.photos), controles, indicadores y captions temáticas (T caliente, Siempre fresco).
- **Introducción**: Títulos sobre origen del té, badges (Ceremonia china, Japón/China/India).
- **Tabla de Tés**: Dinámica, sortable con buscador en tiempo real; clic en la fila inicia el cronómetro toast.
- **Formulario Suscripción**: Campos nombre/email/tipo/niveles cafeína/comentarios; validaciones regex (que el nombre solo contenga letras), checkboxes requeridos, reset y submit con toast.
- **Servicios**: 3 cards (Servicios, Características, Funcionalidades) con iconos Bootstrap.
- **Mapa**: Embed Google Maps centrado en Madrid para teterías.

### Footer
- Copyright 2026, autora Ana B. Donoso, enlaces redes (Instagram, Twitter, email).


## Scripts y Estilos

| Archivo | Funcionalidad Principal |
|---------|-------------------------|
| `script.js` | Tema oscuro/claro persistente, validaciones formulario (nombre, checkboxes, select), toasts reutilizables |
| `mejoras.js` | Array datos tés y tabla dinámica, manejo formulario con localStorage (arrayUsuarios), resaltado select |
| `interactividad2.js` | Reloj, cronómetro toast (ajustable por tipo té), buscador tabla, mapa embed |
| `style.css` | Variables CSS té-temáticas (--bg-tea gradient), responsive, modo oscuro completo (cards, tabla, forms) |

## Verificaciones Realizadas

- **Responsive Design**: Media queries para móviles/tablets (carousel 250px, cards ajustadas); probado en max-width 768px.
- **Accesibilidad**: Aria-labels (toggle tema, navegación), visually-hidden spans, focus en formularios/selects.
- **Validaciones**: Nombre (solo letras, regex /^[A-Za-z\s]+$/), al menos 1 checkbox en cafeína, que "tipo té" no esté vacío; errores inline y toasts.
- **Persistencia**: Tema en localStorage (`teatheme`), usuarios del formulario en `usuariosTe` (console.table para debug).
- **Interactividad**: Clic tabla → cronómetro (e.g., Verde: 2-3 min), buscador para filtrar filas, reloj Canvas (horas/minutos/segundos).
- **Consola/Debug**: Logs (tabla generada, usuarios cargados, validaciones), warnings si elementos faltan.
- **Tema Oscuro**: Adaptación completa (gradientes --bg-tea-dark, cards #1e1e1e, tabla #2a4a2a, botones invertidos); detecta prefers-color-scheme.
- **Bootstrap Integrado**: Carousel auto, toasts, modals; sin conflictos con JS.
