import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Enseña a tailwind-merge los estilos de texto custom para que no los confunda
// con utilidades de color `text-*`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "dato-xl", "dato-m", "titulo-xl", "titulo-m", "titulo-s", "titulo-xs",
            "navegacion-l", "cuerpo-l", "cuerpo-m", "cuerpo-s",
            "etiqueta-l", "etiqueta-m", "etiqueta-micro",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
