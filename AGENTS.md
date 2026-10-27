<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Role navigation lives in src/config/navigation.ts; protected dynamic role routes retain existing URLs and dispatch through src/components/features/registry.ts to preserve dashboard links.
- Non-routable feature screens live in src/components/features; route definitions live only in src/routes to comply with TanStack routing.
- Public /login authenticates existing accounts; the pathless _authenticated layout verifies sessions before role routes render.
- Authorization reads only the authenticated caller's existing read-only profiles row through requireSupabaseAuth, never URL, storage or metadata; retain this legacy schema without new tables and never grant clients profile-role writes.
- Attach bearer tokens through functionMiddleware; a single root auth subscriber tracks sessions, and sign-out cancels and clears protected queries to prevent stale data.
