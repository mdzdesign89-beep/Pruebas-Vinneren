import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/** Superficie elevada (E1) con radio xl, base de los paneles del dashboard. */
export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("rounded-xl bg-superficie-elevada shadow-e1", className)} {...props} />
}
