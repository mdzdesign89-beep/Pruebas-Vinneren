# Turnos Festival · Dashboard

Prototipo en código del archivo Figma
[Prueba 3B](https://www.figma.com/design/V41NFGo60QdVjpq8Bdg5mu/Prueba-3B).

| Ruta | Pantalla | Frame |
| --- | --- | --- |
| `/` | Dashboard · A · Atención primero | [247:8115](https://www.figma.com/design/V41NFGo60QdVjpq8Bdg5mu/Prueba-3B?node-id=247-8115) |
| `/calendario` | Calendario · A2 · Vista por turnos | [175:5127](https://www.figma.com/design/V41NFGo60QdVjpq8Bdg5mu/Prueba-3B?node-id=175-5127) |

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + React Router + Inter (`@fontsource`).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

## Design tokens

`src/styles/tokens.css` replica la colección de variables **Tokens** (modo
"Claro") de Figma dentro de `@theme`, así que cada token es una utilidad de
Tailwind. La paleta por defecto de Tailwind está desactivada: solo existen
colores del sistema.

| Figma | CSS | Utilidad |
| --- | --- | --- |
| `color/texto/primario` | `--color-texto-primario` | `text-texto-primario` |
| `color/superficie/elevada` | `--color-superficie-elevada` | `bg-superficie-elevada` |
| `color/estado/ok-bg` | `--color-estado-ok-bg` | `bg-estado-ok-bg` |
| `espacio/16` | `--spacing: 1px` | `p-16`, `gap-16` |
| `radio/xl` | `--radius-xl` | `rounded-xl` |
| `Elevación/E1 · superficie` | `--shadow-e1` | `shadow-e1` |
| Estilo de texto `Título/S` | `@utility text-titulo-s` | `text-titulo-s` |

Los alias semánticos (`superficie/*`, `texto/*`, `borde/*`, `accion/*`) apuntan
a los primitivos con `var()`, igual que en Figma.

## Deploy

Vercel detecta Vite automáticamente: framework **Vite**, build `npm run build`,
output `dist`. `vercel.json` redirige todas las rutas a `index.html` para que
`/calendario` funcione al recargar.
