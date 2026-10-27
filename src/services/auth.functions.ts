import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assignedRole } from "./auth-policy";

// Existing profiles are not writable by browser users. Never accept a role or ID from the caller.
export const getCurrentProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from("profiles")
      .select("id, full_name, role, branch_id, active").eq("id", context.userId).maybeSingle();
    if (error) throw new Error("Không thể đọc hồ sơ tài khoản. Vui lòng kiểm tra quyền truy cập Supabase.");
    const role = assignedRole(data?.role);
    if (!data || !data.active || !role) return null;
    let branchName: string | null = null;
    if (data.branch_id) {
      const branch = await context.supabase.from("branches").select("name").eq("id", data.branch_id).maybeSingle();
      if (branch.error) throw new Error("Không thể đọc thông tin cửa hàng.");
      branchName = branch.data?.name ?? null;
    }
    return { id: data.id, fullName: data.full_name, role, branchName };
  });