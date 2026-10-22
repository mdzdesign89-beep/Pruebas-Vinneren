import { Card } from "@/components/ui/Card"
import { embudo } from "@/data/dashboard"

// En Figma la barra del valor máximo mide 157px; el resto es proporcional.
const MAX_BAR = 157

export function FunnelChart() {
  const max = Math.max(...embudo.map((e) => e.valor))

  return (
    <Card aria-labelledby="embudo-title" className="flex min-w-0 flex-1 flex-col gap-12 p-20">
      <h2 id="embudo-title" className="text-titulo-m text-texto-primario">
        Embudo de voluntarios
      </h2>
      <ol className="flex h-197 items-end gap-4 overflow-hidden px-14">
        {embudo.map((e) => (
          <li key={e.etapa} className="flex w-94 min-w-0 flex-col items-center gap-4">
            <span className="text-titulo-s text-texto-primario">{e.valor}</span>
            <span
              aria-hidden
              className="w-70 rounded-t-[6px] bg-accion-primaria"
              style={{ height: Math.round((e.valor / max) * MAX_BAR) }}
            />
            <span className="h-16 w-full truncate text-center text-etiqueta-micro text-neutro-ink-600">
              {e.etapa}
            </span>
          </li>
        ))}
      </ol>
    </Card>
  )
}
