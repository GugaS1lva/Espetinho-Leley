import { Clock, MapPin, Phone, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/menu-data";
import { Embers } from "./Embers";
import { useEffect, useState } from "react";
import equipe1 from "@/assets/equipe-1.jpg";
import equipe2 from "@/assets/equipe-2.jpg";

export function InfoSections() {
  return (
    <>
      <section id="horarios" className="relative overflow-hidden bg-gradient-charcoal py-16 text-secondary-foreground md:py-24">
        <div className="absolute inset-0 bg-aurora opacity-50" />
        <Embers count={10} />
        <div className="relative mx-auto max-w-6xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Funcionamento</p>
          <h2 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Aberto todos os dias.</h2>
          <p className="mt-3 max-w-xl text-secondary-foreground/75">De domingo a domingo, a brasa está acesa pra você.</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <ShiftCard title="Almoço" hours={BRAND.hoursLunch} sub="Pratos feitos, refeições do dia e brasa direto na mesa." />
            <ShiftCard title="Jantar" hours={BRAND.hoursDinner} sub="Espetinhos, porções e a melhor cerveja gelada da região." />
          </div>
        </div>
      </section>

      <section id="sobre" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Nossa história</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-foreground md:text-5xl">
              Tradição familiar, tempero de quem ama o que faz.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              O Espetinho do Leley nasceu de uma paixão: reunir gente boa em volta da brasa.
              Há anos servimos a vizinhança com carnes selecionadas, tempero da casa e aquele
              atendimento que faz você se sentir em família. Cada espeto sai daqui com carinho —
              e agora vai direto da nossa brasa pra sua mesa.
            </p>
          </div>
          <TeamSlideshow />
        </div>
      </section>

      <section id="contato" className="border-t border-border bg-muted/40 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 md:grid-cols-3">
          <ContactCard icon={<MapPin className="h-5 w-5" />} title="Endereço" lines={[BRAND.address, BRAND.addressNote]} />
          <ContactCard
            icon={<Phone className="h-5 w-5" />}
            title="Telefones"
            lines={[`Loja: ${BRAND.phone}`, `Delivery: ${BRAND.phoneDelivery}`]}
          />
          <ContactCard
            icon={<Clock className="h-5 w-5" />}
            title="Horários"
            lines={[`Almoço: ${BRAND.hoursLunch}`, `Jantar: ${BRAND.hoursDinner}`, "Aberto todos os dias"]}
          />
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-4">
          <a
            href={`https://wa.me/${BRAND.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 text-base font-bold text-whatsapp-foreground shadow-ember transition hover:brightness-110 hover:scale-[1.01]"
          >
            <MessageCircle className="h-5 w-5" /> Falar com a gente no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

function ShiftCard({ title, hours, sub }: { title: string; hours: string; sub: string }) {
  return (
    <div className="rounded-3xl border border-secondary-foreground/10 bg-secondary/40 p-6 backdrop-blur">
      <div className="flex items-center gap-2 text-accent">
        <Clock className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
      </div>
      <p className="mt-3 font-display text-4xl font-semibold text-secondary-foreground">{hours}</p>
      <p className="mt-2 text-sm text-secondary-foreground/75">{sub}</p>
    </div>
  );
}

function ContactCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
      </div>
      <div className="mt-3 space-y-1 text-sm text-foreground">
        {lines.map((l) => <p key={l}>{l}</p>)}
      </div>
    </div>
  );
}

function TeamSlideshow() {
  const images = [equipe1, equipe2];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card shadow-soft md:aspect-square">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Equipe do Espetinho do Leley"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-display text-lg font-semibold text-white">Nossa equipe</p>
        <p className="text-sm text-white/80">A família por trás da brasa.</p>
      </div>
    </div>
  );
}