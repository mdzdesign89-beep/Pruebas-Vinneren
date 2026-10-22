import alerta from "@/assets/icons/alerta.svg"
import reloj from "@/assets/icons/reloj.svg"
import type { TonoTurno, Turno } from "@/data/calendario"
import { cn } from "@/lib/utils"

const tonos: Record<TonoTurno, { card: string; etiqueta: string; barra: string; pista: string }> = {
  ok: { card: "bg-estado-ok-bg", etiqueta: "text-estado-ok-text", barra: "bg-barra-ok", pista: "bg-barra-pista-ok" },
  warn: { card: "bg-estado-warn-bg", etiqueta: "text-estado-warn-text", barra: "bg-barra-warn", pista: "bg-barra-pista-warn" },
  bad: { card: "bg-estado-bad-bg", etiqueta: "text-estado-bad-text", barra: "bg-barra-bad", pista: "bg-barra-pista-bad" },
  "bad-sutil": { card: "bg-superficie-elevada", etiqueta: "text-estado-bad-text", barra: "bg-barra-bad", pista: "bg-barra-pista-bad" },
}

interface ShiftCardProps {
  turno: Turno
  selected: boolean
  onSelect: () => void
}

export function ShiftCard({ turno, selected, onSelect }: ShiftCardProps) {
  const t = tonos[turno.tono]
  const cubiertos = turno.voluntarios.length
  const pct = Math.min(100, (cubiertos / turno.cupo) * 100)

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "relative flex w-full shrink-0 cursor-pointer flex-col gap-8 overflow-hidden rounded-xl py-12 pl-16 pr-12 text-left shadow-e1 transition-shadow hover:shadow-e2",
        t.card,
        selected && "outline-[2.5px] -outline-offset-[2.5px] outline-accion-primaria outline-solid",
      )}
    >
      <span aria-hidden className={cn("absolute inset-y-0 left-0 w-4", t.barra)} />
      <span className="flex w-full items-center gap-8">
        <span className="min-w-0 flex-1 truncate text-etiqueta-l text-neutro-ink-600">{turno.lugar}</span>
        <span className={cn("shrink-0 text-titulo-xs", t.etiqueta)}>{turno.etiqueta}</span>
      </span>
      <span className="text-titulo-s text-texto-primario">{turno.nombre}</span>
      <span className="flex items-center gap-8 text-cuerpo-s text-texto-secundario">
        <img src={reloj} alt="" width={14} height={14} className="size-14" />
        {turno.horario}
      </span>
      <span className="flex w-full items-center justify-between">
        <span className="text-titulo-xs text-texto-primario">
          {cubiertos}/{turno.cupo}
        </span>
        <span className="text-cuerpo-s text-neutro-ink-600">mín {turno.minimo}</span>
        <span
          role="meter"
          aria-label="Cobertura"
          aria-valuemin={0}
          aria-valuemax={turno.cupo}
          aria-valuenow={cubiertos}
          className={cn("h-6 w-112 overflow-hidden rounded-[3px]", t.pista)}
        >
          <span className={cn("block h-full rounded-[3px]", t.barra)} style={{ width: `${pct}%` }} />
        </span>
      </span>
      {turno.conflicto && (
        <span className="flex items-center gap-8 text-titulo-xs text-estado-bad-text">
          <img src={alerta} alt="" width={14} height={14} className="size-14" />
          Empalme de horario
        </span>
      )}
    </button>
  )
}
