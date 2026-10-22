import { NavLink } from "react-router-dom"
import calendario from "@/assets/icons/calendario.svg"
import escenarios from "@/assets/icons/escenarios.svg"
import settings from "@/assets/icons/settings.svg"
import turnos from "@/assets/icons/turnos.svg"
import voluntarios from "@/assets/icons/voluntarios.svg"
import { Icon } from "@/components/ui/Icon"
import { cn } from "@/lib/utils"

function DashboardIcon() {
  // En Figma este icono son cuatro rectángulos con trazo, no un asset vectorial.
  return (
    <span aria-hidden className="relative size-16 shrink-0">
      {["left-2 top-2", "left-9 top-2", "left-2 top-9", "left-9 top-9"].map((pos) => (
        <span key={pos} className={cn("absolute size-5 rounded-[1.5px] border-[1.25px] border-current", pos)} />
      ))}
    </span>
  )
}

interface NavItem {
  to: string
  label: string
  icon: string | null
}

const principal: NavItem[] = [
  { to: "/", label: "Dashboard", icon: null },
  { to: "/calendario", label: "Calendario", icon: calendario },
  { to: "/turnos", label: "Turnos", icon: turnos },
  { to: "/voluntarios", label: "Voluntarios", icon: voluntarios },
]

const secundaria: NavItem[] = [
  { to: "/escenarios", label: "Escenarios y actividades", icon: escenarios },
  { to: "/settings", label: "Settings", icon: settings },
]

function Item({ to, label, icon }: NavItem) {
  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          cn(
            "flex h-33 w-full items-center gap-12 rounded-md px-12 transition-colors",
            isActive
              ? "bg-texto-inverso/16 text-titulo-s text-texto-inverso"
              : "text-navegacion-l text-texto-inverso/90 hover:bg-texto-inverso/8",
          )
        }
      >
        {icon ? <Icon src={icon} size={16} /> : <DashboardIcon />}
        <span className="min-w-0 flex-1 truncate">{label}</span>
      </NavLink>
    </li>
  )
}

export function Sidebar() {
  return (
    <nav
      aria-label="Navegación principal"
      className="hidden h-full w-240 shrink-0 flex-col gap-4 border-r border-borde-fuerte bg-linear-to-b from-marca-plum-800 via-marca-brand-700 via-55% to-acento-700 px-16 py-20 md:flex"
    >
      <div className="flex items-center gap-12 px-8 pb-20">
        <span className="size-28 shrink-0 rounded-[6px] bg-superficie-elevada" />
        <span className="text-titulo-m text-texto-inverso/90">Turnos Festival</span>
      </div>
      <ul className="flex flex-col gap-4">
        {principal.map((n) => (
          <Item key={n.to} {...n} />
        ))}
      </ul>
      <div className="mb-8 mt-24 h-px w-full bg-texto-inverso/18" />
      <ul className="flex flex-col gap-4">
        {secundaria.map((n) => (
          <Item key={n.to} {...n} />
        ))}
      </ul>
    </nav>
  )
}
