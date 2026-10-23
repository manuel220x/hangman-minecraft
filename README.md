# Ahorcado Minecraft · Hangman

Hangman for the browser with a Minecraft block theme. Word pool mixes **Spanish
and English**, drawn at random each round. You get **7 lives** (hearts); each
wrong guess adds one part to the pixel gallows.

## Play

- Tap the on-screen keyboard (big touch targets, mobile-first) or use a physical
  keyboard (`a`-`z`, `ñ`). `Enter` starts a new game when the round is over.
- Each word shows its language badge (ES/EN) and a category hint.
- Wins / losses / streaks are kept in `localStorage`.

## Stack

- Vite + React 18 + TypeScript, no runtime dependencies beyond React.
- Pixel-art theme in plain CSS (Press Start 2P + VT323 from Google Fonts).
- Production image: `node:22-alpine` build stage → `nginx:1.27-alpine` serving
  the static bundle (`nginx.conf`).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-check + production build into dist/
pnpm preview    # serve the production build locally
```

## Deploy (Dokploy)

`docker-compose.yml` runs the web container on `127.0.0.1:8082` (debug) and
joins the external `dokploy-network` so Traefik can route to it. The public
domain `hangman.asistaby.com` is attached in Dokploy (Traefik) and needs a DNS
record pointing at the server.

If the app code changes, bump `image: hangman-minecraft-web:<tag>` in
`docker-compose.yml` so compose does not silently reuse a stale image.
