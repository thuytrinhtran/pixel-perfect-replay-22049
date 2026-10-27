import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock } from "lucide-react";
import { ROLE_LIST } from "@/config/navigation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JolliShift — Đăng ký & xếp lịch ca làm" },
      { name: "description", content: "Nguyên mẫu hỗ trợ đăng ký nguyện vọng ca, xếp lịch và đổi ca tại cửa hàng." },
      { property: "og:title", content: "JolliShift — Đăng ký & xếp lịch ca làm" },
      { property: "og:description", content: "Nguyên mẫu hỗ trợ đăng ký nguyện vọng ca, xếp lịch và đổi ca tại cửa hàng." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-5xl px-6 pb-24 pt-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <CalendarClock className="h-6 w-6" />
            </div>
            <span className="text-xl font-extrabold">JolliShift</span>
          </div>
          <h1 className="mt-12 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Đăng ký ca, xếp lịch và đổi ca — gọn trong một nơi.
          </h1>
          <p className="mt-4 max-w-xl opacity-90">Chọn vai trò để vào không gian làm việc của bạn.</p>
        </div>
      </header>
      <main className="mx-auto -mt-14 max-w-5xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          {ROLE_LIST.map((r) => (
            <Link
              key={r.role}
              to="/$role"
              params={{ role: r.role }}
              className="group flex flex-col rounded-2xl border-t-4 border-secondary bg-card p-6 shadow-card transition hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <r.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-lg font-bold">{r.label}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Vào hệ thống <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          Ứng dụng nguyên mẫu phục vụ đồ án học thuật — không phải hệ thống chính thức của Jollibee.
        </p>
      </main>
    </div>
  );
}
