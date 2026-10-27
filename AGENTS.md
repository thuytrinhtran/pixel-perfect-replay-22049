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
- Role navigation lives in src/config/navigation.ts; routes `/$role` and `/$role/$section` render from it — add features by registering a page in src/pages/registry.ts, not new route files.
- Code is split into src/pages, src/components, src/hooks, src/services, src/types so team members can work per feature.
