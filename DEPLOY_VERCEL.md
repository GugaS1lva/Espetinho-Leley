# Deploy na Vercel

Este projeto foi adaptado para deploy externo na Vercel (fora da infra do Lovable/Cloudflare).

## Como subir

1. Faça push do repositório no GitHub.
2. Na Vercel, clique em **Add New → Project** e importe o repositório.
3. Configurações do projeto:
   - **Framework Preset**: Other (ou deixe Vercel detectar — `vercel.json` já está configurado).
   - **Build Command**: `vite build` (já no `vercel.json`).
   - **Install Command**: `bun install` (já no `vercel.json`). Se preferir npm/pnpm, edite o `vercel.json`.
   - **Output Directory**: `.vercel/output` (já no `vercel.json` — gerado pelo Nitro preset `vercel`).
4. Variáveis de ambiente (Project Settings → Environment Variables):

| Nome | Onde é usada |
| --- | --- |
| `VITE_SUPABASE_URL` | Cliente (browser) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Cliente (browser) |
| `SUPABASE_URL` | SSR / server functions |
| `SUPABASE_PUBLISHABLE_KEY` | SSR / server functions |
| `SUPABASE_SERVICE_ROLE_KEY` | Server functions (admin / RLS bypass) |

Os valores estão no painel do Lovable Cloud (Supabase) do projeto. Copie cada par para os três ambientes (Production, Preview, Development).

5. Deploy. A Vercel rodará `bun install && vite build`; o Nitro emite `.vercel/output/` e a Vercel serve automaticamente (SSR + assets).

## Observações

- O preview / publish dentro do Lovable continua funcionando — a wrapper `@lovable.dev/vite-tanstack-config` ignora a config de nitro quando detecta o sandbox do Lovable e força Cloudflare lá.
- Para forçar outro target localmente: `NITRO_PRESET=node-server vite build`.
- `src/server.ts` (wrapper de erro estilo Cloudflare) deixou de ser usado pelo build; foi mantido apenas para referência e pode ser removido se quiser.
