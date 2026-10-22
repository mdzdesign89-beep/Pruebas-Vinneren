export type EstadoVoluntario = "Activo" | "En onboarding" | "Inactivo"

export interface Voluntario {
  id: string
  nombre: string
  iniciales: string
  telefono: string
  locacion: string
  email: string
  habilidades: string[]
  /** Chips visibles antes del "+N"; en Figma depende del ancho de la primera habilidad. */
  visibles?: number
  estado: EstadoVoluntario
  /** null = aún no cubre turnos (se muestra "—"). */
  turnos: number | null
}

// Datos del frame "Banco de voluntarios". Las habilidades ocultas tras "+N" no
// aparecen en Figma; se completan con habilidades del mismo catálogo.
export const voluntarios: Voluntario[] = [
  { id: "ar", nombre: "Ana Lucía Rivas", iniciales: "AR", telefono: "55 1842 7730", locacion: "Coyoacán", email: "a.rivas@ong.mx", habilidades: ["Logística", "Food handling"], estado: "Activo", turnos: 12 },
  { id: "dh", nombre: "Diego Hernández", iniciales: "DH", telefono: "55 2910 4455", locacion: "Iztapalapa", email: "d.hernandez@ong.mx", habilidades: ["Seguridad", "Accesos"], estado: "Activo", turnos: 9 },
  { id: "ms", nombre: "Mariana Solís", iniciales: "MS", telefono: "55 7733 1208", locacion: "Benito Juárez", email: "m.solis@ong.mx", habilidades: ["Atención", "Registro", "Accesos", "Food handling"], estado: "Activo", turnos: 15 },
  { id: "rc", nombre: "Rodrigo Cáceres", iniciales: "RC", telefono: "55 4418 9052", locacion: "Tlalpan", email: "r.caceres@ong.mx", habilidades: ["Montaje"], estado: "En onboarding", turnos: null },
  { id: "vo", nombre: "Valeria Ocampo", iniciales: "VO", telefono: "55 4702 8831", locacion: "Iztacalco", email: "v.ocampo@ong.mx", habilidades: ["Atención", "Accesos"], estado: "Activo", turnos: 6 },
  { id: "pn", nombre: "Paola Nieto", iniciales: "PN", telefono: "55 6025 3317", locacion: "Cuauhtémoc", email: "p.nieto@ong.mx", habilidades: ["Primeros auxilios", "Atención"], visibles: 1, estado: "Activo", turnos: 7 },
  { id: "jm", nombre: "Javier Mendoza", iniciales: "JM", telefono: "55 3177 6694", locacion: "Azcapotzalco", email: "j.mendoza@ong.mx", habilidades: ["Logística"], estado: "Inactivo", turnos: 4 },
  { id: "st", nombre: "Sofía Trejo", iniciales: "ST", telefono: "55 8840 2261", locacion: "Coyoacán", email: "s.trejo@ong.mx", habilidades: ["Registro", "Atención"], estado: "Activo", turnos: 11 },
  { id: "ev", nombre: "Emiliano Vargas", iniciales: "EV", telefono: "55 1506 8873", locacion: "Álvaro Obregón", email: "e.vargas@ong.mx", habilidades: ["Producción", "Montaje"], visibles: 1, estado: "En onboarding", turnos: null },
  { id: "dc", nombre: "Daniela Cruz", iniciales: "DC", telefono: "55 9264 5510", locacion: "Miguel Hidalgo", email: "d.cruz@ong.mx", habilidades: ["Food handling", "Logística"], estado: "Activo", turnos: 18 },
  { id: "ta", nombre: "Tomás Aguilar", iniciales: "TA", telefono: "55 8156 3390", locacion: "Coyoacán", email: "t.aguilar@ong.mx", habilidades: ["Montaje", "Logística"], visibles: 1, estado: "En onboarding", turnos: null },
  { id: "ri", nombre: "Renata Ibáñez", iniciales: "RI", telefono: "55 3349 7725", locacion: "Benito Juárez", email: "r.ibanez@ong.mx", habilidades: ["Logística", "Registro"], estado: "Activo", turnos: 10 },
  { id: "ob", nombre: "Óscar Beltrán", iniciales: "OB", telefono: "55 2038 7146", locacion: "V. Carranza", email: "o.beltran@ong.mx", habilidades: ["Seguridad"], estado: "Inactivo", turnos: 3 },
]
