import { ShoppingBag } from "lucide-react";
import { BRAND } from "@/lib/menu-data";
import logo from "@/assets/logo-leley.png";

export function Header({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#topo" className="flex items-center gap-2">
          <img
            src={logo}
            alt={`Logotipo ${BRAND.name}`}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover shadow-ember ring-2 ring-primary"
          />
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold text-foreground">{BRAND.name}</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Desde {BRAND.since} · Centro</p>
          </div>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a href="#cardapio" className="transition hover:text-foreground">Cardápio</a>
          <a href="#horarios" className="transition hover:text-foreground">Horários</a>
          <a href="#sobre" className="transition hover:text-foreground">Sobre</a>
          <a href="#contato" className="transition hover:text-foreground">Contato</a>
        </nav>
        <button
          onClick={onCartClick}
          className="relative inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Meu pedido</span>
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground shadow-ember">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}