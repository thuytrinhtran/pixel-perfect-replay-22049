import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { ROLES, isRole } from "@/config/navigation";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/$role")({
  beforeLoad: ({ params }) => {
    if (!isRole(params.role)) throw notFound();
  },
  head: ({ params }) => {
    const label = isRole(params.role) ? ROLES[params.role].label : "JolliShift";
    return { meta: [{ title: `${label} — JolliShift` }] };
  },
  component: RoleLayout,
});

function RoleLayout() {
  const { role } = Route.useParams();
  return (
    <AppShell config={ROLES[role as keyof typeof ROLES]}>
      <Outlet />
    </AppShell>
  );
}
