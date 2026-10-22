import exitoMarca from "@/assets/icons/exito-marca.svg"
import { cn } from "@/lib/utils"

export const PASO_BARRA_MS = 250
export const PASO_LISTA_MS = 80

/** Encabezado morado con el turno al que se asigna. */
export function TurnoDestino({ nombre, fecha, contexto }: { nombre: string; fecha: string; contexto: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-accion-primaria p-12">
      <p className="text-etiqueta-l text-texto-inverso/90">{nombre}</p>
      <p className="text-titulo-m text-texto-inverso">{fecha}</p>
      <p className="text-cuerpo-s text-texto-inverso/90">{contexto}</p>
    </div>
  )
}

export function Indicadores({ asignados, minimo, cupo }: { asignados: number; minimo: number; cupo: number }) {
  const minimoPct = (minimo / cupo) * 100
  return (
    <div className="relative h-14 w-full text-etiqueta-s">
      <span className="absolute left-0 top-4 whitespace-nowrap text-texto-acento">
        {asignados} asignado{asignados === 1 ? "" : "s"}
      </span>
      <span className="absolute top-0 h-6 w-px bg-texto-terciario" style={{ left: `${minimoPct}%` }} />
      <span
        className="absolute top-4 -translate-x-1/2 whitespace-nowrap text-texto-secundario"
        style={{ left: `${minimoPct}%` }}
      >
        mín {minimo}
      </span>
      <span className="absolute right-0 top-4 whitespace-nowrap text-texto-terciario">cupo {cupo}</span>
    </div>
  )
}

export const segmento = "relative h-10 min-w-0 flex-1 overflow-hidden rounded-[3px] bg-borde-sutil"
export const relleno = "absolute inset-0 origin-left rounded-[3px]"

/** Barra tras confirmar: los segmentos previos aparecen llenos y los nuevos se llenan uno por uno. */
export function CoberturaConfirmada({
  titulo,
  asignados,
  antes,
  minimo,
  cupo,
}: {
  titulo: string
  asignados: number
  antes: number
  minimo: number
  cupo: number
}) {
  return (
    <section className="flex flex-col gap-8">
      <h3 className="text-titulo-m text-texto-primario">{titulo}</h3>
      <div className="flex w-full gap-4" role="img" aria-label={`${asignados} asignados de un cupo de ${cupo}`}>
        {Array.from({ length: cupo }, (_, i) => (
          <span key={i} className={segmento}>
            {i < antes ? (
              <span className={cn(relleno, "bg-accion-primaria")} />
            ) : i < asignados ? (
              <span
                className={cn(relleno, "animate-llenar bg-accion-primaria")}
                style={{ animationDelay: `${(i - antes) * PASO_BARRA_MS}ms` }}
              />
            ) : null}
          </span>
        ))}
      </div>
      <Indicadores asignados={asignados} minimo={minimo} cupo={cupo} />
    </section>
  )
}

export function ExitoAviso({ titulo, detalle, delay = 0 }: { titulo: string; detalle: string; delay?: number }) {
  return (
    <div
      className="flex w-full animate-caer items-center gap-12 rounded-lg bg-estado-ok-bg p-16"
      style={{ animationDelay: `${delay}ms` }}
    >
      <img src={exitoMarca} alt="" width={36} height={36} className="size-36 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-4 text-estado-ok-text">
        <p className="text-titulo-m">{titulo}</p>
        <p className="text-cuerpo-s">{detalle}</p>
      </div>
    </div>
  )
}

export interface PersonaConfirmada {
  nombre: string
  iniciales: string
  rol: string
}

export function FilaConfirmada({ persona, delay }: { persona: PersonaConfirmada; delay: number }) {
  return (
    <li
      className="flex w-full animate-caer items-center gap-8 border-b border-borde-sutil py-8"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="flex size-28 shrink-0 items-center justify-center rounded-pill bg-estado-neutral-bg text-etiqueta-m text-estado-neutral-text">
        {persona.iniciales}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-titulo-s text-texto-primario">{persona.nombre}</span>
        <span className="truncate text-cuerpo-s text-texto-terciario">{persona.rol}</span>
      </span>
      <span className="shrink-0 text-etiqueta-l text-estado-ok-text">Confirmado</span>
    </li>
  )
}
