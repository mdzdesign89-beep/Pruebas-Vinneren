import type { ChipTone } from "@/components/ui/Chip"

export const kpis = [
  { label: "Cobertura global", value: "78%", hint: "412 de 528 horas-turno" },
  { label: "Turnos bajo el mínimo", value: "14", hint: "6 en las próximas 24 h" },
  { label: "Conflictos sin resolver", value: "5", hint: "Empalmes de horario" },
  { label: "Voluntarios sin turno", value: "37", hint: "de 312 inscritos" },
  { label: "Solicitudes de ajuste", value: "8", hint: "Pendientes de revisar" },
]

export type Estado = "Cerrado" | "Bajo mínimo" | "Abierto"

export const estadoTone: Record<Estado, ChipTone> = {
  Cerrado: "ok",
  "Bajo mínimo": "bad",
  Abierto: "atencion",
}

export interface Actividad {
  id: string
  nombre: string
  lugar: string
  turnos: number
  periodo: string
  cubiertos: number
  total: number
  minimo: number
  estado: Estado
}

export const actividades: Actividad[] = [
  { id: "registro", nombre: "Registro y acreditación", lugar: "Acceso principal", turnos: 6, periodo: "Vie 12 – Dom 14", cubiertos: 32, total: 34, minimo: 28, estado: "Cerrado" },
  { id: "montaje", nombre: "Montaje de escenario", lugar: "Escenario Principal", turnos: 3, periodo: "Vie 12", cubiertos: 18, total: 18, minimo: 15, estado: "Cerrado" },
  { id: "atencion", nombre: "Atención al público", lugar: "Foro Jardín", turnos: 8, periodo: "Sáb 13 – Dom 14", cubiertos: 31, total: 48, minimo: 36, estado: "Bajo mínimo" },
  { id: "logistica", nombre: "Logística y carga", lugar: "Andén de carga", turnos: 4, periodo: "Vie 12 – Dom 14", cubiertos: 17, total: 20, minimo: 16, estado: "Abierto" },
  { id: "talleres", nombre: "Talleres", lugar: "Sala de Talleres", turnos: 5, periodo: "Sáb 13 – Dom 14", cubiertos: 22, total: 25, minimo: 20, estado: "Cerrado" },
  { id: "seguridad", nombre: "Seguridad y accesos", lugar: "Perímetro norte", turnos: 6, periodo: "Vie 12 – Dom 14", cubiertos: 24, total: 30, minimo: 24, estado: "Abierto" },
  { id: "food", nombre: "Food handling", lugar: "Zona de alimentos", turnos: 4, periodo: "Sáb 13 – Dom 14", cubiertos: 12, total: 20, minimo: 16, estado: "Bajo mínimo" },
  { id: "produccion", nombre: "Producción de escenario", lugar: "Escenario Principal", turnos: 5, periodo: "Sáb 13 – Dom 14", cubiertos: 28, total: 30, minimo: 24, estado: "Cerrado" },
]

export const detalle = {
  actividad: "Feria del libro",
  horario: "Mie 10 - Sáb 13 · 11:00–19:00",
  contexto: "Programa infantil · Foro Jardín",
  pendientes: 5,
  totalTurnos: 8,
  turnos: [
    { id: "d14-18", horario: "Dom 14 · 18:00–20:00", asignados: 1, cupo: 6, tone: "atencion" },
    { id: "s13-18", horario: "Sáb 13 · 18:00–20:00", asignados: 2, cupo: 6, tone: "atencion" },
    { id: "d14-16", horario: "Dom 14 · 16:00–18:00", asignados: 3, cupo: 6, tone: "atencion" },
    { id: "s13-16", horario: "Sáb 13 · 16:00–18:00", asignados: 3, cupo: 6, tone: "bad" },
    { id: "d14-14", horario: "Dom 14 · 14:00–16:00", asignados: 4, cupo: 6, tone: "atencion" },
  ] satisfies { id: string; horario: string; asignados: number; cupo: number; tone: ChipTone }[],
  responsable: { iniciales: "LM", nombre: "Lucía Mendoza", rol: "Coordinación de voluntarios" },
  notas: "Turnos de cierre requieren experiencia en manejo de público. Confirmar radios con Producción.",
}

export const conflictos = [
  { id: "ana", nombre: "Ana Torres", detalle: "Foro Jardín 12:00 y Talleres 13:00" },
  { id: "luis", nombre: "Luis Hernández", detalle: "Montaje 08:00 y Acceso 09:00" },
  { id: "mariana", nombre: "Mariana Gómez", detalle: "Logística 16:00 y Foro 16:00" },
]

export const embudo = [
  { etapa: "Vio el anuncio", valor: 950 },
  { etapa: "Inició registro", valor: 430 },
  { etapa: "Completó registro", valor: 312 },
  { etapa: "Perfil completo", valor: 298 },
  { etapa: "Onboarding", valor: 284 },
]
