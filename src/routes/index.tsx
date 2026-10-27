import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => { throw redirect({ to: "/login", replace: true }); },
  head: () => ({
    meta: [
      { title: "JolliShift — Đăng ký & xếp lịch ca làm" },
      { name: "description", content: "Nguyên mẫu hỗ trợ đăng ký nguyện vọng ca, xếp lịch và đổi ca tại cửa hàng." },
      { property: "og:title", content: "JolliShift — Đăng ký & xếp lịch ca làm" },
      { property: "og:description", content: "Nguyên mẫu hỗ trợ đăng ký nguyện vọng ca, xếp lịch và đổi ca tại cửa hàng." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
