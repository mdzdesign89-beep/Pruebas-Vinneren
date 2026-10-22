import puntoActivo from "@/assets/icons/punto-activo.svg"
import puntoInactivo from "@/assets/icons/punto-inactivo.svg"
import puntoOnboarding from "@/assets/icons/punto-onboarding.svg"
import type { EstadoVoluntario, Voluntario } from "@/data/voluntarios"

const punto: Record<EstadoVoluntario, string> = {
  Activo: puntoActivo,
  "En onboarding": puntoOnboarding,
  Inactivo: puntoInactivo,
}

const checkbox =
  "block size-16 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-borde-fuerte bg-superficie-elevada checked:border-accion-primaria checked:bg-accion-primaria"

const chip = "shrink-0 whitespace-nowrap rounded-pill bg-estado-neutral-bg px-8 py-4 text-etiqueta-l text-estado-neutral-text"

const columnas = [
  { label: "Voluntario", className: "w-186" },
  { label: "Teléfono", className: "w-117" },
  { label: "Locación", className: "w-127" },
  { label: "Email", className: "w-166" },
  { label: "Habilidades", className: "w-202" },
  { label: "Estado", className: "w-136" },
  { label: "Turnos cubiertos", className: "w-124" },
]

interface VoluntariosTableProps {
  rows: Voluntario[]
  checked: Set<string>
  onToggle: (id: string) => void
}

export function VoluntariosTable({ rows, checked, onToggle }: VoluntariosTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-md border border-borde-fuerte bg-superficie-elevada">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] border-collapse text-left">
          <thead>
            <tr className="border-b border-borde-fuerte bg-superficie-sutil [&>th]:py-12 [&>th]:pr-12 [&>th:first-child]:pl-24 [&>th:last-child]:pr-24">
              {/* En Figma la columna de selección no tiene casilla en el encabezado. */}
              <th scope="col" className="w-28">
                <span className="sr-only">Seleccionar</span>
              </th>
              {columnas.map((c) => (
                <th key={c.label} scope="col" className={`${c.className} whitespace-nowrap text-cuerpo-m font-medium text-texto-terciario`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((v, i) => {
              const visibles = v.visibles ?? 2
              const ocultas = v.habilidades.slice(visibles)
              return (
                <tr
                  key={v.id}
                  className={`h-48 transition-colors hover:bg-superficie-hover [&>td]:pr-12 [&>td:first-child]:pl-24 [&>td:last-child]:pr-24 ${i < rows.length - 1 ? "border-b border-borde-sutil" : ""}`}
                >
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Seleccionar a ${v.nombre}`}
                      checked={checked.has(v.id)}
                      onChange={() => onToggle(v.id)}
                      className={checkbox}
                    />
                  </td>
                  <td>
                    <span className="flex items-center gap-8">
                      <span className="flex size-28 shrink-0 items-center justify-center rounded-pill bg-acento-200 text-etiqueta-m text-acento-800">
                        {v.iniciales}
                      </span>
                      <span className="truncate text-titulo-s text-texto-primario">{v.nombre}</span>
                    </span>
                  </td>
                  <td className="whitespace-nowrap text-cuerpo-m text-texto-secundario">{v.telefono}</td>
                  <td className="whitespace-nowrap text-cuerpo-m text-texto-secundario">{v.locacion}</td>
                  <td className="whitespace-nowrap text-cuerpo-m text-texto-secundario">{v.email}</td>
                  <td>
                    <span className="flex items-center gap-4">
                      {v.habilidades.slice(0, visibles).map((h) => (
                        <span key={h} className={chip}>
                          {h}
                        </span>
                      ))}
                      {ocultas.length > 0 && (
                        <span className={chip} title={ocultas.join(", ")}>
                          +{ocultas.length}
                        </span>
                      )}
                    </span>
                  </td>
                  <td>
                    <span className="flex items-center gap-8 whitespace-nowrap text-cuerpo-m text-texto-primario">
                      <img src={punto[v.estado]} alt="" width={8} height={8} className="size-8" />
                      {v.estado}
                    </span>
                  </td>
                  <td className={v.turnos === null ? "text-cuerpo-m text-texto-terciario" : "text-cuerpo-m text-texto-primario"}>
                    {v.turnos ?? "—"}
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-24 py-32 text-center text-cuerpo-l text-texto-terciario">
                  Ningún voluntario coincide con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
