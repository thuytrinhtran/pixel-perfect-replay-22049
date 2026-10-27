import { createFileRoute, notFound, Outlet, redirect } from "@tanstack/react-router";
import { ROLES, isRole } from "@/config/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { getCurrentProfile } from "@/services/auth.functions";

export const Route = createFileRoute("/_authenticated/$role")({
  beforeLoad: async ({ params }) => {
    if (!isRole(params.role)) throw notFound();
    const profile = await getCurrentProfile();
    if (!profile) throw redirect({ to: "/login", search: { unassigned: true }, replace: true });
    if (params.role !== profile.role) throw redirect({ to: "/$role", params: { role: profile.role }, replace: true });
    return { profile };
  },
  head: ({ params }) => {
    const label = isRole(params.role) ? ROLES[params.role].label : "JolliShift";
    return { meta: [{ title: `${label} — JolliShift` }] };
  },
  component: RoleLayout,
});

function RoleLayout() {
  const { role } = Route.useParams();
  const { profile } = Route.useRouteContext();
  return (
    <AppShell config={ROLES[role as keyof typeof ROLES]} profile={profile}>
      <Outlet />
    </AppShell>
  );
}
