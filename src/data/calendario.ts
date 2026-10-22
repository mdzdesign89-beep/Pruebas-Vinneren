/** Tono visual de la tarjeta de turno (fondo + barra de estado). */
export type TonoTurno = "ok" | "warn" | "bad" | "bad-sutil"

export interface Turno {
  id: string
  nombre: string
  lugar: string
  horario: string
  voluntarios: string[]
  cupo: number
  minimo: number
  /** Estado tal como está en el diseño; se recalcula cuando cambian los asignados. */
  tono: TonoTurno
  etiqueta: string
  conflicto?: string
}

export interface Actividad {
  id: string
  nombre: string
  lugar: string
  horario: string
  resumen: string
  resumenTono: "ok" | "warn" | "bad"
  responsable: string
  /** Abierta por defecto en la vista por turnos. */
  abierta: boolean
  turnos: Turno[]
}

export interface Dia {
  id: string
  titulo: string
  corto: string
  resumen: string
  actividades: Actividad[]
}

// Bolsa de voluntarios de prueba para rellenar los turnos.
export const VOLUNTARIOS = [
  "Ana Torres", "Luis Hernández", "Mariana Gómez", "Carlos Ruiz", "Sofía Ramírez",
  "Diego Castro", "Valeria Núñez", "Jorge Méndez", "Paola Ríos", "Andrés Vega",
]

const vol = (n: number, desde = 0) =>
  Array.from({ length: n }, (_, i) => VOLUNTARIOS[(desde + i) % VOLUNTARIOS.length])

