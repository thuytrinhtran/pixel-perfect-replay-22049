/**
 * Lớp dịch vụ (services) — nơi gọi backend (Supabase dự kiến).
 * Mỗi nhóm chức năng sẽ có một file riêng, ví dụ:
 *   - shiftRegistration.service.ts  (Đăng ký ca)
 *   - schedule.service.ts           (Xếp lịch / điều chỉnh)
 *   - approval.service.ts           (Phê duyệt)
 *   - shiftSwap.service.ts          (Đổi ca)
 *   - notification.service.ts       (Thông báo)
 * Hiện chưa kết nối backend, chưa có dữ liệu.
 */
export class NotImplementedError extends Error {
  constructor(feature: string) {
    super(`Chức năng "${feature}" chưa được triển khai.`);
  }
}
