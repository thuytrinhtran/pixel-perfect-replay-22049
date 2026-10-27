import { Construction } from "lucide-react";

export function ComingSoon({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Construction className="h-7 w-7" />
      </div>
      <span className="mb-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
        Đang phát triển
      </span>
      <h3 className="text-lg font-semibold">{title} chưa được triển khai</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {note ?? "Chức năng này sẽ được xây dựng ở giai đoạn tiếp theo của dự án."}
      </p>
    </div>
  );
}
