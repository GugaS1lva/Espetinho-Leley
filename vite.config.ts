// Configured for external deploy on Vercel.
//
// The Lovable wrapper (@lovable.dev/vite-tanstack-config) by default only runs
// nitro inside the Lovable sandbox (Cloudflare target). For Vercel we force
// nitro on with the `vercel` preset so the build emits `.vercel/output/`,
// which Vercel picks up automatically (Framework Preset: "Other").
//
// Notes:
// - We no longer redirect TanStack Start's server entry to `src/server.ts`.
//   That file was a Cloudflare-style fetch wrapper and is incompatible with
//   Nitro's Vercel preset. The default TanStack Start entry works on Vercel.
// - On Lovable's own infra this file is bypassed, so changes here only affect
//   external deploys (Vercel / local `vite build`).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: process.env.NITRO_PRESET ?? "vercel",
  },
});
