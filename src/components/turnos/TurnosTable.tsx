import filtrar from "@/assets/icons/filtrar.svg"
import { Chip, type ChipTone } from "@/components/ui/Chip"
import type { TonoTurno } from "@/data/calendario"
import type { TurnoFila } from "@/data/turnos"
import { cn } from "@/lib/utils"

const chipTone: Record<TonoTurno, ChipTone> = { ok: "ok", warn: "warn", bad: "bad", "bad-sutil": "bad" }

const checkbox =
  "block size-16 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-borde-fuerte bg-superficie-elevada checked:border-accion-primaria checked:bg-accion-primaria"

interface TurnosTableProps {
  rows: TurnoFila[]
  selectedId: string | null
  onSelect: (id: string) => void
  checked: Set<string>
  onToggle: (id: string) => void
  onToggleAll: () => void
}

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

export function TurnosTable({ rows, selectedId, onSelect, checked, onToggle, onToggleAll }: TurnosTableProps) {
  const allChecked = rows.length > 0 && rows.every((r) => checked.has(r.id))

  return (
    <div className="min-w-0 flex-1 self-stretch overflow-hidden rounded-md border border-borde-fuerte bg-superficie-elevada">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-borde-fuerte bg-superficie-sutil [&>th]:py-12 [&>th]:pr-12 [&>th:first-child]:pl-24 [&>th:last-child]:pr-24">
              <th scope="col" className="w-28">
                <input type="checkbox" aria-label="Seleccionar todos" checked={allChecked} onChange={onToggleAll} className={checkbox} />
              </th>
              <th scope="col" className="w-137 text-cuerpo-m text-texto-terciario">Turno</th>
              <FilterHeader label="Locación" className="w-142" />
              <th scope="col" className="w-162 text-cuerpo-m text-texto-terciario">Fecha y hora</th>
              <FilterHeader label="Cobertura" className="w-127" />
              <FilterHeader label="Estado" className="w-124" />
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
                    "h-48 cursor-pointer transition-colors [&>td]:pr-12 [&>td:first-child]:pl-24 [&>td:last-child]:pr-24",
                    selected ? "bg-superficie-seleccionada" : "hover:bg-superficie-hover",
                    !selected && i < rows.length - 1 && rows[i + 1]?.id !== selectedId && "border-b border-borde-sutil",
                  )}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      aria-label={`Seleccionar ${row.nombre} ${row.dia}`}
                      checked={checked.has(row.id)}
                      onChange={() => onToggle(row.id)}
                      className={checkbox}
                    />
                  </td>
                  <td className="whitespace-nowrap text-titulo-s text-texto-primario">{row.nombre}</td>
                  <td className="text-cuerpo-m text-texto-secundario">{row.lugar}</td>
                  <td className="whitespace-nowrap text-cuerpo-m text-texto-primario">
                    {row.dia} · {row.horario.replace(" – ", "–")}
                  </td>
                  <td className="whitespace-nowrap">
                    <span className="text-[13px] font-semibold text-texto-primario">
                      {row.voluntarios.length}/{row.cupo}
                    </span>
                    <span className="text-cuerpo-s text-texto-terciario"> · mín {row.minimo}</span>
                  </td>
                  <td>
                    <Chip tone={chipTone[row.tono]}>{row.etiqueta}</Chip>
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
