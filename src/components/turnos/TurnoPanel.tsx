import { useState } from "react"
import avatar from "@/assets/icons/avatar-sm.svg"
import { Button } from "@/components/ui/Button"
import { Chip } from "@/components/ui/Chip"
import type { TurnoFila } from "@/data/turnos"
import { cn } from "@/lib/utils"

const VISIBLES = 3

interface TurnoPanelProps {
  turno: TurnoFila
  onAsignar: () => void
  onQuitar: (nombre: string) => void
}

const divider = <div className="h-2 w-full shrink-0 bg-borde-fuerte" />

export function TurnoPanel({ turno, onAsignar, onQuitar }: TurnoPanelProps) {
  const [verTodos, setVerTodos] = useState(false)
  const asignados = turno.voluntarios.length
  const lleno = asignados >= turno.cupo
  const minimoPct = (turno.minimo / turno.cupo) * 100
  const lista = verTodos ? turno.voluntarios : turno.voluntarios.slice(0, VISIBLES)
  const ocultos = asignados - VISIBLES

  return (
    <aside
      aria-label="Detalle del turno"
      className="flex w-full shrink-0 flex-col gap-12 self-start rounded-md border border-borde-fuerte bg-superficie-elevada px-16 py-20 lg:w-360"
    >
      <div className="flex flex-col gap-4 rounded-lg bg-accion-primaria p-12">
        <p className="text-etiqueta-l text-texto-inverso/90">{turno.nombre}</p>
        <p className="text-titulo-m text-texto-inverso">
          {turno.dia} · {turno.horario.replace(" – ", "–")}
        </p>
        <p className="text-cuerpo-s text-texto-inverso/90">
          {turno.programa ? `${turno.programa} · ${turno.lugar}` : turno.lugar}
        </p>
      </div>

      <section className="flex flex-col gap-8">
        <h3 className="text-titulo-s text-texto-primario">Responsable</h3>
        <div className="flex items-center gap-8 py-4">
          <img src={avatar} alt="" width={24} height={24} className="size-24 shrink-0" />
          <span className="min-w-0 flex-1 truncate text-cuerpo-m text-texto-primario">{turno.responsable}</span>
          <a href="#contactar" className="text-cuerpo-s text-texto-acento hover:underline">
            Contactar
          </a>
        </div>
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
        <div className="relative h-14 w-full text-etiqueta-s">
          <span className="absolute left-0 top-4 whitespace-nowrap text-texto-acento">
            {asignados} asignado{asignados === 1 ? "" : "s"}
          </span>
          <span className="absolute top-0 h-6 w-px bg-texto-terciario" style={{ left: `${minimoPct}%` }} />
          <span
            className="absolute top-4 -translate-x-1/2 whitespace-nowrap text-texto-secundario"
            style={{ left: `${minimoPct}%` }}
          >
            mín {turno.minimo}
          </span>
          <span className="absolute right-0 top-4 whitespace-nowrap text-texto-terciario">cupo {turno.cupo}</span>
        </div>
        <Button className="h-32 self-start text-titulo-xs">Editar cupo del turno</Button>
      </section>

      {divider}

      <section className="flex flex-col gap-12">
        <h3 className="text-titulo-s text-texto-primario">Asignados ({asignados})</h3>
        {asignados > 0 ? (
          <ul className="flex flex-col gap-8">
            {lista.map((nombre) => (
              <li key={nombre} className="flex items-center gap-8">
                <img src={avatar} alt="" width={24} height={24} className="size-24 shrink-0" />
                <span className="min-w-0 flex-1 truncate text-cuerpo-m text-texto-primario">{nombre}</span>
                {turno.empalmes?.includes(nombre) && <Chip tone="bad">Empalme</Chip>}
                <button
                  type="button"
                  onClick={() => onQuitar(nombre)}
                  className="cursor-pointer text-cuerpo-s text-texto-terciario hover:text-texto-primario hover:underline"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-cuerpo-s text-texto-terciario">Aún no hay voluntarios en este turno.</p>
        )}
        {ocultos > 0 && (
          <button
            type="button"
            onClick={() => setVerTodos((v) => !v)}
            className="cursor-pointer self-start text-cuerpo-s text-texto-acento hover:underline"
          >
            {verTodos ? "Ver menos" : `+ ${ocultos} más`}
          </button>
        )}
        <Button variant="primary" className="w-full justify-center" onClick={onAsignar} disabled={lleno}>
          Asignar voluntarios
        </Button>
      </section>

      <Button className="h-32 w-full justify-center">Editar turno</Button>
    </aside>
  )
}
