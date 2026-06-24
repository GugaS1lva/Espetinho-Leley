import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/clientes")({
  head: () => ({ meta: [{ title: "Clientes — Casca" }] }),
  component: () => (
    <PagePlaceholder title="Clientes" description="Embarcadores, contratos e SLA." icon={Users} />
  ),
});
