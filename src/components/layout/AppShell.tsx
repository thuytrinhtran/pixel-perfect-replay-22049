import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/jollishift-logo.jpg.asset.json";
import type { RoleConfig } from "@/types";
import { cn } from "@/lib/utils";

function SidebarNav({ config, onNavigate }: { config: RoleConfig; onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname }).replace(/\/$/, "");
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-5 py-5">
        <img src={logo.url} alt="Logo JolliShift" className="h-12 w-12 shrink-0 rounded-md object-contain" />
        <div>
          <div className="text-lg font-extrabold leading-none">JolliShift</div>
          <div className="mt-1 text-xs opacity-80">{config.label}</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {config.nav.map((item) => {
          const href = item.slug ? `/${config.role}/${item.slug}` : `/${config.role}`;
          const active = path === href;
          return (
            <Link
              key={item.slug || "home"}
              to={item.slug ? "/$role/$section" : "/$role"}
              params={{ role: config.role, section: item.slug } as never}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "hover:bg-sidebar-accent",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-start gap-3 px-3 py-3">
          <UserRound className="mt-1 h-5 w-5 shrink-0" />
          <dl className="min-w-0 space-y-1 text-xs">
            <div><dt className="opacity-70">Họ tên</dt><dd className="font-semibold">—</dd></div>
            <div><dt className="opacity-70">Vai trò</dt><dd>{config.label}</dd></div>
            <div><dt className="opacity-70">Cửa hàng</dt><dd>—</dd></div>
          </dl>
        </div>
        <Button asChild variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground">
          <Link to="/login" onClick={onNavigate}><LogOut />Đăng xuất</Link>
        </Button>
        <p className="px-3 pt-2 text-[11px] leading-snug opacity-70">
          Nguyên mẫu học thuật — không phải hệ thống chính thức của Jollibee.
        </p>
      </div>
    </div>
  );
}

export function AppShell({ config, children }: { config: RoleConfig; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">
        <SidebarNav config={config} />
      </aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-64">
            <SidebarNav config={config} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur lg:px-8">
          <Button
            variant="ghost" size="icon" className="lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Mở menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="font-semibold lg:hidden">JolliShift</span>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              {config.label}
            </span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
