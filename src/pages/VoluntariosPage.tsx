import { useState } from "react"
import agregar from "@/assets/icons/agregar.svg"
import { AppShell } from "@/components/layout/AppShell"
import { Button } from "@/components/ui/Button"
import { VoluntariosTable } from "@/components/voluntarios/VoluntariosTable"
import { voluntarios } from "@/data/voluntarios"

const unicos = (xs: string[]) => [...new Set(xs)].sort((a, b) => a.localeCompare(b, "es"))

// Los tres filtros del componente Toolbar de Figma ("Filtro ▾"), con su criterio.
const filtros = [
  { id: "estado", label: "Estado", opciones: ["Activo", "En onboarding", "Inactivo"] },
  { id: "locacion", label: "Locación", opciones: unicos(voluntarios.map((v) => v.locacion)) },
  { id: "habilidad", label: "Habilidad", opciones: unicos(voluntarios.flatMap((v) => v.habilidades)) },
] as const

type FiltroId = (typeof filtros)[number]["id"]

const normalizar = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()

export default function VoluntariosPage() {
  const [valores, setValores] = useState<Record<FiltroId, string>>({ estado: "", locacion: "", habilidad: "" })
  const [busqueda, setBusqueda] = useState("")
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const q = normalizar(busqueda.trim())
  const filas = voluntarios.filter(
    (v) =>
      (!valores.estado || v.estado === valores.estado) &&
      (!valores.locacion || v.locacion === valores.locacion) &&
      (!valores.habilidad || v.habilidades.includes(valores.habilidad)) &&
      (!q || normalizar(`${v.nombre} ${v.email} ${v.telefono}`).includes(q)),
  )

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <AppShell title="Banco de voluntarios">
      <main className="flex min-h-0 w-full flex-1 flex-col gap-24 overflow-y-auto p-16 sm:p-32">
        <div className="flex w-full flex-wrap items-center justify-between gap-16">
          <div className="flex flex-wrap items-center gap-8">
            {filtros.map((f) => {
              const activo = valores[f.id] !== ""
              return (
                <label key={f.id} className="relative">
                  <span className="sr-only">{f.label}</span>
                  <select
                    value={valores[f.id]}
                    onChange={(e) => setValores((v) => ({ ...v, [f.id]: e.target.value }))}
                    className={`field-sizing-content cursor-pointer appearance-none rounded-[6px] border bg-superficie-elevada py-8 pl-12 pr-28 text-cuerpo-m text-texto-primario hover:bg-superficie-hover ${activo ? "border-borde-foco" : "border-borde-fuerte"}`}
                  >
                    <option value="">{f.label}</option>
                    {f.opciones.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <span aria-hidden className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 text-cuerpo-m text-texto-primario">
                    ▾
                  </span>
                </label>
              )
            })}
          </div>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar…"
            aria-label="Buscar voluntario"
            className="w-220 rounded-[6px] border border-borde-fuerte bg-superficie-elevada px-12 py-8 text-cuerpo-m text-texto-primario placeholder:text-texto-terciario"
          />
          <Button variant="primary">
            Agregar voluntario
            <img src={agregar} alt="" width={20} height={20} className="size-20" />
          </Button>
        </div>

        <VoluntariosTable rows={filas} checked={checked} onToggle={toggle} />
      </main>
    </AppShell>
  )
}
