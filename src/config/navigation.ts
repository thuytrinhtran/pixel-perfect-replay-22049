import {
  Bell,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  ClipboardCheck,
  ClipboardList,
  History,
  LayoutDashboard,
  LifeBuoy,
  Repeat,
  ShieldCheck,
  SlidersHorizontal,
  User,
  Users,
  UsersRound,
} from "lucide-react";
import type { NavItem, Role, RoleConfig } from "@/types";

const dashboard: NavItem = {
  slug: "",
  title: "Tổng quan",
  description: "Thông tin chính trong tuần của bạn.",
  icon: LayoutDashboard,
};

const notifications: NavItem = {
  slug: "thong-bao",
  title: "Thông báo",
  description: "Cập nhật về lịch làm, đổi ca và phê duyệt.",
  icon: Bell,
};

export const ROLES: Record<Role, RoleConfig> = {
  employee: {
    role: "employee",
    label: "Nhân viên",
    shortLabel: "Nhân viên",
    description: "Đăng ký nguyện vọng ca làm, xem lịch và gửi yêu cầu đổi ca.",
    icon: User,
    nav: [
      dashboard,
      { slug: "dang-ky-ca", title: "Đăng ký ca làm", description: "Gửi nguyện vọng ca làm cho tuần tới.", icon: CalendarCheck },
      { slug: "lich-lam-viec", title: "Lịch làm việc", description: "Xem lịch làm việc đã được công bố.", icon: CalendarDays },
      { slug: "doi-ca", title: "Yêu cầu đổi ca", description: "Tạo và theo dõi yêu cầu đổi ca.", icon: Repeat },
      notifications,
    ],
  },
  manager: {
    role: "manager",
    label: "Quản lý ca",
    shortLabel: "Quản lý",
    description: "Tổng hợp đăng ký, xác định nhu cầu nhân sự và xếp lịch cửa hàng.",
    icon: Users,
    nav: [
      dashboard,
      { slug: "tong-hop-dang-ky", title: "Tổng hợp đăng ký", description: "Xem toàn bộ nguyện vọng ca của nhân viên.", icon: ClipboardList },
      { slug: "nhu-cau-nhan-su", title: "Nhu cầu nhân sự", description: "Thiết lập số người cần cho từng ca.", icon: UsersRound },
      { slug: "xep-lich", title: "Xếp lịch làm việc", description: "Phân công nhân viên vào các ca.", icon: CalendarRange },
      { slug: "dieu-chinh-lich", title: "Điều chỉnh lịch", description: "Sửa lịch sau khi đã công bố.", icon: SlidersHorizontal },
      { slug: "xu-ly-doi-ca", title: "Xử lý đổi ca", description: "Duyệt hoặc từ chối yêu cầu đổi ca.", icon: Repeat },
      notifications,
    ],
  },
  supervisor: {
    role: "supervisor",
    label: "Giám sát khu vực",
    shortLabel: "Giám sát",
    description: "Phê duyệt lịch các cửa hàng và điều phối hỗ trợ nhân sự.",
    icon: ShieldCheck,
    nav: [
      dashboard,
      { slug: "phe-duyet-lich", title: "Phê duyệt lịch", description: "Xem xét lịch do quản lý ca gửi lên.", icon: ClipboardCheck },
      { slug: "ho-tro-nhan-su", title: "Hỗ trợ nhân sự", description: "Điều phối nhân sự giữa các cửa hàng.", icon: LifeBuoy },
      { slug: "lich-su-phe-duyet", title: "Lịch sử phê duyệt", description: "Tra cứu các quyết định đã đưa ra.", icon: History },
      notifications,
    ],
  },
};

export const ROLE_LIST = Object.values(ROLES);

export function isRole(value: string): value is Role {
  return value in ROLES;
}

export function findNavItem(role: Role, slug: string) {
  return ROLES[role].nav.find((n) => n.slug === slug);
}

export { CalendarClock as AppIcon };
