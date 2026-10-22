import { VOLUNTARIOS, type TonoTurno, type Turno } from "@/data/calendario"

export interface TurnoFila extends Turno {
  dia: string
  /** Programa o actividad a la que pertenece; si falta, el encabezado muestra solo la locación. */
  programa?: string
  responsable: string
  /** Voluntarios asignados que tienen un empalme de horario con otro turno. */
  empalmes?: string[]
}

export const etiquetaEstado: Record<TonoTurno, string> = {
  ok: "Cubierto",
  warn: "En riesgo",
  bad: "Bajo mínimo",
  "bad-sutil": "Bajo mínimo",
}

const vol = (n: number, desde = 0) =>
  Array.from({ length: n }, (_, i) => VOLUNTARIOS[(desde + i) % VOLUNTARIOS.length])

type Base = Omit<TurnoFila, "etiqueta" | "voluntarios"> & { asignados: number; desde?: number }

const fila = ({ asignados, desde = 0, ...t }: Base): TurnoFila => ({
  ...t,
  voluntarios: vol(asignados, desde),
  etiqueta: etiquetaEstado[t.tono],
})

// Datos tal como aparecen en el frame "Turnos · A · Tabla + panel".
export const turnos: TurnoFila[] = [
  fila({ id: "t-montaje", nombre: "Montaje", lugar: "Escenario Principal", dia: "Vie 12", horario: "08:00 – 12:00", asignados: 8, desde: 2, cupo: 8, minimo: 6, tono: "ok", responsable: "Lucía Mendoza" }),
  fila({ id: "t-registro-vie", nombre: "Registro", lugar: "Acceso principal", dia: "Vie 12", horario: "08:00 – 11:00", asignados: 4, desde: 3, cupo: 6, minimo: 5, tono: "warn", responsable: "Lucía Mendoza" }),
  fila({ id: "t-carga", nombre: "Carga", lugar: "Andén de carga", dia: "Vie 12", horario: "14:00 – 18:00", asignados: 3, desde: 5, cupo: 5, minimo: 4, tono: "bad", responsable: "Lucía Mendoza" }),
  fila({ id: "t-apoyo", nombre: "Apoyo", lugar: "Sala de Talleres", dia: "Sáb 13", horario: "08:00 – 12:00", asignados: 4, desde: 6, cupo: 6, minimo: 5, tono: "warn", responsable: "Lucía Mendoza" }),
  fila({ id: "t-atencion", nombre: "Atención público", lugar: "Foro Jardín", dia: "Sáb 13", horario: "12:00 – 16:00", asignados: 5, cupo: 8, minimo: 6, tono: "bad", programa: "Programa infantil", responsable: "Iván Torres", empalmes: ["Ana Torres"] }),
  fila({ id: "t-taller2", nombre: "Taller 2", lugar: "Sala de Talleres", dia: "Sáb 13", horario: "13:00 – 17:00", asignados: 6, desde: 4, cupo: 6, minimo: 5, tono: "ok", responsable: "Lucía Mendoza" }),
  fila({ id: "t-show", nombre: "Show", lugar: "Escenario Principal", dia: "Sáb 13", horario: "16:00 – 20:00", asignados: 8, desde: 1, cupo: 10, minimo: 8, tono: "warn", responsable: "Lucía Mendoza" }),
  fila({ id: "t-cierre", nombre: "Cierre", lugar: "Foro Jardín", dia: "Sáb 13", horario: "20:00 – 22:00", asignados: 2, desde: 7, cupo: 6, minimo: 4, tono: "bad", responsable: "Iván Torres" }),
  fila({ id: "t-registro-dom", nombre: "Registro", lugar: "Acceso principal", dia: "Dom 14", horario: "08:00 – 12:00", asignados: 6, desde: 2, cupo: 6, minimo: 5, tono: "ok", responsable: "Lucía Mendoza" }),
  fila({ id: "t-show-final", nombre: "Show final", lugar: "Escenario Principal", dia: "Dom 14", horario: "16:00 – 20:00", asignados: 9, desde: 1, cupo: 10, minimo: 8, tono: "ok", responsable: "Lucía Mendoza" }),
]
