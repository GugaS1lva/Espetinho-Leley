import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — Casca" }] }),
  component: () => (
    <PagePlaceholder title="Configurações" description="Equipe, integrações e preferências." icon={Settings} />
  ),
});
