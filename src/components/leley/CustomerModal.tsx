import { useEffect, useMemo, useState } from "react";
import { X, User, Loader2, MapPin, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { z } from "zod";
import type { Customer } from "@/lib/cart-store";

// ---------- Masks & helpers ----------
const onlyDigits = (s: string) => s.replace(/\D+/g, "");

function maskPhone(value: string) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function maskCep(value: string) {
  const d = onlyDigits(value).slice(0, 8);
  return d.length <= 5 ? d : `${d.slice(0, 5)}-${d.slice(5)}`;
}

const VALID_DDDS = new Set([
  11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,
  41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,
  69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99,
]);

export const ADDRESS_LATER_LABEL = "A combinar pelo WhatsApp";

// ---------- Form shape ----------
type AddressMode = "later" | "now";

type FormState = {
  name: string;
  phone: string;
  addressMode: AddressMode;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  reference: string;
  noNumber: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  addressMode: "later",
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  reference: "",
  noNumber: false,
};

// ---------- Validation ----------
const nameRegex = /^[A-Za-zÀ-ÿ'’\-\s]+$/;

const baseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome")
    .max(80, "Nome muito longo")
    .regex(nameRegex, "Use apenas letras"),
  phone: z
    .string()
    .transform(onlyDigits)
    .refine((d) => d.length === 10 || d.length === 11, "Telefone deve ter 10 ou 11 dígitos")
    .refine((d) => VALID_DDDS.has(Number(d.slice(0, 2))), "DDD inválido")
    .refine((d) => d.length === 10 || d[2] === "9", "Celular precisa começar com 9"),
});

function validateAddressNow(f: FormState) {
  const errs: Partial<Record<keyof FormState, string>> = {};
  if (onlyDigits(f.cep).length !== 8) errs.cep = "CEP deve ter 8 dígitos";
  if (f.street.trim().length < 3) errs.street = "Informe a rua";
  if (!f.noNumber) {
    const n = f.number.trim();
    if (!n) errs.number = "Informe o número";
    else if (!/^\d{1,6}[A-Za-z]?$/.test(n)) errs.number = "Número inválido";
  }
  if (f.neighborhood.trim().length < 2) errs.neighborhood = "Informe o bairro";
  if (f.city.trim().length < 2) errs.city = "Informe a cidade";
  return errs;
}

function composeAddress(f: FormState) {
  const num = f.noNumber ? "s/nº" : f.number.trim();
  const line1 = [f.street.trim(), num].filter(Boolean).join(", ");
  const compl = f.complement.trim();
  const head = compl ? `${line1} — ${compl}` : line1;
  const city = `${f.neighborhood.trim()}, ${f.city.trim()}`;
  const cep = `CEP ${maskCep(f.cep)}`;
  const ref = f.reference.trim() ? ` · Ref.: ${f.reference.trim()}` : "";
  return `${head} · ${city} · ${cep}${ref}`;
}

