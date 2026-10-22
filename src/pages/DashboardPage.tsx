import { useState } from "react"
import { ActivityTable } from "@/components/dashboard/ActivityTable"
import { ConflictsCard } from "@/components/dashboard/ConflictsCard"
import { FunnelChart } from "@/components/dashboard/FunnelChart"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { ShiftDetail } from "@/components/dashboard/ShiftDetail"
import { AppShell } from "@/components/layout/AppShell"
import { actividades, kpis } from "@/data/dashboard"

export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState<string | null>("talleres")
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleAll = () =>
    setChecked((prev) => (prev.size === actividades.length ? new Set() : new Set(actividades.map((a) => a.id))))

  return (
    <AppShell title="Dashboard">
      <main className="flex min-h-0 w-full flex-1 flex-col gap-24 overflow-y-auto p-16 sm:p-32">
        <section aria-label="Indicadores" className="grid grid-cols-2 gap-16 md:grid-cols-3 xl:grid-cols-5">
          {kpis.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </section>

        <div className="flex w-full flex-col gap-24 xl:h-480 xl:flex-row">
          <ActivityTable
            rows={actividades}
            selectedId={selectedId}
            onSelect={setSelectedId}
            checked={checked}
            onToggle={toggle}
            onToggleAll={toggleAll}
          />
          <ShiftDetail />
        </div>

        <div className="flex w-full flex-col gap-24 lg:flex-row">
          <ConflictsCard />
          <FunnelChart />
        </div>
      </main>
    </AppShell>
  )
}
