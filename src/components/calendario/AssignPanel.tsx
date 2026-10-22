import { useEffect, useRef, useState } from "react"
import checkboxMarcado from "@/assets/icons/checkbox-marcado.svg"
import exitoMarca from "@/assets/icons/exito-marca.svg"
import { Button } from "@/components/ui/Button"
import type { Turno } from "@/data/calendario"
import { recomendados, type Recomendado } from "@/data/recomendados"
import { cn } from "@/lib/utils"

/** Duración de la entrada del panel; las animaciones internas arrancan después. */
const ENTRADA_MS = 500
const PASO_BARRA_MS = 250
const PASO_LISTA_MS = 80

const historialTono = {
  ok: "text-estado-ok-text",
  info: "text-estado-info-text",
  warn: "text-estado-warn-text",
}

interface AssignPanelProps {
  turno: Turno
  /** Día corto del turno, p. ej. "Sáb 13". */
  fecha: string
  /** Tercera línea del encabezado, p. ej. "Programa infantil · Foro Jardín". */
  contexto: string
  onClose: () => void
  onConfirm: (nombres: string[]) => void
}

function VolunteerCard({
  v,
  checked,
  disabled,
  onToggle,
  delay,
}: {
  v: Recomendado
  checked: boolean
  disabled: boolean
  onToggle: () => void
  delay: number
}) {
  const [principal, secundaria] = v.habilidades
  return (
    <li className="animate-caer" style={{ animationDelay: `${delay}ms` }}>
      <label
        className={cn(
          "flex w-full items-center gap-8 rounded-lg px-12 py-8 shadow-e2 transition-colors duration-200",
          checked ? "bg-acento-50" : "bg-superficie-elevada",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <span className="relative flex size-18 shrink-0">
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onToggle}
            className="peer size-18 cursor-[inherit] appearance-none rounded-sm border-[1.5px] border-texto-deshabilitado bg-superficie-elevada checked:border-transparent disabled:opacity-50"
          />
          <img
            src={checkboxMarcado}
            alt=""
            width={18}
            height={18}
            className="pointer-events-none absolute inset-0 hidden size-18 peer-checked:block"
          />
        </span>
        <span className="flex size-32 shrink-0 items-center justify-center rounded-pill bg-estado-neutral-bg text-etiqueta-m text-estado-neutral-text">
          {v.iniciales}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-4">
          <span className="flex w-full items-center justify-between gap-8 whitespace-nowrap">
            <span className="min-w-0 truncate">
              <span className="text-[13px] font-semibold text-texto-primario">{v.nombre}</span>
              <span className={cn("text-[11px] font-medium", historialTono[v.historialTono])}> · {v.historial}</span>
            </span>
            <a
              href="#perfil"
              onClick={(e) => e.preventDefault()}
              className="shrink-0 text-titulo-xs text-texto-acento hover:underline"
            >
              Ver perfil
            </a>
          </span>
          <span className="flex gap-4">
            <span className="rounded-pill bg-acento-200 px-8 py-4 text-titulo-xs text-acento-800">{principal}</span>
            <span className="rounded-pill border border-borde-control px-8 py-4 text-etiqueta-l text-estado-neutral-text">
              {secundaria}
            </span>
          </span>
        </span>
      </label>
    </li>
  )
}

function Indicadores({ asignados, minimo, cupo }: { asignados: number; minimo: number; cupo: number }) {
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

const segmento = "relative h-10 min-w-0 flex-1 overflow-hidden rounded-[3px] bg-borde-sutil"
const relleno = "absolute inset-0 origin-left rounded-[3px]"

interface Exito {
  agregados: Recomendado[]
  /** Asignados antes de confirmar: solo los nuevos segmentos se animan. */
  antes: number
}

function SuccessView({ turno, exito }: { turno: Turno; exito: Exito }) {
  const asignados = turno.voluntarios.length
  const n = exito.agregados.length
  return (
    <>
      <div className="flex w-full animate-caer items-center gap-12 rounded-lg bg-estado-ok-bg p-16">
        <img src={exitoMarca} alt="" width={36} height={36} className="size-36 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-4 text-estado-ok-text">
          <p className="text-titulo-m">
            {n} voluntario{n === 1 ? "" : "s"} asignado{n === 1 ? "" : "s"}
          </p>
          <p className="text-cuerpo-s">Se les notificó y quedó en su historial</p>
        </div>
      </div>

      <section className="flex flex-col gap-8">
        <h3 className="text-titulo-m text-texto-primario">Cobertura de turno</h3>
        <div className="flex w-full gap-4" role="img" aria-label={`${asignados} asignados de un cupo de ${turno.cupo}`}>
          {Array.from({ length: turno.cupo }, (_, i) => (
            <span key={i} className={segmento}>
              {i < exito.antes ? (
                <span className={cn(relleno, "bg-accion-primaria")} />
              ) : i < asignados ? (
                // Los segmentos recién confirmados se llenan uno por uno.
                <span
                  className={cn(relleno, "animate-llenar bg-accion-primaria")}
                  style={{ animationDelay: `${(i - exito.antes) * PASO_BARRA_MS}ms` }}
                />
              ) : null}
            </span>
          ))}
        </div>
        <Indicadores asignados={asignados} minimo={turno.minimo} cupo={turno.cupo} />
      </section>

      <section className="flex flex-col gap-8">
        <h3 className="text-titulo-xs uppercase text-texto-terciario">Agregados en esta acción · {n}</h3>
        <ul className="flex flex-col">
          {exito.agregados.map((v, i) => (
            <li
              key={v.nombre}
              className="flex w-full animate-caer items-center gap-8 border-b border-borde-sutil py-8"
              style={{ animationDelay: `${(i + 1) * PASO_LISTA_MS}ms` }}
            >
              <span className="flex size-28 shrink-0 items-center justify-center rounded-pill bg-estado-neutral-bg text-etiqueta-m text-estado-neutral-text">
                {v.iniciales}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-titulo-s text-texto-primario">{v.nombre}</span>
                <span className="truncate text-cuerpo-s text-texto-terciario">{v.habilidades[0]}</span>
              </span>
              <span className="shrink-0 text-etiqueta-l text-estado-ok-text">Confirmado</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export function AssignPanel({ turno, fecha, contexto, onClose, onConfirm }: AssignPanelProps) {
  const disponibles = recomendados.filter((r) => !turno.voluntarios.includes(r.nombre))
  const libres = Math.max(0, turno.cupo - turno.voluntarios.length)

  const [seleccion, setSeleccion] = useState<string[]>([])
  const [exito, setExito] = useState<Exito | null>(null)
  const [saliendo, setSaliendo] = useState(false)
  const panelRef = useRef<HTMLElement>(null)

  const asignados = turno.voluntarios.length

  const cerrar = () => setSaliendo(true)

  useEffect(() => {
    panelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSaliendo(true)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const toggle = (nombre: string) =>
    setSeleccion((s) => (s.includes(nombre) ? s.filter((n) => n !== nombre) : [...s, nombre]))

  const confirmar = () => {
    setExito({ agregados: recomendados.filter((r) => seleccion.includes(r.nombre)), antes: asignados })
    onConfirm(seleccion)
    panelRef.current?.focus()
  }

  return (
    <aside
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-labelledby="asignar-titulo"
      onAnimationEnd={(e) => {
        if (saliendo && e.target === e.currentTarget) onClose()
      }}
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex w-full max-w-440 flex-col bg-superficie-elevada shadow-e4 outline-none",
        saliendo ? "animate-panel-salir" : "animate-panel-entrar",
      )}
    >
      <header className="flex shrink-0 flex-col gap-16 border-b border-borde-sutil px-20 pb-16 pt-20">
        <div className="flex w-full items-center gap-8">
          <h2 id="asignar-titulo" className="min-w-0 flex-1 text-titulo-m text-texto-primario" aria-live="polite">
            {exito ? "Asignación confirmada" : "Asignar voluntarios"}
          </h2>
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar"
            className="cursor-pointer text-titulo-xl text-texto-terciario hover:text-texto-primario"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col gap-4 rounded-lg bg-accion-primaria p-12">
          <p className="text-etiqueta-l text-texto-inverso/90">{turno.nombre}</p>
          <p className="text-titulo-m text-texto-inverso">
            {fecha} · {turno.horario.replace(" – ", "–")}
          </p>
          <p className="text-cuerpo-s text-texto-inverso/90">{contexto}</p>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-20 py-16">
        {exito ? (
          <SuccessView turno={turno} exito={exito} />
        ) : (
          <>
            <section className="flex flex-col gap-8">
              <h3 className="text-titulo-m text-texto-primario">Cobertura del turno</h3>
              <div
                className="flex w-full gap-4"
                role="img"
                aria-label={`${asignados} asignados y ${seleccion.length} propuestos de un cupo de ${turno.cupo}`}
              >
                {Array.from({ length: turno.cupo }, (_, i) => {
                  const asignado = i < asignados
                  const propuesto = !asignado && i < asignados + seleccion.length
                  return (
                    <span key={i} className={segmento}>
                      {asignado ? (
                        <span
                          className={cn(relleno, "animate-llenar bg-accion-primaria")}
                          style={{ animationDelay: `${ENTRADA_MS + i * PASO_BARRA_MS}ms` }}
                        />
                      ) : (
                        // Segmento propuesto: se llena (o vacía) al marcar/desmarcar un voluntario.
                        <span
                          className={cn(
                            relleno,
                            "bg-acento-300 transition-transform duration-250 ease-out motion-reduce:transition-none",
                            propuesto ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                      )}
                    </span>
                  )
                })}
              </div>
              <Indicadores asignados={asignados} minimo={turno.minimo} cupo={turno.cupo} />
              <Button className="h-32 self-start text-titulo-xs">Editar cupo del turno</Button>
            </section>

            <div className="h-2 w-full shrink-0 bg-borde-fuerte" />

            <h3 className="text-titulo-m text-texto-primario">Voluntarios recomendados</h3>
            <p className="text-cuerpo-s text-texto-terciario">
              La propuesta incluye 1 voluntario sin turnos previos para no frenar su activación.
            </p>

            <ul className="flex flex-col gap-8">
              {disponibles.map((v, i) => {
                const checked = seleccion.includes(v.nombre)
                return (
                  <VolunteerCard
                    key={v.nombre}
                    v={v}
                    checked={checked}
                    disabled={!checked && seleccion.length >= libres}
                    onToggle={() => toggle(v.nombre)}
                    delay={ENTRADA_MS + i * PASO_LISTA_MS}
                  />
                )
              })}
            </ul>

            <div className="pb-4 pt-12">
              <a href="#voluntarios" className="text-titulo-xs text-texto-acento hover:underline">
                Ver todos los voluntarios
              </a>
            </div>
          </>
        )}
      </div>

      <footer className="shrink-0 border-t border-borde-sutil px-20 pb-20 pt-16">
        {exito ? (
          <Button size="sm" className="h-32 w-full justify-center rounded-md px-16" onClick={cerrar}>
            Cerrar
          </Button>
        ) : seleccion.length === 0 ? (
          // Btn · Secondary · Disabled hasta que se marque al menos un voluntario.
          <Button variant="secondary" className="w-full justify-center" disabled>
            Asignar voluntario
          </Button>
        ) : (
          <Button variant="primary" className="w-full justify-center" onClick={confirmar}>
            Confirmar {seleccion.length} asignaci{seleccion.length === 1 ? "ón" : "ones"}
          </Button>
        )}
      </footer>
    </aside>
  )
}
