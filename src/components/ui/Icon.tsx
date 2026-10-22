import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface IconProps {
  src: string
  size: number
  className?: string
}

/**
 * Pinta un icono SVG de Figma con `currentColor` usando el archivo como máscara,
 * para que el color venga de los tokens (text-*) sin editar el asset.
 */
export function Icon({ src, size, className }: IconProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    maskImage: `url("${src}")`,
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
  }
  return <span aria-hidden className={cn("inline-block shrink-0 bg-current", className)} style={style} />
}
