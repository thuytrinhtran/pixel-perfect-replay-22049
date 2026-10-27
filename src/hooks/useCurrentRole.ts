import { useParams } from "@tanstack/react-router";
import { ROLES, isRole } from "@/config/navigation";

/** Vai trò hiện tại được lấy từ URL (/employee, /manager, /supervisor). */
export function useCurrentRole() {
  const { role } = useParams({ strict: false }) as { role?: string };
  return role && isRole(role) ? ROLES[role] : null;
}
