import { useState } from "react"
import alertaAviso from "@/assets/icons/alerta-aviso.svg"
import perfilIcon from "@/assets/icons/perfil.svg"
import {
  CoberturaConfirmada,
  ExitoAviso,
  FilaConfirmada,
  PASO_BARRA_MS,
  PASO_LISTA_MS,
  TurnoDestino,
} from "@/components/asignacion/partes"
import { TurnoSelect } from "@/components/voluntarios/TurnoSelect"
import { Button } from "@/components/ui/Button"
import { Chip } from "@/components/ui/Chip"
import { Icon } from "@/components/ui/Icon"
import { ENTRADA_MS, SlideOver } from "@/components/ui/SlideOver"
import { historialBase, horasDeEmpalme, tonoHabilidad, tonoHabilidadNeutro, type TurnoAbierto } from "@/data/perfil"
import type { Voluntario } from "@/data/voluntarios"
import { cn } from "@/lib/utils"

type Pestana = "perfil" | "historial"

interface VolunteerProfileProps {
  voluntario: Voluntario
  /** Todos los turnos abiertos; el perfil filtra los que encajan con sus habilidades. */
  turnos: TurnoAbierto[]
  onClose: () => void
  onAsignar: (turnoId: string) => void
  /** "Buscar otro candidato": se llama cuando el perfil terminó de salir. */
  onBuscarOtro: (turnoId: string) => void
}

const horario = (t: TurnoAbierto) => t.horario.replace(" – ", "–")
const contexto = (t: TurnoAbierto) => (t.programa ? `${t.programa} · ${t.lugar}` : t.lugar)

function Rail({ pestana, onCambiar }: { pestana: Pestana; onCambiar: (p: Pestana) => void }) {
  const item = (id: Pestana, label: string, icono: React.ReactNode) => {
    const activa = pestana === id
    return (
      <button
        type="button"
        role="tab"
        aria-selected={activa}
        onClick={() => onCambiar(id)}
        className={cn(
          "flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-md transition-colors",
          activa
            ? "h-55 bg-texto-inverso/16 px-12 text-etiqueta-m text-texto-inverso"
            : "px-4 py-8 text-etiqueta-s text-acento-300 hover:bg-texto-inverso/8",
        )}
      >
        {icono}
        {label}
      </button>
    )
  }
  return (
    <nav
      role="tablist"
      aria-orientation="vertical"
      aria-label="Secciones del voluntario"
      className="flex w-84 shrink-0 flex-col gap-4 self-stretch border-r border-borde-fuerte bg-linear-to-b from-marca-plum-800 via-marca-brand-700 via-55% to-acento-700 px-16 py-20"
    >
      {item("perfil", "Perfil", <Icon src={perfilIcon} size={20} />)}
      {item(
        "historial",
        "Historial",
        <span aria-hidden className="flex size-20 flex-col items-center justify-center gap-4">
          <span className="h-2 w-18 rounded-[1px] bg-current" />
          <span className="h-2 w-18 rounded-[1px] bg-current" />
          <span className="h-2 w-12 self-start rounded-[1px] bg-current" style={{ marginLeft: 1 }} />
        </span>,
      )}
    </nav>
  )
}

function Campo({ valor, etiqueta }: { valor: React.ReactNode; etiqueta: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <span className="truncate text-cuerpo-m text-texto-primario">{valor}</span>
      <span className="text-etiqueta-micro uppercase text-texto-terciario">{etiqueta}</span>
    </div>
  )
}

function PerfilCuerpo({ v, delayInicial }: { v: Voluntario; delayInicial: number }) {
  // Se fija al montar: la primera vez espera la entrada del overlay; al volver de Historial, no.
  const [base] = useState(delayInicial)
  return (
    <>
      <section className="flex flex-col gap-12">
        <h3 className="text-titulo-m text-texto-primario">Perfil</h3>
        <div className="flex items-center gap-8">
          <h4 className="min-w-0 flex-1 text-titulo-s text-texto-secundario">Habilidades</h4>
          <button type="button" aria-label="Agregar habilidad" className="cursor-pointer text-titulo-m text-texto-terciario hover:text-texto-primario">
            +
          </button>
        </div>
        <ul className="flex flex-wrap gap-8">
          {v.habilidades.map((h, i) => (
            <li
              key={h}
              className={cn("animate-aparecer rounded-pill px-8 py-4 text-titulo-xs", tonoHabilidad[h] ?? tonoHabilidadNeutro)}
              style={{ animationDelay: `${base + i * PASO_BARRA_MS}ms` }}
            >
              {h}
            </li>
          ))}
        </ul>
      </section>

      <div className="h-2 w-full shrink-0 bg-borde-sutil" />

      <section className="flex flex-col gap-12">
        <div className="flex items-center gap-8">
          <h3 className="min-w-0 flex-1 text-titulo-m text-texto-primario">Información</h3>
          <Button>Editar</Button>
        </div>
        <div className="flex gap-8">
          <Campo
            valor={
              <span className="flex items-center gap-4">
                {v.estado} <span className="text-cuerpo-s text-texto-terciario">▾</span>
              </span>
            }
            etiqueta="Estado"
          />
          <Campo valor={v.registro} etiqueta="Fecha de registro" />
        </div>
        <Campo valor={v.email} etiqueta="Correo" />
        <Campo valor={`+52 ${v.telefono}`} etiqueta="Teléfono" />
      </section>
    </>
  )
}

