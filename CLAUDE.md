# wopr-plugin-bluebubbles

BlueBubbles iMessage/SMS bridge channel plugin for WOPR.

## Commands

```
bun run build       # tsc
bun run check       # biome check + tsc --noEmit (run before committing)
bun run lint:fix    # biome check --fix src/
bun run format      # biome format --write src/
bun run test        # vitest run
```

## Architecture

```
src/
  index.ts              # Plugin entry -- exports WOPRPlugin default, wires Socket.IO events
  types.ts              # Plugin-local types + BlueBubbles API types
  bluebubbles-client.ts # REST API + Socket.IO client wrapper
```

## Key Details

- **Transport**: Socket.IO (socket.io-client) for inbound events, REST API (native fetch) for outbound
- No webhook server needed -- BlueBubbles pushes events via Socket.IO
- Implements WOPRPlugin contract from plugin-local types
- Auth: server password passed as query param on all requests
- Reactions/tapbacks require BlueBubbles Private API (detected at startup)

## Plugin Contract

Imports only from local types. Never import from `@wopr-network/wopr` core.

## Issue Tracking

All issues in **Linear** (team: WOPR). Issue descriptions start with `**Repo:** wopr-network/wopr-plugin-bluebubbles`.

## Session Memory

At the start of every WOPR session, **read `~/.wopr-memory.md` if it exists.** It contains recent session context: which repos were active, what branches are in flight, and how many uncommitted changes exist. Use it to orient quickly without re-investigating.

The `Stop` hook writes to this file automatically at session end. Only non-main branches are recorded — if everything is on `main`, nothing is written for that repo.