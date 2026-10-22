import avatar from "@/assets/icons/avatar.svg"

export function Topbar({ title }: { title: string }) {
  return (
    <header className="flex h-64 w-full shrink-0 items-center justify-between gap-16 border-b border-borde-fuerte bg-superficie-elevada pl-24 pr-32">
      <div className="flex min-w-0 items-center gap-28">
        <h1 className="text-titulo-xl text-texto-primario">{title}</h1>
        <button
          type="button"
          className="hidden cursor-pointer items-center whitespace-pre rounded-[6px] border border-borde-fuerte px-12 py-8 text-cuerpo-m text-texto-primario hover:bg-superficie-hover sm:flex"
        >
          {"Festival Cultural 2026  ▾"}
        </button>
        <input
          type="search"
          placeholder="Buscar…"
          aria-label="Buscar"
          className="hidden w-220 rounded-[6px] border border-borde-fuerte px-12 py-8 text-cuerpo-m text-texto-primario placeholder:text-texto-terciario lg:block"
        />
      </div>
      <div className="flex shrink-0 items-center gap-8">
        <img src={avatar} alt="" width={32} height={32} className="size-32" />
        <span className="text-cuerpo-m text-texto-primario">Admin general</span>
      </div>
    </header>
  )
}
