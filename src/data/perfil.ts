import { VOLUNTARIOS } from "@/data/calendario"
import type { TurnoFila } from "@/data/turnos"

/** Color de cada habilidad: reutiliza los tokens color/tipo/* del sistema. */
export const tonoHabilidad: Record<string, string> = {
  Atención: "bg-tipo-atencion-bg text-tipo-atencion-text",
  Seguridad: "bg-tipo-seguridad-bg text-tipo-seguridad-text",
  Accesos: "bg-tipo-seguridad-bg text-tipo-seguridad-text",
  Registro: "bg-tipo-registro-bg text-tipo-registro-text",
  "Food handling": "bg-tipo-food-bg text-tipo-food-text",
  Logística: "bg-tipo-logistica-bg text-tipo-logistica-text",
  Montaje: "bg-tipo-logistica-bg text-tipo-logistica-text",
  Producción: "bg-tipo-produccion-bg text-tipo-produccion-text",
}
export const tonoHabilidadNeutro = "bg-estado-neutral-bg text-estado-neutral-text"

export interface Voluntariado {
  evento: string
  detalle: string
  asistio: boolean
}

// Eventos del frame "Overlay · Voluntario · Historial"; es el mismo para todos
// los voluntarios con experiencia porque Figma no define uno por persona. Las
// faltas se marcan según `faltas` de cada voluntario.
export const historialBase: Voluntariado[] = [
  { evento: "Maratón Ciudad 2025", detalle: "12 oct 2025 · Paseo de la Reforma", asistio: true },
  { evento: "Feria del Libro 2025", detalle: "30 ago 2025 · Centro de Convenciones", asistio: true },
  { evento: "Jornada de Reforestación", detalle: "14 jun 2025 · Bosque de Tlalpan", asistio: true },
  { evento: "Festival de Primavera", detalle: "22 mar 2025 · Parque Central", asistio: true },
  { evento: "Colecta Invernal 2024", detalle: "7 dic 2024 · Plaza Mayor", asistio: true },
  { evento: "Carrera Nocturna 2024", detalle: "19 oct 2024 · Circuito Sur", asistio: true },
  { evento: "Expo Salud 2024", detalle: "3 ago 2024 · Centro Cívico", asistio: true },
]

export interface Empalme {
  turno: string
  dia: string
  inicio: string
  fin: string
  lugar: string
  responsable: string
}

export interface TurnoAbierto extends TurnoFila {
  /** Nombre largo de la actividad, p. ej. "Atención al público". */
  actividad: string
  /** Habilidad del banco que pide el turno; filtra "Turnos donde encaja". */
  habilidad: string
  /** Texto de estado del dropdown. */
  estadoDropdown: "Bajo mínimo" | "Abierto" | "En riesgo"
  /** Otro turno del voluntario que se cruza con este. */
  empalme?: Empalme
}

const vol = (n: number, desde = 0) =>
  Array.from({ length: n }, (_, i) => VOLUNTARIOS[(desde + i) % VOLUNTARIOS.length])

type Base = Omit<TurnoAbierto, "voluntarios" | "etiqueta"> & { asignados: number; desde?: number }
const turno = ({ asignados, desde = 0, ...t }: Base): TurnoAbierto => ({ ...t, voluntarios: vol(asignados, desde), etiqueta: "" })

// Opciones del frame "Dropdown · turnos disponibles", más dos turnos abiertos de
// la tabla de Turnos para cubrir otras habilidades del banco.
export const turnosAbiertos: TurnoAbierto[] = [
  turno({ id: "ta-atencion-sab", nombre: "Atención público", actividad: "Atención al público", habilidad: "Atención", lugar: "Foro Jardín", programa: "Programa infantil", dia: "Sáb 13", horario: "12:00 – 16:00", asignados: 5, cupo: 8, minimo: 6, tono: "bad", estadoDropdown: "Bajo mínimo", responsable: "Iván Torres" }),
  turno({ id: "ta-atencion-dom", nombre: "Atención público", actividad: "Atención al público", habilidad: "Atención", lugar: "Foro Jardín", programa: "Programa infantil", dia: "Dom 14", horario: "12:00 – 16:00", asignados: 6, desde: 3, cupo: 8, minimo: 6, tono: "warn", estadoDropdown: "Abierto", responsable: "Iván Torres" }),
  turno({
    id: "ta-registro-vie", nombre: "Registro", actividad: "Registro", habilidad: "Registro", lugar: "Acceso principal", dia: "Vie 12", horario: "10:00 – 15:00", asignados: 4, desde: 5, cupo: 6, minimo: 5, tono: "bad", estadoDropdown: "Bajo mínimo", responsable: "Lucía Mendoza",
    empalme: { turno: "Apoyo en taller 2", dia: "Vie 12", inicio: "13:00", fin: "17:00", lugar: "Sala de Talleres", responsable: "Lucía Mendoza" },
  }),
  turno({ id: "ta-seguridad-sab", nombre: "Seguridad", actividad: "Seguridad", habilidad: "Seguridad", lugar: "Escenario Principal", dia: "Sáb 13", horario: "16:00 – 20:00", asignados: 7, desde: 1, cupo: 10, minimo: 8, tono: "bad", estadoDropdown: "En riesgo", responsable: "Lucía Mendoza" }),
  turno({ id: "ta-food-dom", nombre: "Food handling", actividad: "Food handling", habilidad: "Food handling", lugar: "Zona de alimentos", dia: "Dom 14", horario: "12:00 – 16:00", asignados: 3, desde: 7, cupo: 6, minimo: 4, tono: "bad", estadoDropdown: "Bajo mínimo", responsable: "Lucía Mendoza" }),
  turno({ id: "ta-carga-vie", nombre: "Carga", actividad: "Logística", habilidad: "Logística", lugar: "Andén de carga", dia: "Vie 12", horario: "14:00 – 18:00", asignados: 3, desde: 5, cupo: 5, minimo: 4, tono: "bad", estadoDropdown: "Bajo mínimo", responsable: "Lucía Mendoza" }),
  turno({ id: "ta-cierre-sab", nombre: "Cierre", actividad: "Producción", habilidad: "Producción", lugar: "Foro Jardín", dia: "Sáb 13", horario: "20:00 – 22:00", asignados: 2, desde: 7, cupo: 6, minimo: 4, tono: "bad", estadoDropdown: "Bajo mínimo", responsable: "Iván Torres" }),
]

/** Horas que se cruzan dos rangos "HH:MM". */
export function horasDeEmpalme(t: TurnoAbierto): number {
  if (!t.empalme) return 0
  const min = (h: string) => {
    const [hh, mm] = h.split(":").map(Number)
    return hh * 60 + mm
  }
  const [ini, fin] = t.horario.split(" – ")
  const desde = Math.max(min(ini), min(t.empalme.inicio))
  const hasta = Math.min(min(fin), min(t.empalme.fin))
  return Math.max(0, Math.round((hasta - desde) / 60))
}
