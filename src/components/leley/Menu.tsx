import { useState } from "react";
import { Plus } from "lucide-react";
import { CATEGORIES, brl, type Product } from "@/lib/menu-data";

export function Menu({ onAdd }: { onAdd: (p: Product) => void }) {
  const [active, setActive] = useState(CATEGORIES[0].id);

  return (
    <section id="cardapio" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Cardápio</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-foreground md:text-5xl">Escolha sua brasa.</h2>
        </div>
      </div>

      <div className="sticky top-16 z-20 -mx-4 mt-8 overflow-x-auto bg-background/90 px-4 py-3 backdrop-blur">
        <div className="flex gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActive(c.id);
                document.getElementById(`cat-${c.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active === c.id
                  ? "border-transparent bg-secondary text-secondary-foreground shadow-soft"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-1.5">{c.emoji}</span>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-14">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32">
            <h3 className="font-display text-2xl font-semibold text-foreground">
              <span className="mr-2">{cat.emoji}</span>{cat.name}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.products.map((p) => (
                <article
                  key={p.id}
                  className="group flex overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-ember"
                >
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden sm:h-36 sm:w-36">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={400}
                      height={400}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {p.badge && (
                      <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-ember">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
                    <div>
                      <h4 className="text-base font-bold leading-tight text-foreground">{p.name}</h4>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">{brl(p.price)}</span>
                      <button
                        onClick={() => onAdd(p)}
                        aria-label={`Adicionar ${p.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-fire text-primary-foreground shadow-ember transition hover:scale-110 active:scale-95"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}