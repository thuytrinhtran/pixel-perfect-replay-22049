import { createFileRoute, notFound } from "@tanstack/react-router";
import { findNavItem, isRole } from "@/config/navigation";
import { FeaturePage } from "@/pages/FeaturePage";
import { FEATURE_PAGES } from "@/pages/registry";
import type { Role } from "@/types";

export const Route = createFileRoute("/$role/$section")({
  beforeLoad: ({ params }) => {
    if (!isRole(params.role) || !findNavItem(params.role, params.section)) throw notFound();
  },
  head: ({ params }) => {
    const item = isRole(params.role) ? findNavItem(params.role, params.section) : undefined;
    const title = `${item?.title ?? "Không tìm thấy"} — JolliShift`;
    return {
      meta: [
        { title },
        { name: "description", content: item?.description ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: item?.description ?? "" },
      ],
    };
  },
  component: SectionPage,
});

function SectionPage() {
  const { role, section } = Route.useParams();
  const Impl = FEATURE_PAGES[`${role as Role}/${section}`];
  if (Impl) return <Impl />;
  return <FeaturePage item={findNavItem(role as Role, section)!} />;
}
