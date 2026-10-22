import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Duración de la entrada; las animaciones internas arrancan después. */
export const ENTRADA_MS = 500

interface SlideOverProps {
  labelledBy: string
  /** Clases de ancho, p. ej. "max-w-440". */
  className?: string
  onClose: () => void
  children: (api: { cerrar: () => void; entrado: boolean }) => ReactNode
}

/**
 * Overlay lateral sin scrim: entra desde la derecha en 500 ms, sale igual,
 * se cierra con Esc y no bloquea el resto de la pantalla.
 */
export function SlideOver({ labelledBy, className, onClose, children }: SlideOverProps) {
  const [saliendo, setSaliendo] = useState(false)
  const [entrado, setEntrado] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSaliendo(true)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <aside
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-labelledby={labelledBy}
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget) return
        if (saliendo) onClose()
        else setEntrado(true)
      }}
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-superficie-elevada shadow-e4 outline-none",
        saliendo ? "animate-panel-salir" : "animate-panel-entrar",
        className,
      )}
    >
      {children({ cerrar: () => setSaliendo(true), entrado })}
    </aside>
  )
}
