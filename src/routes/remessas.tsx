import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/remessas")({
  head: () => ({ meta: [{ title: "Remessas — Casca" }] }),
  component: () => (
    <PagePlaceholder title="Remessas" description="Lista completa de cargas, filtros e histórico." icon={Package} />
  ),
});
