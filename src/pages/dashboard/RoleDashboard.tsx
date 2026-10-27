import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { RoleConfig } from "@/types";

/** Dashboard dùng chung khung; mỗi vai trò có các ô thống kê riêng (chưa có dữ liệu). */
const STATS: Record<RoleConfig["role"], string[]> = {
  employee: ["Ca tuần này", "Giờ làm dự kiến", "Yêu cầu đổi ca đang chờ"],
  manager: ["Nhân viên đã đăng ký", "Ca còn thiếu người", "Yêu cầu đổi ca chờ xử lý"],
  supervisor: ["Lịch chờ phê duyệt", "Cửa hàng cần hỗ trợ", "Quyết định trong tháng"],
};

export function RoleDashboard({ config }: { config: RoleConfig }) {
  return (
    <div className="space-y-8">
      <section className="bg-hero relative overflow-hidden rounded-2xl p-6 text-primary-foreground shadow-card lg:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary/30" />
        <p className="text-sm font-medium opacity-90">Xin chào,</p>
        <h1 className="mt-1 text-2xl font-extrabold lg:text-3xl">Tổng quan — {config.label}</h1>
        <p className="mt-2 max-w-xl text-sm opacity-90">{config.description}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {STATS[config.role].map((label) => (
          <div key={label} className="rounded-xl bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-bold text-muted-foreground/50">—</p>
            <p className="mt-1 text-xs text-muted-foreground">Chưa có dữ liệu</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Chức năng</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {config.nav.filter((n) => n.slug).map((item) => (
            <Link
              key={item.slug}
              to="/$role/$section"
              params={{ role: config.role, section: item.slug }}
              className="group rounded-xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
