export interface Recomendado {
  nombre: string
  iniciales: string
  historial: string
  historialTono: "ok" | "info" | "warn"
  /** La primera habilidad es la que coincide con el turno. */
  habilidades: [string, string]
}

// En Figma la lista repite a "Sofía León"; aquí se deja una sola vez.
export const recomendados: Recomendado[] = [
  { nombre: "Sofía León", iniciales: "SL", historial: "2 turnos · 0 faltas", historialTono: "ok", habilidades: ["Atención al público", "Food handling"] },
  { nombre: "Rubén Ortega", iniciales: "RO", historial: "7 turnos · 0 faltas", historialTono: "ok", habilidades: ["Atención al público", "Logística"] },
  { nombre: "Camila Fuentes", iniciales: "CF", historial: "Primer turno", historialTono: "info", habilidades: ["Atención al público", "Registro"] },
  { nombre: "Néstor Aguilar", iniciales: "NA", historial: "3 turnos · 1 falta", historialTono: "warn", habilidades: ["Atención al público", "Seguridad"] },
]
