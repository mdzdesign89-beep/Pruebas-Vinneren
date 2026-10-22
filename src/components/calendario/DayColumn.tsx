import expandir from "@/assets/icons/expandir.svg"
import plegar from "@/assets/icons/plegar.svg"
import { ShiftCard } from "@/components/calendario/ShiftCard"
import type { Actividad, Dia } from "@/data/calendario"
import { cn } from "@/lib/utils"

const resumenTono = {
  ok: "text-estado-ok-text",
  warn: "text-estado-warn-text",
  bad: "text-estado-bad-text",
}

interface DayColumnProps {
  dia: Dia
  abiertas: Set<string>
  onToggleActividad: (id: string) => void
  selectedId: string | null
  onSelectTurno: (id: string) => void
}

function ActivityHeader({ actividad, abierta, onToggle }: { actividad: Actividad; abierta: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={abierta}
      className="flex w-full cursor-pointer items-center gap-8 rounded-lg bg-superficie-elevada py-8 pl-8 pr-12 text-left shadow-e2"
    >
      <img src={abierta ? plegar : expandir} alt="" width={16} height={16} className="size-16 shrink-0" />
      <span className="flex min-w-0 flex-1 flex-col gap-4">
        <span className="text-titulo-s text-texto-primario">{actividad.nombre}</span>
        <span className="text-cuerpo-s text-texto-terciario">
          {actividad.lugar} · {actividad.horario}
        </span>
        <span className={cn("text-etiqueta-l", resumenTono[actividad.resumenTono])}>{actividad.resumen}</span>
      </span>
    </button>
  )
}

export function DayColumn({ dia, abiertas, onToggleActividad, selectedId, onSelectTurno }: DayColumnProps) {
  return (
    <section
      aria-labelledby={`${dia.id}-titulo`}
      className="flex h-full min-w-0 flex-1 flex-col gap-12 overflow-y-auto bg-superficie-elevada p-12 pb-96"
    >
      <header className="flex flex-col gap-4 rounded-md bg-acento-50 px-12 py-8 whitespace-nowrap">
        <h2 id={`${dia.id}-titulo`} className="text-titulo-s text-acento-800">
          {dia.titulo}
        </h2>
        <p className="text-[10px] font-medium text-acento-700">{dia.resumen}</p>
      </header>

      {dia.actividades.map((a) => {
        const abierta = abiertas.has(a.id)
        return (
          <div key={a.id} className="flex w-full shrink-0 flex-col gap-8">
            <ActivityHeader actividad={a} abierta={abierta} onToggle={() => onToggleActividad(a.id)} />
            {abierta && a.turnos.length > 0 && (
              <div className="flex flex-col gap-8 border-l-2 border-borde-fuerte pl-12">
                {a.turnos.map((t) => (
                  <ShiftCard key={t.id} turno={t} selected={t.id === selectedId} onSelect={() => onSelectTurno(t.id)} />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}
