import type { Role } from "@/types";
export const UNASSIGNED_MESSAGE = "Tài khoản chưa được phân quyền";
export function assignedRole(role: string | null | undefined): Role | null {
  if (role === "EMPLOYEE") return "employee";
  if (role === "MANAGER") return "manager";
  if (role === "SUPERVISOR") return "supervisor";
  return null;
}
export function loginError(error: { code?: string; message?: string }): string {
  if (error.code === "invalid_credentials" || /invalid login credentials/i.test(error.message ?? "")) return "Email hoặc mật khẩu không đúng. Vui lòng thử lại.";
  if (error.code === "email_not_confirmed") return "Email chưa được xác nhận. Vui lòng kiểm tra hộp thư.";
  if (error.code === "over_request_rate_limit") return "Bạn đã thử quá nhiều lần. Vui lòng chờ rồi thử lại.";
  return "Không thể đăng nhập. Vui lòng kiểm tra kết nối và thử lại.";
}