interface KpiCardProps {
  label: string
  value: string
  hint: string
}

export function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-md border border-borde-fuerte bg-superficie-elevada p-16">
      <p className="truncate text-cuerpo-s text-texto-terciario">{label}</p>
      <p className="text-dato-xl text-texto-primario">{value}</p>
      <p className="truncate text-cuerpo-s text-texto-terciario">{hint}</p>
    </div>
  )
}