export const dias: Dia[] = [
  {
    id: "vie-12",
    titulo: "Viernes 12",
    corto: "Vie 12",
    resumen: "6 turnos · 1 bajo mínimo",
    actividades: [
      {
        id: "vie-operacion", nombre: "Operación general", lugar: "Acceso y logística", horario: "08:00–18:00",
        resumen: "2 turnos · 1 bajo mínimo", resumenTono: "bad", responsable: "Lucía Mendoza", abierta: true,
        turnos: [
          { id: "vie-registro", nombre: "Registro y acreditación", lugar: "Acceso y registro", horario: "08:00 – 11:00", voluntarios: vol(4, 3), cupo: 6, minimo: 5, tono: "warn", etiqueta: "Abierto" },
          { id: "vie-carga", nombre: "Carga de insumos", lugar: "Logística", horario: "14:00 – 18:00", voluntarios: vol(3, 5), cupo: 5, minimo: 4, tono: "bad", etiqueta: "mín 6" },
        ],
      },
      { id: "vie-inauguracion", nombre: "Inauguración", lugar: "Escenario Principal", horario: "10:00–14:00", resumen: "2 turnos · cubierto", resumenTono: "ok", responsable: "Lucía Mendoza", abierta: false, turnos: [] },
      { id: "vie-musica", nombre: "Taller de música", lugar: "Sala de Talleres", horario: "15:00–18:00", resumen: "2 turnos · cubierto", resumenTono: "ok", responsable: "Lucía Mendoza", abierta: false, turnos: [] },
    ],
  },
  {
    id: "sab-13",
    titulo: "Sábado 13",
    corto: "Sáb 13",
    resumen: "11 turnos · 1 conflicto",
    actividades: [
      { id: "sab-operacion", nombre: "Operación general", lugar: "Acceso y logística", horario: "08:00–22:00", resumen: "2 turnos · cubierto", resumenTono: "ok", responsable: "Lucía Mendoza", abierta: false, turnos: [] },
      { id: "sab-talleres", nombre: "Talleres", lugar: "Sala de Talleres", horario: "09:00–17:00", resumen: "2 turnos · 1 en riesgo", resumenTono: "warn", responsable: "Lucía Mendoza", abierta: false, turnos: [] },
      {
        id: "sab-infantil", nombre: "Programa infantil", lugar: "Foro Jardín", horario: "12:00–16:00",
        resumen: "3 turnos · 1 bajo mínimo", resumenTono: "bad", responsable: "Iván Torres", abierta: true,
        turnos: [
          { id: "sab-montaje", nombre: "Montaje", lugar: "Foro Jardín", horario: "10:00 – 12:00", voluntarios: vol(3, 6), cupo: 3, minimo: 3, tono: "ok", etiqueta: "Cubierto" },
          { id: "sab-atencion", nombre: "Atención al público", lugar: "Foro Jardín", horario: "12:00 – 16:00", voluntarios: vol(3), cupo: 6, minimo: 4, tono: "bad", etiqueta: "mín 6", conflicto: "Ana Torres también está en Apoyo en taller 2 (13:00–17:00)" },
          { id: "sab-guias", nombre: "Guías de actividad", lugar: "Foro Jardín", horario: "12:00 – 16:00", voluntarios: vol(2, 8), cupo: 2, minimo: 2, tono: "ok", etiqueta: "Cubierto" },
        ],
      },
      {
        id: "sab-cierre", nombre: "Show de cierre", lugar: "Escenario Principal", horario: "16:00–20:00",
        resumen: "4 turnos · 2 bajo mínimo", resumenTono: "bad", responsable: "Lucía Mendoza", abierta: true,
        turnos: [
          { id: "sab-montaje-cierre", nombre: "Montaje", lugar: "Escenario Principal", horario: "13:00 – 16:00", voluntarios: vol(4, 3), cupo: 4, minimo: 4, tono: "ok", etiqueta: "Cubierto" },
          { id: "sab-acomodadores", nombre: "Acomodadores", lugar: "Escenario Principal", horario: "15:30 – 20:00", voluntarios: vol(3, 7), cupo: 6, minimo: 4, tono: "bad", etiqueta: "mín 6" },
          { id: "sab-seguridad", nombre: "Seguridad y accesos", lugar: "Escenario Principal", horario: "15:30 – 20:30", voluntarios: vol(2, 1), cupo: 2, minimo: 2, tono: "ok", etiqueta: "Cubierto" },
          { id: "sab-desmontaje", nombre: "Desmontaje", lugar: "Escenario Principal", horario: "20:00 – 22:00", voluntarios: [], cupo: 4, minimo: 3, tono: "bad-sutil", etiqueta: "Bajo mínimo" },
        ],
      },
    ],
  },
  {
    id: "dom-14",
    titulo: "Domingo 14",
    corto: "Dom 14",
    resumen: "8 turnos · 1 conflicto",
    actividades: [
      {
        id: "dom-operacion", nombre: "Operación general", lugar: "Acceso y logística", horario: "08:00–15:00",
        resumen: "2 turnos · 1 bajo mínimo", resumenTono: "bad", responsable: "Lucía Mendoza", abierta: true,
        turnos: [
          { id: "dom-registro", nombre: "Registro y acreditación", lugar: "Acceso y registro", horario: "08:00 – 12:00", voluntarios: vol(6, 2), cupo: 6, minimo: 5, tono: "ok", etiqueta: "Cubierto" },
          { id: "dom-desmontaje-general", nombre: "Desmontaje general", lugar: "Logística", horario: "12:00 – 15:00", voluntarios: vol(3, 4), cupo: 5, minimo: 4, tono: "bad", etiqueta: "mín 6" },
        ],
      },
      { id: "dom-infantil", nombre: "Programa infantil", lugar: "Foro Jardín", horario: "12:00–16:00", resumen: "2 turnos · cubierto", resumenTono: "ok", responsable: "Iván Torres", abierta: false, turnos: [] },
      {
        id: "dom-show", nombre: "Show final", lugar: "Escenario Principal", horario: "16:00–20:00",
        resumen: "2 turnos · 1 bajo mínimo", resumenTono: "bad", responsable: "Lucía Mendoza", abierta: true,
        turnos: [
          { id: "dom-acomodadores", nombre: "Acomodadores", lugar: "Escenario Principal", horario: "15:30 – 20:00", voluntarios: vol(6, 4), cupo: 6, minimo: 4, tono: "ok", etiqueta: "Cubierto" },
          { id: "dom-desmontaje", nombre: "Desmontaje", lugar: "Escenario Principal", horario: "20:00 – 22:00", voluntarios: vol(2, 9), cupo: 4, minimo: 3, tono: "bad-sutil", etiqueta: "mín 6" },
        ],
      },
    ],
  },
]

/** Estado derivado de la cobertura, usado cuando el usuario cambia los asignados. */
export function estadoPorCobertura(t: Pick<Turno, "voluntarios" | "cupo" | "minimo">): Pick<Turno, "tono" | "etiqueta"> {
  const n = t.voluntarios.length
  if (n >= t.cupo) return { tono: "ok", etiqueta: "Cubierto" }
  if (n < t.minimo) return { tono: n === 0 ? "bad-sutil" : "bad", etiqueta: "Bajo mínimo" }
  return { tono: "warn", etiqueta: "Abierto" }
}