// ---------- Component ----------
export function CustomerModal({
  open,
  onClose,
  initial,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  initial: Customer | null;
  onSave: (c: Customer) => void;
}) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setCepError(null);
    if (initial) {
      const hasAddress = !!initial.address && initial.address !== ADDRESS_LATER_LABEL;
      setForm({
        ...initialForm,
        name: initial.name ?? "",
        phone: maskPhone(initial.phone ?? ""),
        addressMode: hasAddress ? "now" : "later",
      });
    } else {
      setForm(initialForm);
    }
  }, [open, initial]);

  // ViaCEP lookup
  useEffect(() => {
    if (form.addressMode !== "now") return;
    const digits = onlyDigits(form.cep);
    if (digits.length !== 8) return;
    let cancelled = false;
    setCepLoading(true);
    setCepError(null);
    fetch(`https://viacep.com.br/ws/${digits}/json/`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.erro) return setCepError("CEP não encontrado");
        setForm((p) => ({
          ...p,
          street: data.logradouro || p.street,
          neighborhood: data.bairro || p.neighborhood,
          city: data.localidade ? `${data.localidade}${data.uf ? `/${data.uf}` : ""}` : p.city,
        }));
        setErrors((e) => ({ ...e, street: undefined, neighborhood: undefined, city: undefined }));
      })
      .catch(() => !cancelled && setCepError("Não conseguimos consultar o CEP"))
      .finally(() => !cancelled && setCepLoading(false));
    return () => { cancelled = true; };
  }, [form.cep, form.addressMode]);

  const setField = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const canSubmit = useMemo(() => {
    return form.name.trim().length >= 2 && onlyDigits(form.phone).length >= 10;
  }, [form.name, form.phone]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const base = baseSchema.safeParse({ name: form.name, phone: form.phone });
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!base.success) {
      base.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormState;
        if (!errs[k]) errs[k] = i.message;
      });
    }
    if (form.addressMode === "now") {
      Object.assign(errs, validateAddressNow(form));
    }
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave({
      name: form.name.trim().replace(/\s+/g, " "),
      phone: onlyDigits(form.phone),
      address: form.addressMode === "now" ? composeAddress(form) : ADDRESS_LATER_LABEL,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-secondary/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-fire text-primary-foreground shadow-ember">
              <User className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">Quase lá!</h3>
              <p className="text-xs text-muted-foreground">Só o essencial pra mandar pro WhatsApp 🏍️</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted" aria-label="Fechar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
          {/* Essenciais */}
          <section className="space-y-3">
            <Field label="Nome" error={errors.name} required>
              <input
                value={form.name}
                onChange={(e) => setField("name", e.target.value.replace(/[^A-Za-zÀ-ÿ'’\-\s]/g, ""))}
                maxLength={80}
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                className={inputCls(!!errors.name)}
              />
            </Field>
            <Field label="WhatsApp" error={errors.phone} required>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={form.phone}
                  onChange={(e) => setField("phone", maskPhone(e.target.value))}
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="(11) 99999-0000"
                  className={inputCls(!!errors.phone) + " pl-9"}
                />
              </div>
            </Field>
          </section>

          {/* Endereço — escolha */}
          <section className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Endereço de entrega
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <ModeCard
                active={form.addressMode === "later"}
                onClick={() => setField("addressMode", "later")}
                icon={<MessageCircle className="h-4 w-4" />}
                title="Combinar no WhatsApp"
                subtitle="Mais rápido — a gente te chama pra confirmar"
              />
              <ModeCard
                active={form.addressMode === "now"}
                onClick={() => setField("addressMode", "now")}
                icon={<MapPin className="h-4 w-4" />}
                title="Informar agora"
                subtitle="Já adianta sua entrega"
              />
            </div>

            {form.addressMode === "now" && (
              <div className="space-y-3 rounded-2xl border border-border bg-card/60 p-4">
                <Field label="CEP" error={errors.cep ?? cepError ?? undefined} required>
                  <div className="relative">
                    <input
                      value={form.cep}
                      onChange={(e) => setField("cep", maskCep(e.target.value))}
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="00000-000"
                      className={inputCls(!!errors.cep || !!cepError)}
                    />
                    {cepLoading && (
                      <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </Field>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <Field label="Rua / Avenida" error={errors.street} required>
                      <input
                        value={form.street}
                        onChange={(e) => setField("street", e.target.value)}
                        maxLength={120}
                        placeholder="Rua das Flores"
                        className={inputCls(!!errors.street)}
                      />
                    </Field>
                  </div>
                  <Field label="Número" error={errors.number} required>
                    <input
                      value={form.number}
                      onChange={(e) => setField("number", e.target.value.replace(/[^0-9A-Za-z]/g, "").slice(0, 7))}
                      disabled={form.noNumber}
                      inputMode="numeric"
                      placeholder="123"
                      className={inputCls(!!errors.number) + (form.noNumber ? " opacity-50" : "")}
                    />
                  </Field>
                </div>

                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={form.noNumber}
                    onChange={(e) => setField("noNumber", e.target.checked)}
                    className="h-4 w-4 rounded border-input accent-[color:var(--color-primary)]"
                  />
                  Sem número (s/nº)
                </label>

                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-primary">
                    Complemento, bairro e referência
                    <ChevronDown className="h-3.5 w-3.5 transition group-open:rotate-180" />
                  </summary>
                  <div className="mt-3 space-y-3">
                    <Field label="Complemento" hint="Apto, bloco (opcional)">
                      <input
                        value={form.complement}
                        onChange={(e) => setField("complement", e.target.value)}
                        maxLength={60}
                        placeholder="Apto 42, bloco B"
                        className={inputCls(false)}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Bairro" error={errors.neighborhood} required>
                        <input
                          value={form.neighborhood}
                          onChange={(e) => setField("neighborhood", e.target.value)}
                          maxLength={80}
                          placeholder="Centro"
                          className={inputCls(!!errors.neighborhood)}
                        />
                      </Field>
                      <Field label="Cidade / UF" error={errors.city} required>
                        <input
                          value={form.city}
                          onChange={(e) => setField("city", e.target.value)}
                          maxLength={80}
                          placeholder="São Paulo/SP"
                          className={inputCls(!!errors.city)}
                        />
                      </Field>
                    </div>
                    <Field label="Ponto de referência" hint="Opcional">
                      <input
                        value={form.reference}
                        onChange={(e) => setField("reference", e.target.value)}
                        maxLength={120}
                        placeholder="Portão azul, ao lado da padaria"
                        className={inputCls(false)}
                      />
                    </Field>
                  </div>
                </details>
              </div>
            )}
          </section>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-fire px-5 py-3.5 text-base font-bold text-primary-foreground shadow-ember transition hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MessageCircle className="h-5 w-5" />
            {form.addressMode === "now" ? "Salvar e continuar" : "Continuar no WhatsApp"}
          </button>
          <p className="text-center text-[11px] text-muted-foreground">
            Seus dados são usados só pra entregar este pedido.
          </p>
        </form>
      </div>
    </div>
  );
}

// ---------- UI bits ----------
function inputCls(invalid: boolean) {
  return [
    "w-full rounded-xl border bg-card px-4 py-2.5 text-foreground outline-none transition",
    "focus:ring-2",
    invalid
      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
      : "border-input focus:border-primary focus:ring-primary/20",
  ].join(" ");
}

function ModeCard({
  active, onClick, icon, title, subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-start gap-3 rounded-2xl border p-3 text-left transition",
        active
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-border bg-card hover:border-primary/40",
      ].join(" ")}
    >
      <span className={[
        "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full",
        active ? "bg-gradient-fire text-primary-foreground" : "bg-muted text-foreground/70",
      ].join(" ")}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="block text-xs text-muted-foreground">{subtitle}</span>
      </span>
    </button>
  );
}

function Field({
  label, error, hint, required, children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label} {required && <span className="text-primary">*</span>}
        </span>
        {hint && !error && <span className="text-[10px] text-muted-foreground/80">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}
