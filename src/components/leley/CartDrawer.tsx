import { useEffect } from "react";
import { Minus, Plus, Trash2, X, MessageCircle } from "lucide-react";
import { brl, BRAND } from "@/lib/menu-data";
import type { CartItem, Customer } from "@/lib/cart-store";

export function CartDrawer({
  open,
  onClose,
  items,
  total,
  setQty,
  clear,
  customer,
  onNeedCustomer,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  customer: Customer | null;
  onNeedCustomer: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const checkout = () => {
    if (!customer) { onNeedCustomer(); return; }
    const lines = items.map((i) => `• ${i.qty}x ${i.product.name} — ${brl(i.product.price * i.qty)}`).join("\n");
    const addressLine = customer.address
      ? `*Endereço:* ${customer.address}\n`
      : `*Endereço:* a combinar por aqui 📍\n`;
    const msg =
      `*Novo pedido — ${BRAND.name}*\n\n` +
      `*Cliente:* ${customer.name}\n` +
      `*Telefone:* ${customer.phone}\n` +
      addressLine + `\n` +
      `*Itens:*\n${lines}\n\n` +
      `*Total:* ${brl(total)}\n\n`;
    const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-secondary/60 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">Meu pedido</h3>
            <p className="text-xs text-muted-foreground">{items.length} {items.length === 1 ? "item" : "itens"}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-muted text-3xl">🍢</div>
              <p className="mt-4 font-display text-lg font-semibold text-foreground">Seu carrinho está vazio</p>
              <p className="mt-1 text-sm text-muted-foreground">Adicione espetinhos pra começar a festa.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.product.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
                  <img src={i.product.image} alt={i.product.name} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{i.product.name}</p>
                    <p className="text-sm text-muted-foreground">{brl(i.product.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => setQty(i.product.id, i.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full border border-border text-foreground hover:bg-muted">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold">{i.qty}</span>
                      <button onClick={() => setQty(i.product.id, i.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => setQty(i.product.id, 0)} className="ml-auto p-1.5 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="font-display text-base font-semibold text-foreground">{brl(i.product.price * i.qty)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border bg-card px-5 py-4">
            {customer && (
              <div className="mb-3 rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">
                Entregar para <span className="font-semibold text-foreground">{customer.name}</span> — {customer.address}
                <button onClick={onNeedCustomer} className="ml-2 font-semibold text-primary hover:underline">editar</button>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-2xl font-semibold text-foreground">{brl(total)}</span>
            </div>
            <button
              onClick={checkout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-4 text-base font-bold text-whatsapp-foreground shadow-ember transition hover:brightness-110 active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" /> Pedir pelo WhatsApp
            </button>
            <button onClick={clear} className="mt-2 w-full py-2 text-xs font-semibold text-muted-foreground hover:text-destructive">
              Limpar pedido
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}