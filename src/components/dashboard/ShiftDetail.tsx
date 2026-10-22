import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Chip } from "@/components/ui/Chip"
import { detalle } from "@/data/dashboard"

export function ShiftDetail() {
  const [asignados, setAsignados] = useState<Record<string, number>>({})
  const [notas, setNotas] = useState(detalle.notas)

  return (
    <Card aria-label="Detalle de turno" className="flex h-full w-full shrink-0 flex-col p-16 xl:w-340">
      <div className="flex flex-col gap-4 rounded-lg bg-accion-primaria p-12">
        <p className="text-etiqueta-l text-texto-inverso/90">{detalle.actividad}</p>
        <p className="text-titulo-m text-texto-inverso">{detalle.horario}</p>
        <p className="text-cuerpo-s text-texto-inverso/90">{detalle.contexto}</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-8 py-12">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between whitespace-nowrap">
            <p className="text-titulo-xs text-texto-primario">
              Turnos con cupo pendiente · {detalle.pendientes} de {detalle.totalTurnos}
            </p>
            <a href="#turnos" className="text-etiqueta-l text-texto-acento hover:underline">
              Ver los {detalle.pendientes}
            </a>
          </div>
          <ul className="flex h-108 flex-col gap-4 overflow-y-auto">
            {detalle.turnos.map((t) => {
              const extra = asignados[t.id] ?? 0
              const lleno = t.asignados + extra >= t.cupo
              return (
                <li
                  key={t.id}
                  className="flex shrink-0 items-center gap-4 rounded-md border border-borde-fuerte bg-superficie-elevada p-8"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-4 whitespace-nowrap">
                    <p className="text-etiqueta-l text-texto-primario">{t.horario}</p>
                    <p className="text-cuerpo-s text-texto-terciario">
                      {t.asignados + extra} de {t.cupo} voluntarios
                    </p>
                  </div>
                  <Chip tone={lleno ? "ok" : t.tone} strong>
                    {lleno ? "Cerrado" : "Abierto"}
                  </Chip>
                  <Button
                    size="sm"
                    disabled={lleno}
                    onClick={() => setAsignados((a) => ({ ...a, [t.id]: extra + 1 }))}
                  >
                    Asignar
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="h-2 w-full shrink-0 bg-borde-fuerte" />

        <div className="flex flex-col gap-4">
          <p className="text-titulo-xs text-texto-primario">Responsable</p>
          <div className="flex items-center gap-8">
            <span className="flex size-24 shrink-0 items-center justify-center rounded-pill bg-acento-100 text-etiqueta-m text-acento-800">
              {detalle.responsable.iniciales}
            </span>
            <p className="whitespace-nowrap">
              <span className="text-[13px] font-semibold text-texto-secundario">{detalle.responsable.nombre}</span>
              <span className="text-[11px] text-texto-terciario"> · {detalle.responsable.rol}</span>
            </p>
          </div>
        </div>

        <label className="flex flex-col gap-4">
          <span className="text-titulo-xs text-texto-primario">Notas</span>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={3}
            className="h-70 w-full resize-none rounded-sm border border-borde-fuerte px-8 py-4 text-cuerpo-s text-texto-secundario"
          />
        </label>
      </div>
    </Card>
  )
}
