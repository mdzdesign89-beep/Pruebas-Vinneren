import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { conflictos } from "@/data/dashboard"

export function ConflictsCard() {
  const [resueltos, setResueltos] = useState<Set<string>>(new Set())

  return (
    <Card aria-labelledby="conflictos-title" className="flex min-w-0 flex-1 flex-col gap-12 p-20">
      <div className="flex items-center justify-between">
        <h2 id="conflictos-title" className="text-titulo-m text-texto-primario">
          Conflictos de horario
        </h2>
        <a href="#conflictos" className="text-cuerpo-m text-texto-acento hover:underline">
          Ver todos
        </a>
      </div>
      <ul className="flex flex-col">
        {conflictos.map((c) => {
          const resuelto = resueltos.has(c.id)
          return (
            <li key={c.id} className="flex items-center gap-12 py-8">
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <p className="truncate text-titulo-s text-texto-primario">{c.nombre}</p>
                <p className="truncate text-cuerpo-s text-texto-terciario">{c.detalle}</p>
              </div>
              <Button
                disabled={resuelto}
                onClick={() => setResueltos((s) => new Set(s).add(c.id))}
              >
                {resuelto ? "Resuelto" : "Resolver"}
              </Button>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
