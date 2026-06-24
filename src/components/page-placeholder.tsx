import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function PagePlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
      <header className="space-y-1 mb-6">
        <h1 style={{ fontFamily: "Fraunces, serif" }} className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </header>
      <Card className="border-dashed border-border/70 bg-card/50">
        <CardContent className="py-16 flex flex-col items-center text-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
            <Icon className="h-5 w-5" />
          </div>
          <p className="font-medium text-foreground">Em breve</p>
          <p className="text-sm text-muted-foreground max-w-sm">
            Este módulo será conectado à operação. Diga o que quer ver aqui e eu construo.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
