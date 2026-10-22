import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type ChipTone = "ok" | "bad" | "warn" | "info" | "atencion"

const tones: Record<ChipTone, string> = {
  ok: "bg-estado-ok-bg text-estado-ok-text",
  bad: "bg-estado-bad-bg text-estado-bad-text",
  warn: "bg-estado-warn-bg text-estado-warn-text",
  info: "bg-estado-info-bg text-estado-info-text",
  atencion: "bg-tipo-atencion-bg text-tipo-atencion-text",
}

interface ChipProps {
  tone: ChipTone
  /** Chip/Ok y Chip/Bad usan Etiqueta/L; Chip/Tipo de turno y Badge usan Título/XS. */
  strong?: boolean
  children: ReactNode
}

export function Chip({ tone, strong, children }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-pill px-8 py-4",
        strong ? "text-titulo-xs" : "text-etiqueta-l",
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}
