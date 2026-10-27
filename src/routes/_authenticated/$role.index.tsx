import { createFileRoute } from "@tanstack/react-router";
import { ROLES, isRole } from "@/config/navigation";
import { RoleDashboard } from "@/components/features/dashboard/RoleDashboard";

export const Route = createFileRoute("/_authenticated/$role/")({
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
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: () => {
    const { role } = Route.useParams();
    return <RoleDashboard config={ROLES[role as keyof typeof ROLES]} />;
  },
});
