import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/rotas")({
  head: () => ({ meta: [{ title: "Rotas — Casca" }] }),
  component: () => (
    <PagePlaceholder title="Rotas" description="Planejamento e otimização de rotas." icon={MapPin} />
  ),
});
