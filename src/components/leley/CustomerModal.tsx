import { useEffect, useState } from "react";
import { X, User } from "lucide-react";
import { z } from "zod";
import type { Customer } from "@/lib/cart-store";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo").max(80),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
  address: z.string().trim().min(5, "Endereço muito curto").max(160),
});

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
  const [form, setForm] = useState<Customer>({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});

  useEffect(() => {
    if (open) {
      setForm(initial ?? { name: "", phone: "", address: "" });
      setErrors({});
    }
  }, [open, initial]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Partial<Record<keyof Customer, string>> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Customer] = i.message; });
      setErrors(errs);
      return;
    }
    onSave(r.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-secondary/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-background p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-fire text-primary-foreground shadow-ember">
              <User className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">Seus dados</h3>
              <p className="text-xs text-muted-foreground">Só pra agilizar a entrega 🏍️</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Nome completo" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={80}
              placeholder="Ex.: Maria Silva"
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </Field>
          <Field label="WhatsApp / Telefone" error={errors.phone}>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={20}
              inputMode="tel"
              placeholder="(11) 99999-0000"
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </Field>
          <Field label="Endereço de entrega" error={errors.address}>
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              maxLength={160}
              placeholder="Rua, número, bairro, complemento"
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </Field>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-gradient-fire px-5 py-3.5 text-base font-bold text-primary-foreground shadow-ember transition hover:scale-[1.01] active:scale-95"
          >
            Salvar e continuar
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}