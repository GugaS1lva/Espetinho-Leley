import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/relatorios")({
  head: () => ({ meta: [{ title: "Relatórios — Casca" }] }),
  component: () => (
    <PagePlaceholder title="Relatórios" description="Performance, custos e produtividade." icon={BarChart3} />
  ),
});
