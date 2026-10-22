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
  faltas: number
  /** Fecha de registro, como se muestra en el perfil. */
  registro: string
}

// Datos del frame "Banco de voluntarios". Las habilidades ocultas tras "+N" no
// aparecen en Figma; se completan con habilidades del mismo catálogo.
export const voluntarios: Voluntario[] = [
  { id: "ar", nombre: "Ana Lucía Rivas", iniciales: "AR", telefono: "55 1842 7730", locacion: "Coyoacán", email: "a.rivas@ong.mx", habilidades: ["Logística", "Food handling"], estado: "Activo", turnos: 12, faltas: 0, registro: "12 de enero, 2024" },
  { id: "dh", nombre: "Diego Hernández", iniciales: "DH", telefono: "55 2910 4455", locacion: "Iztapalapa", email: "d.hernandez@ong.mx", habilidades: ["Seguridad", "Accesos"], estado: "Activo", turnos: 9, faltas: 1, registro: "3 de febrero, 2024" },
  { id: "ms", nombre: "Mariana Solís", iniciales: "MS", telefono: "55 7733 1208", locacion: "Benito Juárez", email: "m.solis@ong.mx", habilidades: ["Atención", "Registro", "Accesos", "Food handling"], estado: "Activo", turnos: 15, faltas: 0, registro: "20 de noviembre, 2023" },
  { id: "rc", nombre: "Rodrigo Cáceres", iniciales: "RC", telefono: "55 4418 9052", locacion: "Tlalpan", email: "r.caceres@ong.mx", habilidades: ["Montaje"], estado: "En onboarding", turnos: null, faltas: 0, registro: "2 de octubre, 2026" },
  { id: "vo", nombre: "Valeria Ocampo", iniciales: "VO", telefono: "55 4702 8831", locacion: "Iztacalco", email: "v.ocampo@ong.mx", habilidades: ["Atención", "Accesos"], estado: "Activo", turnos: 6, faltas: 0, registro: "15 de marzo, 2024" },
  { id: "pn", nombre: "Paola Nieto", iniciales: "PN", telefono: "55 6025 3317", locacion: "Cuauhtémoc", email: "p.nieto@ong.mx", habilidades: ["Primeros auxilios", "Atención"], visibles: 1, estado: "Activo", turnos: 7, faltas: 1, registro: "8 de abril, 2024" },
  { id: "jm", nombre: "Javier Mendoza", iniciales: "JM", telefono: "55 3177 6694", locacion: "Azcapotzalco", email: "j.mendoza@ong.mx", habilidades: ["Logística"], estado: "Inactivo", turnos: 4, faltas: 2, registro: "27 de julio, 2023" },
  { id: "st", nombre: "Sofía Trejo", iniciales: "ST", telefono: "55 8840 2261", locacion: "Coyoacán", email: "s.trejo@ong.mx", habilidades: ["Registro", "Atención"], estado: "Activo", turnos: 11, faltas: 0, registro: "9 de mayo, 2024" },
  { id: "ev", nombre: "Emiliano Vargas", iniciales: "EV", telefono: "55 1506 8873", locacion: "Álvaro Obregón", email: "e.vargas@ong.mx", habilidades: ["Producción", "Montaje"], visibles: 1, estado: "En onboarding", turnos: null, faltas: 0, registro: "6 de octubre, 2026" },
  { id: "dc", nombre: "Daniela Cruz", iniciales: "DC", telefono: "55 9264 5510", locacion: "Miguel Hidalgo", email: "d.cruz@ong.mx", habilidades: ["Food handling", "Logística"], estado: "Activo", turnos: 18, faltas: 1, registro: "14 de agosto, 2023" },
  { id: "ta", nombre: "Tomás Aguilar", iniciales: "TA", telefono: "55 8156 3390", locacion: "Coyoacán", email: "t.aguilar@ong.mx", habilidades: ["Montaje", "Logística"], visibles: 1, estado: "En onboarding", turnos: null, faltas: 0, registro: "10 de octubre, 2026" },
  { id: "ri", nombre: "Renata Ibáñez", iniciales: "RI", telefono: "55 3349 7725", locacion: "Benito Juárez", email: "r.ibanez@ong.mx", habilidades: ["Logística", "Registro"], estado: "Activo", turnos: 10, faltas: 0, registro: "1 de junio, 2024" },
  { id: "ob", nombre: "Óscar Beltrán", iniciales: "OB", telefono: "55 2038 7146", locacion: "V. Carranza", email: "o.beltran@ong.mx", habilidades: ["Seguridad"], estado: "Inactivo", turnos: 3, faltas: 1, registro: "18 de septiembre, 2023" },
]
