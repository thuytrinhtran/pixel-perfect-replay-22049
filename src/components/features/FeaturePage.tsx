import type { NavItem } from "@/types";
import { PageHeader } from "@/components/common/PageHeader";
import { ComingSoon } from "@/components/common/ComingSoon";

/**
 * Trang chức năng tạm thời. Khi một nhóm phát triển chức năng,
 * tạo component riêng trong src/components/features/<vai-trò>/ và đăng ký trong FEATURE_PAGES
 * (src/components/features/registry.ts).
 */
export function FeaturePage({ item }: { item: NavItem }) {
  return (
    <div>
      <PageHeader title={item.title} description={item.description} icon={item.icon} />
      <ComingSoon title={item.title} />
    </div>
  );
}
