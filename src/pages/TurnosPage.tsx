import { useState } from "react"
import { AssignPanel } from "@/components/calendario/AssignPanel"
import { AppShell } from "@/components/layout/AppShell"
import { TurnoPanel } from "@/components/turnos/TurnoPanel"
import { TurnosTable } from "@/components/turnos/TurnosTable"
import { Button } from "@/components/ui/Button"
import { estadoPorCobertura } from "@/data/calendario"
import { etiquetaEstado, turnos as turnosIniciales, type TurnoFila } from "@/data/turnos"
import { cn } from "@/lib/utils"

const vistas = [
  { id: "tabla", label: "Tabla", disponible: true },
  { id: "tablero", label: "Tablero", disponible: false },
]

export default function TurnosPage() {
  const [turnos, setTurnos] = useState(turnosIniciales)
  const [selectedId, setSelectedId] = useState<string | null>("t-atencion")
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [asignandoId, setAsignandoId] = useState<string | null>(null)

  const seleccionado = turnos.find((t) => t.id === selectedId) ?? null
  const asignando = turnos.find((t) => t.id === asignandoId) ?? null

  const setVoluntarios = (id: string, fn: (v: string[]) => string[]) =>
    setTurnos((ts) =>
      ts.map((t): TurnoFila => {
        if (t.id !== id) return t
        const voluntarios = fn(t.voluntarios)
        const { tono } = estadoPorCobertura({ ...t, voluntarios })
        return {
          ...t,
          voluntarios,
          tono,
          etiqueta: etiquetaEstado[tono],
          empalmes: t.empalmes?.filter((n) => voluntarios.includes(n)),
        }
      }),
    )

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleAll = () =>
    setChecked((prev) => (prev.size === turnos.length ? new Set() : new Set(turnos.map((t) => t.id))))

  return (
    <AppShell title="Turnos">
      <main className="flex min-h-0 w-full flex-1 flex-col gap-24 overflow-y-auto bg-superficie-sutil p-16 sm:p-32">
        <div className="flex w-full items-center justify-between gap-16">
          <div role="group" aria-label="Vista" className="flex rounded-[6px] border border-borde-fuerte bg-superficie-elevada">
            {vistas.map((v) => {
              const active = v.id === "tabla"
              return (
                <button
                  key={v.id}
                  type="button"
                  aria-pressed={active}
                  disabled={!v.disponible}
                  title={v.disponible ? undefined : "Próximamente"}
                  className={cn(
                    "rounded-[6px] px-16 py-8",
                    active
                      ? "bg-superficie-seleccionada text-titulo-s text-acento-800"
                      : "cursor-not-allowed text-cuerpo-m text-texto-primario",
                  )}
                >
                  {v.label}
                </button>
              )
            })}
          </div>
          <Button variant="primary">Crear turno</Button>
        </div>

        <div className="flex w-full flex-col gap-16 lg:flex-row">
          <TurnosTable
            rows={turnos}
            selectedId={selectedId}
            onSelect={setSelectedId}
            checked={checked}
            onToggle={toggle}
            onToggleAll={toggleAll}
          />
          {seleccionado && (
            <TurnoPanel
              key={seleccionado.id}
              turno={seleccionado}
              onAsignar={() => setAsignandoId(seleccionado.id)}
              onQuitar={(nombre) => setVoluntarios(seleccionado.id, (v) => v.filter((n) => n !== nombre))}
            />
          )}
        </div>
      </main>

      {asignando && (
        <AssignPanel
          key={asignando.id}
          turno={asignando}
          fecha={asignando.dia}
          contexto={asignando.programa ? `${asignando.programa} · ${asignando.lugar}` : asignando.lugar}
          onClose={() => setAsignandoId(null)}
          onConfirm={(nombres) => setVoluntarios(asignando.id, (v) => [...v, ...nombres])}
        />
      )}
    </AppShell>
  )
}
