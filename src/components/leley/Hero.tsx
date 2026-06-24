import { Flame, Clock, MapPin } from "lucide-react";
import hero from "@/assets/hero-espetinho.jpg";
import logo from "@/assets/logo-leley.png";
import { BRAND } from "@/lib/menu-data";
import { Embers } from "./Embers";

export function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section id="topo" className="relative overflow-hidden bg-gradient-charcoal text-secondary-foreground">
      <img
        src={hero}
        alt="Espetinhos grelhando na brasa"
        width={1600}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/60 to-transparent" />
      <div className="absolute inset-0 bg-aurora opacity-70" />
      <Embers count={28} />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:py-32">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-secondary/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            <Flame className="h-3.5 w-3.5" /> Desde {BRAND.since} · 100% na brasa
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-balance md:text-7xl">
            Sabor que vira <span className="bg-gradient-fire bg-clip-text text-transparent">tradição</span>.
          </h1>
          <p className="mt-5 max-w-lg text-lg normal-case text-secondary-foreground/80" style={{ fontFamily: "var(--font-sans)" }}>
            {BRAND.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onCta}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-fire px-7 py-3.5 text-base font-bold text-primary-foreground shadow-ember transition hover:scale-[1.02] active:scale-95 animate-glow"
            >
              <Flame className="h-5 w-5 animate-flicker" /> Ver cardápio
            </button>
            <a
              href="#horarios"
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-secondary/40 px-7 py-3.5 text-base font-semibold text-accent transition hover:bg-secondary/60"
            >
              <Clock className="h-5 w-5" /> Horários
            </a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-3 text-sm">
            <Pill icon={<Clock className="h-4 w-4" />} title="Aberto agora" sub={`${BRAND.hoursLunch} • ${BRAND.hoursDinner}`} />
            <Pill icon={<MapPin className="h-4 w-4" />} title="Centro" sub={BRAND.address} />
          </div>
        </div>

        <div className="relative hidden items-center justify-center md:flex animate-rise" style={{ animationDelay: "120ms" }}>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,oklch(0.58_0.235_28/.45),transparent_70%)]" />
          <img
            src={logo}
            alt={`Logotipo ${BRAND.name}`}
            width={520}
            height={520}
            className="w-full max-w-md drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-flicker"
          />
        </div>
      </div>
    </section>
  );
}

function Pill({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-secondary-foreground/10 bg-secondary/40 p-3 backdrop-blur">
      <div className="flex items-center gap-2 text-accent">{icon}<span className="text-xs font-bold uppercase tracking-wider">{title}</span></div>
      <p className="mt-1 text-sm normal-case text-secondary-foreground/85" style={{ fontFamily: "var(--font-sans)" }}>{sub}</p>
    </div>
  );
}