import fila from "@/assets/icons/arrastrar-fila.svg"
import { cn } from "@/lib/utils"

export type Vista = "dia" | "semana" | "mes"

const opciones: { id: Vista; label: string }[] = [
  { id: "dia", label: "Día" },
  { id: "semana", label: "Semana" },
  { id: "mes", label: "Mes" },
]

interface PeriodSelectorProps {
  rango: string
  vista: Vista
  onVista: (v: Vista) => void
  onPrev?: () => void
  onNext?: () => void
}

const nav =
  "flex size-36 shrink-0 cursor-pointer items-center justify-center rounded-pill bg-superficie-sutil text-dato-m text-texto-primario hover:bg-superficie-seleccionada disabled:cursor-default disabled:text-texto-deshabilitado disabled:hover:bg-superficie-sutil"

export function PeriodSelector({ rango, vista, onVista, onPrev, onNext }: PeriodSelectorProps) {
  return (
    <div
      role="toolbar"
      aria-label="Periodo"
      className="flex items-center gap-4 rounded-pill bg-superficie-elevada p-8 shadow-e3"
    >
      <span aria-hidden className="flex h-36 w-20 flex-col items-center justify-center gap-4">
        {[0, 1, 2].map((i) => (
          <img key={i} src={fila} alt="" width={10} height={3} className="h-3 w-10" />
        ))}
      </span>
      <span aria-hidden className="h-24 w-px bg-borde-fuerte" />
      <button type="button" aria-label="Periodo anterior" className={nav} onClick={onPrev} disabled={!onPrev}>
        ‹
      </button>
      <span className="whitespace-nowrap px-12 text-titulo-s text-texto-primario" aria-live="polite">
        {rango}
      </span>
      <button type="button" aria-label="Periodo siguiente" className={nav} onClick={onNext} disabled={!onNext}>
        ›
      </button>
      <span aria-hidden className="h-24 w-px bg-borde-fuerte" />
      {opciones.map((o) => {
        const active = o.id === vista
        const disabled = o.id === "mes"
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            disabled={disabled}
            title={disabled ? "Próximamente" : undefined}
            onClick={() => onVista(o.id)}
            className={cn(
              "cursor-pointer whitespace-nowrap rounded-pill px-20 py-8 transition-colors disabled:cursor-not-allowed",
              active
                ? "bg-accion-primaria text-titulo-s text-texto-inverso"
                : "text-navegacion-l text-texto-primario hover:bg-superficie-hover",
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
