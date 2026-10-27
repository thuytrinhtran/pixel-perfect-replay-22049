import type { ComponentType } from "react";
import type { Role } from "@/types";
import ShiftSchedulingPage from "@/components/features/manager/ShiftSchedulingPage";

/**
 * Đăng ký trang đã triển khai theo "vai-trò/slug".
 * Ví dụ: "employee/dang-ky-ca": ShiftRegistrationPage
 * Slug chưa đăng ký sẽ hiển thị trạng thái "Đang phát triển".
 */
export const FEATURE_PAGES: Partial<Record<`${Role}/${string}`, ComponentType>> = {
  "manager/xep-lich": ShiftSchedulingPage,
};
