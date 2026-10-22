import { useState } from "react"
import { DayColumn } from "@/components/calendario/DayColumn"
import { PeriodSelector, type Vista } from "@/components/calendario/PeriodSelector"
import { ShiftDetailPanel } from "@/components/calendario/ShiftDetailPanel"
import { AppShell } from "@/components/layout/AppShell"
import { Button } from "@/components/ui/Button"
import { dias as diasIniciales, estadoPorCobertura, VOLUNTARIOS, type Turno } from "@/data/calendario"
import { cn } from "@/lib/utils"

type VerPor = "actividades" | "turnos"

const filtros = ["Escenario", "Cobertura", "Responsable"]

function buscarTurno(dias: typeof diasIniciales, id: string | null) {
  for (const dia of dias)
    for (const actividad of dia.actividades)
      for (const turno of actividad.turnos) if (turno.id === id) return { dia, actividad, turno }
  return null
}

const abiertasPorDefecto = () =>
  new Set(diasIniciales.flatMap((d) => d.actividades.filter((a) => a.abierta).map((a) => a.id)))

export default function CalendarPage() {
  const [dias, setDias] = useState(diasIniciales)
  const [verPor, setVerPor] = useState<VerPor>("turnos")
  const [abiertas, setAbiertas] = useState(abiertasPorDefecto)
  const [selectedId, setSelectedId] = useState<string | null>("sab-atencion")
  const [vista, setVista] = useState<Vista>("semana")
  const [diaIdx, setDiaIdx] = useState(1)

  const seleccion = buscarTurno(dias, selectedId)

  const updateTurno = (id: string, fn: (t: Turno) => Turno) =>
    setDias((ds) =>
      ds.map((d) => ({
        ...d,
        actividades: d.actividades.map((a) => ({
          ...a,
          turnos: a.turnos.map((t) => (t.id === id ? fn(t) : t)),
        })),
      })),
    )

  const setVoluntarios = (t: Turno, voluntarios: string[]): Turno => ({
    ...t,
    voluntarios,
    ...estadoPorCobertura({ ...t, voluntarios }),
  })

  const asignar = (t: Turno) => {
    const libre = VOLUNTARIOS.find((v) => !t.voluntarios.includes(v))
    if (libre) updateTurno(t.id, (x) => setVoluntarios(x, [...x.voluntarios, libre]))
  }

  const toggleActividad = (id: string) =>
    setAbiertas((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const cambiarVerPor = (v: VerPor) => {
    setVerPor(v)
    setAbiertas(v === "actividades" ? new Set() : abiertasPorDefecto())
  }

  const visibles = vista === "dia" ? [dias[diaIdx]] : dias
  const rango =
    vista === "dia" ? `${dias[diaIdx].corto} nov` : `${dias[0].corto} – ${dias[dias.length - 1].corto} nov`

  return (
    <AppShell title="Calendario">
      <main className="flex min-h-0 w-full flex-1 flex-col gap-16 overflow-y-auto px-16 py-24 sm:px-32 lg:overflow-hidden">
        <div className="flex w-full flex-wrap items-center gap-16">
          <div role="group" aria-label="Ver por" className="flex overflow-hidden rounded-md bg-superficie-elevada shadow-e1">
            {(["actividades", "turnos"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={verPor === v}
                onClick={() => cambiarVerPor(v)}
                className={cn(
                  "cursor-pointer rounded-md px-16 py-8 capitalize",
                  verPor === v
                    ? "bg-superficie-seleccionada text-titulo-s text-texto-acento"
                    : "text-cuerpo-m text-texto-primario hover:bg-superficie-hover",
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-8">
            {filtros.map((f) => (
              <button
                key={f}
                type="button"
                className="cursor-pointer whitespace-pre rounded-[6px] border border-borde-fuerte bg-superficie-elevada px-12 py-8 text-cuerpo-m text-texto-primario hover:bg-superficie-hover"
              >
                {`${f}  ▾`}
              </button>
            ))}
          </div>
          <Button variant="primary" className="ml-auto">
            Crear turno
          </Button>
        </div>

        <div className="flex w-full flex-col gap-16 lg:min-h-0 lg:flex-1 lg:flex-row">
          <div className="relative flex min-h-[600px] min-w-0 flex-1 lg:min-h-0">
            <div className="flex h-full w-full gap-12 overflow-x-auto rounded-xl bg-superficie-elevada p-12 pb-0 shadow-e1">
              {visibles.map((dia) => (
                <DayColumn
                  key={dia.id}
                  dia={dia}
                  abiertas={abiertas}
                  onToggleActividad={toggleActividad}
                  selectedId={selectedId}
                  onSelectTurno={setSelectedId}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center px-16">
              <div className="pointer-events-auto">
                <PeriodSelector
                  rango={rango}
                  vista={vista}
                  onVista={setVista}
                  onPrev={vista === "dia" && diaIdx > 0 ? () => setDiaIdx((i) => i - 1) : undefined}
                  onNext={vista === "dia" && diaIdx < dias.length - 1 ? () => setDiaIdx((i) => i + 1) : undefined}
                />
              </div>
            </div>
          </div>

          {seleccion && (
            <div className="lg:h-full">
              <ShiftDetailPanel
                {...seleccion}
                onAsignar={() => asignar(seleccion.turno)}
                onQuitar={(nombre) =>
                  updateTurno(seleccion.turno.id, (t) => setVoluntarios(t, t.voluntarios.filter((v) => v !== nombre)))
                }
                onResolverConflicto={() => updateTurno(seleccion.turno.id, (t) => ({ ...t, conflicto: undefined }))}
              />
            </div>
          )}
        </div>
      </main>
    </AppShell>
  )
}
