import calendario from "@/assets/icons/calendario.svg"
import equipo from "@/assets/icons/equipo.svg"
import escenarios from "@/assets/icons/escenarios.svg"
import turnos from "@/assets/icons/turnos.svg"
import voluntarios from "@/assets/icons/voluntarios.svg"
import { cn } from "@/lib/utils"

function DashboardIcon() {
  // En Figma este icono son cuatro rectángulos con trazo, no un asset vectorial.
  return (
    <span aria-hidden className="relative size-16 shrink-0">
      {["left-2 top-2", "left-9 top-2", "left-2 top-9", "left-9 top-9"].map((pos) => (
        <span key={pos} className={cn("absolute size-5 rounded-[1.5px] border-[1.25px] border-texto-inverso", pos)} />
      ))}
    </span>
  )
}

const principal = [
  { id: "dashboard", label: "Dashboard", icon: null },
  { id: "calendario", label: "Calendario", icon: calendario },
  { id: "turnos", label: "Turnos", icon: turnos },
  { id: "voluntarios", label: "Voluntarios", icon: voluntarios },
]

const secundaria = [
  { id: "escenarios", label: "Escenarios y actividades", icon: escenarios },
  { id: "equipo", label: "Settings", icon: equipo },
]

interface SidebarProps {
  active: string
  onNavigate: (id: string) => void
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
  const item = (nav: { id: string; label: string; icon: string | null }) => {
    const isActive = nav.id === active
    return (
      <li key={nav.id}>
        <a
          href={`#${nav.id}`}
          aria-current={isActive ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault()
            onNavigate(nav.id)
          }}
          className={cn(
            "flex w-full items-center gap-8 rounded-md px-12 py-8 transition-colors",
            isActive
              ? "bg-texto-inverso/16 text-titulo-s text-accion-primaria"
              : "text-navegacion-l text-acento-300 hover:bg-texto-inverso/8",
          )}
        >
          {nav.icon ? (
            <img src={nav.icon} alt="" width={16} height={16} className="size-16 shrink-0" />
          ) : (
            <DashboardIcon />
          )}
          <span className="min-w-0 flex-1 truncate">{nav.label}</span>
        </a>
      </li>
    )
  }

  return (
    <nav
      aria-label="Navegación principal"
      className="hidden h-full w-240 shrink-0 flex-col gap-4 border-r border-borde-fuerte bg-linear-to-b from-marca-plum-800 via-marca-brand-700 via-55% to-acento-700 px-16 py-20 md:flex"
    >
      <div className="flex items-center gap-8 px-8 pb-20">
        <span className="size-28 shrink-0 rounded-[6px] bg-superficie-elevada" />
        <span className="text-titulo-m text-texto-inverso">Turnos Festival</span>
      </div>
      <ul className="flex flex-col gap-4">{principal.map(item)}</ul>
      <div className="mb-8 mt-24 h-px w-full bg-texto-inverso/18" />
      <ul className="flex flex-col gap-4">{secundaria.map(item)}</ul>
    </nav>
  )
}