function HistorialCuerpo({ v }: { v: Voluntario }) {
  // Marca como "Faltó" tantos eventos como faltas tenga el voluntario.
  const posicionesFalta = [2, 5, 0].slice(0, v.faltas)
  const items = v.turnos === null ? [] : historialBase.map((h, i) => ({ ...h, asistio: !posicionesFalta.includes(i) }))
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-titulo-m text-texto-primario">Historial de voluntariados</h3>
      {items.length === 0 ? (
        <p className="py-12 text-cuerpo-s text-texto-terciario">Aún no tiene voluntariados registrados.</p>
      ) : (
        <ul className="flex flex-col">
          {items.map((h, i) => (
            <li
              key={h.evento}
              className={cn("flex items-center gap-8 py-12", i < items.length - 1 && "border-b border-borde-sutil")}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-4">
                <span className="truncate text-titulo-s text-texto-primario">{h.evento}</span>
                <span className="truncate text-cuerpo-s text-texto-terciario">{h.detalle}</span>
              </span>
              <Chip tone={h.asistio ? "ok" : "warn"}>{h.asistio ? "Asistió" : "Faltó"}</Chip>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

interface Exito {
  turnoId: string
  antes: number
}

function ExitoVista({ v, turno, exito }: { v: Voluntario; turno: TurnoAbierto; exito: Exito }) {
  const persona = { nombre: v.nombre, iniciales: v.iniciales, rol: turno.actividad }
  const cobertura = (
    <CoberturaConfirmada
      titulo={turno.empalme ? "Cobertura del turno" : "Cobertura de turno"}
      asignados={turno.voluntarios.length}
      antes={exito.antes}
      minimo={turno.minimo}
      cupo={turno.cupo}
    />
  )
  const aviso = <ExitoAviso titulo={`Turno asignado a ${v.nombre}`} detalle="Se le notificó y quedó en su historial" />

  // Sin empalme: frame 217:624. Con empalme: frame 290:1113.
  if (!turno.empalme)
    return (
      <>
        {aviso}
        {cobertura}
        <section className="flex flex-col gap-8">
          <h3 className="text-titulo-xs uppercase text-texto-terciario">Agregados en esta acción · 1</h3>
          <ul>
            <FilaConfirmada persona={persona} delay={PASO_LISTA_MS} />
          </ul>
        </section>
      </>
    )

  const e = turno.empalme
  const [ini, fin] = turno.horario.split(" – ")
  return (
    <>
      {cobertura}
      {aviso}
      <div
        className="flex w-full animate-caer flex-col gap-8 rounded-lg bg-estado-warn-bg px-16 py-12 text-estado-warn-text"
        style={{ animationDelay: `${PASO_LISTA_MS}ms` }}
      >
        <div className="flex items-start gap-8">
          <img src={alertaAviso} alt="" width={16} height={16} className="size-16 shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <p className="text-titulo-s">Empalme registrado · {horasDeEmpalme(turno)} h</p>
            <p className="text-etiqueta-l">
              {e.turno} · {e.dia} · {e.inicio}–{e.fin} · {e.lugar}
            </p>
          </div>
        </div>
        <div className="h-px w-full bg-estado-warn-text/20" />
        <p className="text-etiqueta-l">
          Avisamos a {e.responsable}, responsable de ese turno, de la asignación de {v.nombre} a {turno.actividad} de{" "}
          {ini} a {fin}.
        </p>
      </div>
      <section className="flex flex-col gap-8">
        <h3 className="text-titulo-m text-texto-primario">Notificamos al responsable</h3>
        <ul>
          <FilaConfirmada persona={persona} delay={PASO_LISTA_MS * 2} />
        </ul>
      </section>
    </>
  )
}

export function VolunteerProfile({ voluntario: v, turnos, onClose, onAsignar, onBuscarOtro }: VolunteerProfileProps) {
  const [pestana, setPestana] = useState<Pestana>("perfil")
  const [turnoId, setTurnoId] = useState<string | null>(null)
  const [exito, setExito] = useState<Exito | null>(null)
  const [siguiente, setSiguiente] = useState<string | null>(null)

  const opciones = turnos.filter(
    (t) => v.habilidades.includes(t.habilidad) && !t.voluntarios.includes(v.nombre) && t.voluntarios.length < t.cupo,
  )
  const turno = turnos.find((t) => t.id === (exito?.turnoId ?? turnoId)) ?? null
  const conflicto = turno?.empalme

  const asignar = () => {
    if (!turno) return
    setExito({ turnoId: turno.id, antes: turno.voluntarios.length })
    onAsignar(turno.id)
  }

  return (
    <SlideOver
      labelledBy="perfil-titulo"
      className="max-w-448 border-l border-borde-fuerte"
      onClose={() => (siguiente ? onBuscarOtro(siguiente) : onClose())}
    >
      {({ cerrar, entrado }) =>
        exito && turno ? (
          <>
            <header className="flex shrink-0 flex-col gap-16 border-b border-borde-sutil px-20 pb-16 pt-20">
              <div className="flex w-full items-center gap-8">
                <h2 id="perfil-titulo" className="min-w-0 flex-1 text-titulo-m text-texto-primario">
                  Asignación confirmada
                </h2>
                <button type="button" onClick={cerrar} aria-label="Cerrar" className="cursor-pointer text-titulo-xl text-texto-terciario hover:text-texto-primario">
                  ×
                </button>
              </div>
              <TurnoDestino nombre={turno.actividad} fecha={`${turno.dia} · ${horario(turno)}`} contexto={contexto(turno)} />
            </header>
            <div className="flex min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-20 py-16">
              <ExitoVista v={v} turno={turno} exito={exito} />
            </div>
            <footer className="shrink-0 border-t border-borde-sutil px-20 pb-20 pt-16">
              <Button size="sm" className="h-32 w-full justify-center rounded-md px-16" onClick={cerrar}>
                Cerrar
              </Button>
            </footer>
          </>
        ) : (
          <div className="flex min-h-0 flex-1">
            <Rail pestana={pestana} onCambiar={setPestana} />
            <div className="flex min-w-0 flex-1 flex-col">
              <header className="flex shrink-0 flex-col gap-16 border-b border-borde-sutil p-24">
                <div className="flex items-start gap-12">
                  <span className="flex size-64 shrink-0 items-center justify-center rounded-pill border border-borde-fuerte bg-borde-sutil text-titulo-xl text-texto-terciario">
                    {v.iniciales}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 self-center">
                    <h2 id="perfil-titulo" className="truncate text-titulo-xl text-texto-primario">
                      {v.nombre}
                    </h2>
                    <p className="truncate text-cuerpo-m text-texto-terciario">{v.locacion}, CDMX</p>
                  </div>
                  <button type="button" onClick={cerrar} aria-label="Cerrar" className="cursor-pointer text-titulo-xl text-texto-terciario hover:text-texto-primario">
                    ×
                  </button>
                </div>
                <div className="flex items-center gap-16">
                  <div className="flex flex-col">
                    <span className="text-dato-m text-texto-primario">{v.turnos ?? 0}</span>
                    <span className="text-cuerpo-s text-texto-terciario">Turnos cubiertos</span>
                  </div>
                  <span className="h-30 w-px bg-borde-sutil" />
                  <div className="flex flex-col">
                    <span className={cn("text-dato-m", v.faltas > 0 ? "text-estado-warn-text" : "text-texto-primario")}>{v.faltas}</span>
                    <span className="text-cuerpo-s text-texto-terciario">Faltas</span>
                  </div>
                </div>
              </header>

              <div role="tabpanel" className="flex min-h-0 flex-1 flex-col gap-20 overflow-y-auto p-24">
                {pestana === "perfil" ? (
                  <PerfilCuerpo v={v} delayInicial={entrado ? 0 : ENTRADA_MS} />
                ) : (
                  <HistorialCuerpo v={v} />
                )}
              </div>

              {/* El pie es el mismo en Perfil e Historial: depende solo del turno elegido. */}
              <footer className="flex shrink-0 flex-col gap-4 border-t border-borde-sutil px-24 pb-20 pt-16">
                <h3 className="text-titulo-m text-texto-primario">Seleccionar turno</h3>
                <TurnoSelect opciones={opciones} value={turnoId} onChange={setTurnoId} />
                {conflicto && (
                  <p className="flex animate-caer items-start gap-8 rounded-md bg-estado-warn-bg px-12 py-8 text-etiqueta-l text-estado-warn-text">
                    <img src={alertaAviso} alt="" width={16} height={16} className="size-16 shrink-0" />
                    {v.nombre} también está en {conflicto.turno} · {conflicto.inicio}–{conflicto.fin}
                  </p>
                )}
                <div className="h-6" />
                {!turno ? (
                  <Button variant="secondary" className="w-full justify-center" disabled>
                    Asignar este turno
                  </Button>
                ) : conflicto ? (
                  // Con empalme, el Primary pasa a ser la decisión explícita de asignar igual.
                  <div className="flex flex-col gap-8">
                    <Button variant="primary" className="w-full justify-center" onClick={asignar}>
                      Asignar de cualquier manera
                    </Button>
                    <Button
                      className="w-full justify-center"
                      onClick={() => {
                        setSiguiente(turno.id)
                        cerrar()
                      }}
                    >
                      Buscar otro candidato
                    </Button>
                  </div>
                ) : (
                  <Button variant="primary" className="w-full justify-center" onClick={asignar}>
                    Asignar a este turno
                  </Button>
                )}
              </footer>
            </div>
          </div>
        )
      }
    </SlideOver>
  )
}
