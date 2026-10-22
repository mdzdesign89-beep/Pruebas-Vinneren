import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react"
import alertaAviso from "@/assets/icons/alerta-aviso.svg"
import chevron from "@/assets/icons/chevron.svg"
import type { TurnoAbierto } from "@/data/perfil"
import { cn } from "@/lib/utils"

const estadoColor: Record<TurnoAbierto["estadoDropdown"], string> = {
  "Bajo mínimo": "text-estado-bad-text",
  Abierto: "text-tipo-atencion-text",
  "En riesgo": "text-tipo-atencion-text",
}

const etiquetaTurno = (t: TurnoAbierto) => `${t.nombre} · ${t.dia} · ${t.horario.replace(" – ", "–")}`

interface TurnoSelectProps {
  opciones: TurnoAbierto[]
  value: string | null
  onChange: (id: string) => void
}

/** Select · turno + Dropdown · turnos disponibles (se abre hacia arriba, sobre el pie). */
export function TurnoSelect({ opciones, value, onChange }: TurnoSelectProps) {
  const [abierto, setAbierto] = useState(false)
  const [activo, setActivo] = useState(0)
  const raiz = useRef<HTMLDivElement>(null)
  const listaId = useId()
  const seleccionado = opciones.find((o) => o.id === value)

  useEffect(() => {
    if (!abierto) return
    const fuera = (e: MouseEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener("mousedown", fuera)
    return () => document.removeEventListener("mousedown", fuera)
  }, [abierto])

  const abrir = () => {
    setActivo(Math.max(0, opciones.findIndex((o) => o.id === value)))
    setAbierto(true)
  }

  const elegir = (id: string) => {
    onChange(id)
    setAbierto(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (!abierto) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault()
        abrir()
      }
      return
    }
    if (e.key === "Escape") {
      // Cierra solo el dropdown, no el overlay.
      e.nativeEvent.stopPropagation()
      setAbierto(false)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setActivo((i) => Math.min(opciones.length - 1, i + 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActivo((i) => Math.max(0, i - 1))
    } else if (e.key === "Enter" && opciones[activo]) {
      e.preventDefault()
      elegir(opciones[activo].id)
    }
  }

  return (
    <div ref={raiz} className="relative w-full" onKeyDown={onKeyDown}>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-controls={listaId}
        aria-activedescendant={abierto && opciones[activo] ? `${listaId}-${opciones[activo].id}` : undefined}
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        className={cn(
          "flex h-44 w-full cursor-pointer items-center gap-8 rounded-[6px] border bg-superficie-elevada px-12 text-left transition-colors",
          abierto ? "border-[1.5px] border-borde-foco" : "border-borde-fuerte hover:border-borde-control",
        )}
      >
        <span className="min-w-0 flex-1 truncate text-cuerpo-m text-texto-primario">
          {seleccionado ? etiquetaTurno(seleccionado) : "Selecciona uno de tus turnos abiertos"}
        </span>
        <img
          src={chevron}
          alt=""
          width={16}
          height={16}
          className={cn("size-16 shrink-0 transition-transform duration-200", abierto && "rotate-180")}
        />
      </button>

      {abierto && (
        <div className="absolute inset-x-0 bottom-full z-10 mb-4 flex max-h-[360px] animate-caer flex-col gap-4 overflow-y-auto rounded-md border border-borde-fuerte bg-superficie-elevada p-4 shadow-e3">
          <p className="px-8 py-4 text-etiqueta-m uppercase text-texto-terciario">Turnos donde encaja · {opciones.length}</p>
          {opciones.length === 0 ? (
            <p className="px-8 py-8 text-cuerpo-s text-texto-terciario">No hay turnos abiertos que encajen con sus habilidades.</p>
          ) : (
            <ul role="listbox" id={listaId} aria-label="Turnos abiertos" className="flex flex-col gap-4">
              {opciones.map((o, i) => {
                const marcado = o.id === value
                return (
                  <li
                    key={o.id}
                    id={`${listaId}-${o.id}`}
                    role="option"
                    aria-selected={marcado}
                    onMouseEnter={() => setActivo(i)}
                    onClick={() => elegir(o.id)}
                    className={cn(
                      "flex cursor-pointer items-center gap-8 rounded-[6px] p-8",
                      o.empalme ? "bg-estado-warn-bg" : i === activo || marcado ? "bg-acento-50" : "",
                      o.empalme && i === activo && "outline-2 -outline-offset-2 outline-estado-warn-text/30",
                    )}
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-4">
                      <span className="truncate text-etiqueta-l text-texto-primario">
                        {o.dia} · {o.horario.replace(" – ", "–")}
                      </span>
                      <span className="truncate text-cuerpo-s text-texto-terciario">
                        {o.actividad} · {o.voluntarios.length}/{o.cupo} · mín {o.minimo}
                      </span>
                    </span>
                    {o.empalme ? (
                      <span className="flex shrink-0 flex-col items-end gap-4 text-estado-warn-text">
                        <span className="flex items-center gap-4 text-etiqueta-l">
                          <img src={alertaAviso} alt="" width={16} height={16} className="size-16" />
                          Empalme
                        </span>
                        <span className="text-etiqueta-m">
                          {o.empalme.inicio}–{o.empalme.fin}
                        </span>
                      </span>
                    ) : (
                      <span className={cn("shrink-0 text-etiqueta-l", estadoColor[o.estadoDropdown])}>{o.estadoDropdown}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
