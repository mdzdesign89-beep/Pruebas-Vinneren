import filtrar from "@/assets/icons/filtrar.svg"
import { Chip } from "@/components/ui/Chip"
import { estadoTone, type Actividad } from "@/data/dashboard"
import { cn } from "@/lib/utils"

interface ActivityTableProps {
  rows: Actividad[]
  selectedId: string | null
  onSelect: (id: string) => void
  checked: Set<string>
  onToggle: (id: string) => void
  onToggleAll: () => void
}

const checkbox =
  "size-16 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-borde-fuerte bg-superficie-elevada checked:border-accion-primaria checked:bg-accion-primaria"

function FilterHeader({ label, className }: { label: string; className: string }) {
  return (
    <th scope="col" className={cn("p-0 font-normal", className)}>
      <button type="button" className="flex h-16 w-full cursor-pointer items-center gap-4 text-left">
        <span className="min-w-0 flex-1 text-cuerpo-m text-texto-primario">{label}</span>
        <img src={filtrar} alt="Filtrar" width={14} height={14} className="size-14 shrink-0" />
      </button>
    </th>
  )
}

export function ActivityTable({ rows, selectedId, onSelect, checked, onToggle, onToggleAll }: ActivityTableProps) {
  const allChecked = rows.length > 0 && rows.every((r) => checked.has(r.id))

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-borde-sutil bg-superficie-elevada shadow-e1">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="h-56 border-b border-borde-fuerte bg-superficie-base [&>th]:pr-12 [&>th:first-child]:pl-24 [&>th:last-child]:pr-24">
              <th scope="col" className="w-28 p-0">
                <input
                  type="checkbox"
                  aria-label="Seleccionar todas"
                  checked={allChecked}
                  onChange={onToggleAll}
                  className={cn(checkbox, "block")}
                />
              </th>
              <th scope="col" className="w-222 text-cuerpo-m text-texto-terciario">Actividad</th>
              <th scope="col" className="w-72 text-cuerpo-m text-texto-terciario">Turnos</th>
              <th scope="col" className="w-142 text-cuerpo-m text-texto-terciario">Periodo</th>
              <FilterHeader label="Cobertura" className="w-142" />
              <FilterHeader label="Estado" className="w-126" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const selected = row.id === selectedId
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelect(row.id)}
                  aria-selected={selected}
                  className={cn(
                    "h-52 cursor-pointer transition-colors [&>td]:pr-12 [&>td:first-child]:pl-24 [&>td:last-child]:pr-24",
                    selected ? "bg-superficie-seleccionada" : "hover:bg-superficie-hover",
                    !selected && i < rows.length - 1 && rows[i + 1]?.id !== selectedId && "border-b border-borde-sutil",
                  )}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      aria-label={`Seleccionar ${row.nombre}`}
                      checked={checked.has(row.id)}
                      onChange={() => onToggle(row.id)}
                      className={cn(checkbox, "block")}
                    />
                  </td>
                  <td>
                    <p className="text-titulo-s text-texto-primario">{row.nombre}</p>
                    <p className="mt-4 text-cuerpo-s text-texto-terciario">{row.lugar}</p>
                  </td>
                  <td className="text-titulo-s text-texto-primario">{row.turnos}</td>
                  <td className="text-cuerpo-l text-texto-primario">{row.periodo}</td>
                  <td className="whitespace-nowrap">
                    <span className="text-[13px] font-semibold text-texto-primario">
                      {row.cubiertos}/{row.total}
                    </span>
                    <span className="text-cuerpo-s text-texto-terciario"> · mín {row.minimo}</span>
                  </td>
                  <td>
                    <Chip tone={estadoTone[row.estado]} strong={row.estado === "Abierto"}>
                      {row.estado}
                    </Chip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
