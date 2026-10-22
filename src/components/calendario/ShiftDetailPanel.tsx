import agregar from "@/assets/icons/agregar.svg"
import avatar from "@/assets/icons/avatar-sm.svg"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import type { Actividad, Dia, Turno } from "@/data/calendario"
import { cn } from "@/lib/utils"

interface ShiftDetailPanelProps {
  dia: Dia
  actividad: Actividad
  turno: Turno
  onAsignar: () => void
  onQuitar: (nombre: string) => void
  onResolverConflicto: () => void
}

const divider = <div className="h-2 w-full shrink-0 bg-borde-fuerte" />

function Persona({ nombre, accion, onAccion }: { nombre: string; accion: string; onAccion?: () => void }) {
  return (
    <li className="flex w-full items-center gap-8 py-4">
      <img src={avatar} alt="" width={24} height={24} className="size-24 shrink-0" />
      <span className="min-w-0 flex-1 truncate text-cuerpo-m text-texto-primario">{nombre}</span>
      <button type="button" onClick={onAccion} className="cursor-pointer text-cuerpo-s text-texto-acento hover:underline">
        {accion}
      </button>
    </li>
  )
}

export function ShiftDetailPanel({ dia, actividad, turno, onAsignar, onQuitar, onResolverConflicto }: ShiftDetailPanelProps) {
  const asignados = turno.voluntarios.length
  const lleno = asignados >= turno.cupo
  const minimoPct = (turno.minimo / turno.cupo) * 100

  return (
    <Card
      aria-label="Detalle del turno"
      className="flex h-full w-full shrink-0 flex-col gap-12 overflow-y-auto px-16 py-20 lg:w-304"
    >
      <div className="flex flex-col gap-4 rounded-lg bg-accion-primaria p-12">
        <p className="text-etiqueta-l text-texto-inverso/90">{turno.nombre}</p>
        <p className="text-titulo-m text-texto-inverso">
          {dia.corto} · {turno.horario.replace(" – ", "–")}
        </p>
        <p className="text-cuerpo-s text-texto-inverso/90">
          {actividad.nombre} · {actividad.lugar}
        </p>
      </div>

      <section className="flex flex-col gap-8">
        <h3 className="text-titulo-s text-texto-primario">Responsable</h3>
        <ul>
          <Persona nombre={actividad.responsable} accion="Contactar" />
        </ul>
      </section>

      {divider}

      <section className="flex flex-col gap-8">
        <h3 className="text-titulo-s text-texto-primario">Cobertura del turno</h3>
        <div className="flex w-full gap-4" role="img" aria-label={`${asignados} de ${turno.cupo} asignados, mínimo ${turno.minimo}`}>
          {Array.from({ length: turno.cupo }, (_, i) => (
            <span
              key={i}
              className={cn("h-10 min-w-0 flex-1 rounded-[3px]", i < asignados ? "bg-accion-primaria" : "bg-acento-300")}
            />
          ))}
        </div>
        <div className="relative h-14 w-full text-[10px] font-medium text-texto-acento">
          <span className="absolute left-0 top-4 whitespace-nowrap">
            {asignados} asignado{asignados === 1 ? "" : "s"}
          </span>
          <span className="absolute top-0 h-6 w-px bg-accion-primaria" style={{ left: `${minimoPct}%` }} />
          <span className="absolute top-4 -translate-x-1/2 whitespace-nowrap" style={{ left: `${minimoPct}%` }}>
            mín {turno.minimo}
          </span>
          <span className="absolute right-10 top-4 whitespace-nowrap">cupo {turno.cupo}</span>
        </div>
        <Button size="sm" className="h-32 self-start">
          Editar cupo del turno
        </Button>
      </section>

      {turno.conflicto && (
        <>
          {divider}
          <section className="flex flex-col gap-12">
            <h3 className="text-titulo-s text-texto-primario">Empalme de horario</h3>
            <p className="rounded-md bg-estado-bad-bg px-12 py-8 text-etiqueta-l text-estado-bad-text">
              ⚠ {turno.conflicto}
            </p>
            <Button className="w-full justify-center border-borde-fuerte" onClick={onResolverConflicto}>
              Resolver conflicto
            </Button>
          </section>
        </>
      )}

      {divider}

      <section className="flex flex-col gap-12">
        <h3 className="text-titulo-s text-texto-primario">Asignados</h3>
        {asignados > 0 ? (
          <ul className="flex flex-col gap-8">
            {turno.voluntarios.map((v) => (
              <Persona key={v} nombre={v} accion="Quitar" onAccion={() => onQuitar(v)} />
            ))}
          </ul>
        ) : (
          <p className="text-cuerpo-s text-texto-terciario">Aún no hay voluntarios en este turno.</p>
        )}
        <Button variant="primary" className="w-full justify-center" onClick={onAsignar} disabled={lleno}>
          Asignar voluntarios
          <img src={agregar} alt="" width={20} height={20} className="size-20" />
        </Button>
      </section>
    </Card>
  )
}
