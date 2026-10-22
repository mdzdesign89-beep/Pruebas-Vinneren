import { AppShell } from "@/components/layout/AppShell"

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <AppShell title={title}>
      <main className="flex flex-1 items-center justify-center p-32">
        <p className="text-cuerpo-l text-texto-terciario">Este módulo todavía no está diseñado.</p>
      </main>
    </AppShell>
  )
}
