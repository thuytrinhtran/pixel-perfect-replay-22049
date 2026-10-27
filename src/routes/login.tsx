import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/features/login/LoginPage";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({ unassigned: search.unassigned === true || search.unassigned === "true" }),
  head: () => ({
    meta: [
      { title: "Đăng nhập — JolliShift" },
      { name: "description", content: "Đăng nhập JolliShift — Hệ thống quản lý lịch làm việc." },
      { property: "og:title", content: "Đăng nhập — JolliShift" },
      { property: "og:description", content: "Đăng nhập JolliShift — Hệ thống quản lý lịch làm việc." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <LoginPage unassigned={Route.useSearch().unassigned} />,
});