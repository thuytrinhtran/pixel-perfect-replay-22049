import { createFileRoute } from "@tanstack/react-router";
import { ROLES, isRole } from "@/config/navigation";
import { RoleDashboard } from "@/pages/dashboard/RoleDashboard";

export const Route = createFileRoute("/$role/")({
  head: ({ params }) => {
    const label = isRole(params.role) ? ROLES[params.role].label : "";
    const title = `Tổng quan ${label} — JolliShift`;
    const description = `Bảng tổng quan dành cho ${label} trong JolliShift.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: () => {
    const { role } = Route.useParams();
    return <RoleDashboard config={ROLES[role as keyof typeof ROLES]} />;
  },
});
