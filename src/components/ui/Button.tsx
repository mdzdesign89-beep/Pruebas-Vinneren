import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  /** md = 36px (por defecto). sm = talla compacta dentro de tarjetas. */
  size?: "md" | "sm"
}

// Estados del componente Btn de Figma (Jerarquía × Estado), incluido Disabled.
const variants = {
  primary:
    "bg-accion-primaria text-texto-inverso enabled:hover:bg-accion-primaria-hover enabled:active:bg-accion-primaria-activa disabled:bg-accion-deshabilitada-bg disabled:text-accion-deshabilitada-texto",
  secondary:
    "border border-accion-secundaria-borde bg-superficie-elevada text-texto-primario enabled:hover:bg-accion-secundaria-hover-bg enabled:active:bg-accion-secundaria-activa-bg disabled:border-accion-deshabilitada-borde disabled:bg-accion-deshabilitada-sec-bg disabled:text-accion-deshabilitada-texto",
}

const sizes = {
  md: "h-36 px-16 rounded-md text-titulo-s",
  sm: "h-[29px] px-12 rounded-[6px] text-titulo-xs",
}

export function Button({ variant = "secondary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center gap-4 whitespace-nowrap transition-colors disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
