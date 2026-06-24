import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/frota")({
  head: () => ({ meta: [{ title: "Frota — Casca" }] }),
  component: () => (
    <PagePlaceholder title="Frota" description="Veículos, manutenção e telemetria." icon={Truck} />
  ),
});
