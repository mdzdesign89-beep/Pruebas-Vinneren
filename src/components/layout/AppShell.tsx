import type { ReactNode } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-start bg-superficie-base">
      <Sidebar />
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <Topbar title={title} />
        {children}
      </div>
    </div>
  )
}
