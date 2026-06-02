import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/leley/Header";
import { Hero } from "@/components/leley/Hero";
import { Menu } from "@/components/leley/Menu";
import { CartDrawer } from "@/components/leley/CartDrawer";
import { CustomerModal } from "@/components/leley/CustomerModal";
import { InfoSections } from "@/components/leley/InfoSections";
import { useCart } from "@/lib/cart-store";
import { BRAND, brl } from "@/lib/menu-data";
import { ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Espetinho do Leley — Brasa, sabor e delivery no WhatsApp" },
      { name: "description", content: "Cardápio digital do Espetinho do Leley. Monte seu pedido e receba quentinho via WhatsApp. Aberto todos os dias." },
      { property: "og:title", content: "Espetinho do Leley" },
      { property: "og:description", content: "Cardápio, espetinhos, refeições e bebidas. Peça pelo WhatsApp em segundos." },
    ],
  }),
  component: Index,
});

function Index() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);

  const openCart = () => setCartOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cart.count} onCartClick={openCart} />
      <Hero onCta={() => document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" })} />
      <Menu onAdd={cart.add} />
      <InfoSections />

      <footer className="border-t border-border bg-secondary py-8 text-center text-sm text-secondary-foreground/70">
        <p className="font-display text-lg font-bold text-secondary-foreground">{BRAND.name}</p>
        <p className="mt-1">{BRAND.address}</p>
        <p className="mt-3 text-xs">© {new Date().getFullYear()} {BRAND.name}. Feito com brasa 🔥</p>
      </footer>

      {cart.count > 0 && !cartOpen && (
        <button
          onClick={openCart}
          className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full bg-gradient-fire px-5 py-3.5 font-semibold text-primary-foreground shadow-ember transition hover:scale-105 active:scale-95 md:hidden"
        >
          <ShoppingBag className="h-5 w-5" />
          <span>Ver pedido • {cart.count}</span>
          <span className="rounded-full bg-secondary/40 px-2 py-0.5 text-xs">{brl(cart.total)}</span>
        </button>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        total={cart.total}
        setQty={cart.setQty}
        clear={cart.clear}
        customer={cart.customer}
        onNeedCustomer={() => setCustomerOpen(true)}
      />
      <CustomerModal
        open={customerOpen}
        onClose={() => setCustomerOpen(false)}
        initial={cart.customer}
        onSave={(c) => cart.setCustomer(c)}
      />
    </div>
  );
}
