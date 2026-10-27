import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarRange,
  ClipboardList,
  Database,
  Send,
  Sparkles,
  UsersRound,
  Wand2,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/** Chưa kết nối Database/AI — toàn bộ dữ liệu đầu vào để trống, không dùng dữ liệu giả. */
const BACKEND_READY = false;
const AI_READY = false;

const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const SHIFTS = ["Ca sáng", "Ca chiều", "Ca tối"];
const DEPARTMENTS = ["Bếp", "Quầy", "Giao hàng"];

const STEPS = [
  { n: 1, title: "Dữ liệu đầu vào", icon: ClipboardList },
  { n: 2, title: "Nhu cầu nhân sự", icon: UsersRound },
  { n: 3, title: "Lịch đề xuất", icon: CalendarRange },
  { n: 4, title: "Điều chỉnh & xác nhận", icon: CheckCircle2 },
];

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
      <Database className="h-8 w-8 text-muted-foreground" />
      <p className="text-sm font-medium">Chưa có dữ liệu</p>
      <p className="max-w-sm text-xs text-muted-foreground">{message}</p>
    </div>
  );
}

export default function ShiftSchedulingPage() {
  const [step, setStep] = useState(1);
  const [week, setWeek] = useState("");
  // Nhu cầu nhân sự: ngày × ca × bộ phận
  const [needs, setNeeds] = useState<Record<string, string>>({});
  const [savedNeeds, setSavedNeeds] = useState(false);
  const [adjustMode, setAdjustMode] = useState<"manual" | "ai">("manual");
  const [aiPrompt, setAiPrompt] = useState("");

  const totalNeeded = useMemo(
    () => Object.values(needs).reduce((sum, v) => sum + (parseInt(v, 10) || 0), 0),
    [needs],
  );

  const key = (d: number, s: number, dep: string) => `${d}-${s}-${dep}`;

  return (
    <div>
      <PageHeader
        title="Xếp lịch làm việc"
        description="Quy trình 4 bước: dữ liệu đầu vào → nhu cầu nhân sự → lịch đề xuất → điều chỉnh & xác nhận."
        icon={CalendarRange}
      />

      {/* Thanh bước */}
      <ol className="mb-6 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <li key={s.n}>
            <button
              onClick={() => setStep(s.n)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                step === s.n
                  ? "border-primary bg-accent shadow-sm"
                  : "border-border bg-card hover:bg-muted",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                  step === s.n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {s.n}
              </span>
              <span className="text-sm font-semibold leading-tight">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* BƯỚC 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chọn tuần cần xếp lịch</CardTitle>
              <CardDescription>Dữ liệu đầu vào sẽ được tải theo tuần đã chọn.</CardDescription>
            </CardHeader>
            <CardContent className="max-w-xs">
              <Label htmlFor="week">Tuần làm việc</Label>
              <Input id="week" type="week" value={week} onChange={(e) => setWeek(e.target.value)} className="mt-1.5" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dự báo doanh số (Sales Forecast)</CardTitle>
              <CardDescription>Doanh số dự kiến theo từng ngày trong tuần.</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState message="Chưa kết nối Database nên chưa thể tải dữ báo doanh số. Dữ liệu sẽ hiển thị tại đây sau khi kết nối." />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Đăng ký nguyện vọng ca của nhân viên</CardTitle>
              <CardDescription>Tổng hợp nguyện vọng ca làm trong tuần đã chọn.</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState message="Chưa kết nối Database nên chưa thể tải đăng ký nguyện vọng của nhân viên." />
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button onClick={() => setStep(2)}>Tiếp tục: Nhập nhu cầu nhân sự</Button>
          </div>
        </div>
      )}

      {/* BƯỚC 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nhu cầu nhân sự theo ngày, ca và bộ phận</CardTitle>
              <CardDescription>Nhập số lượng nhân viên cần thiết cho từng ô.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-28">Ngày</TableHead>
                    <TableHead className="w-24">Ca</TableHead>
                    {DEPARTMENTS.map((dep) => (
                      <TableHead key={dep} className="text-center">{dep}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DAYS.map((day, d) =>
                    SHIFTS.map((shift, s) => (
                      <TableRow key={`${d}-${s}`}>
                        {s === 0 && (
                          <TableCell rowSpan={SHIFTS.length} className="align-middle font-semibold">
                            {day}
                          </TableCell>
                        )}
                        <TableCell className="text-muted-foreground">{shift}</TableCell>
                        {DEPARTMENTS.map((dep) => (
                          <TableCell key={dep}>
                            <Input
                              type="number"
                              min={0}
                              inputMode="numeric"
                              placeholder="0"
                              className="mx-auto w-20 text-center"
                              value={needs[key(d, s, dep)] ?? ""}
                              onChange={(e) => {
                                setSavedNeeds(false);
                                setNeeds((prev) => ({ ...prev, [key(d, s, dep)]: e.target.value }));
                              }}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Tổng nhân sự cần thiết trong tuần: </span>
                <span className="text-lg font-bold text-primary">{totalNeeded}</span>
                <span className="text-muted-foreground"> lượt người/ca</span>
              </div>
              <div className="flex items-center gap-2">
                {savedNeeds && <Badge variant="secondary">Đã lưu nháp trên giao diện</Badge>}
                <Button onClick={() => setSavedNeeds(true)}>Lưu nhu cầu nhân sự</Button>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>Quay lại</Button>
            <Button onClick={() => setStep(3)}>Tiếp tục: Xem lịch đề xuất</Button>
          </div>
        </div>
      )}

      {/* BƯỚC 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lịch làm việc đề xuất theo tuần</CardTitle>
              <CardDescription>Nhân viên được phân công vào từng ca sẽ hiển thị tại đây.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button disabled={!BACKEND_READY}>
                  <Wand2 className="mr-2 h-4 w-4" /> Đề xuất lịch làm việc
                </Button>
                {!BACKEND_READY && (
                  <p className="text-xs text-muted-foreground">
                    Chưa kết nối Backend — chức năng tạo lịch tự động chưa khả dụng, hệ thống không giả lập kết quả xếp lịch.
                  </p>
                )}
              </div>
              <EmptyState message="Chưa có lịch đề xuất. Bảng lịch tuần với nhân viên theo từng ca sẽ xuất hiện sau khi Backend tạo lịch." />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" /> Cảnh báo thiếu nhân sự & xung đột ca
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState message="Chưa có dữ liệu lịch nên chưa thể kiểm tra thiếu nhân sự hoặc xung đột ca." />
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>Quay lại</Button>
            <Button onClick={() => setStep(4)}>Tiếp tục: Điều chỉnh & xác nhận</Button>
          </div>
        </div>
      )}

      {/* BƯỚC 4 */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={adjustMode === "manual" ? "default" : "outline"}
              onClick={() => setAdjustMode("manual")}
            >
              Điều chỉnh thủ công
            </Button>
            <Button
              variant={adjustMode === "ai" ? "default" : "outline"}
              onClick={() => setAdjustMode("ai")}
            >
              <Sparkles className="mr-2 h-4 w-4" /> Điều chỉnh bằng AI
            </Button>
          </div>

          {adjustMode === "manual" ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Điều chỉnh thủ công</CardTitle>
                <CardDescription>Chọn một ca để thêm, thay thế hoặc loại nhân viên khỏi ca.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <EmptyState message="Chưa có lịch đề xuất hợp lệ nên chưa thể chọn ca để điều chỉnh." />
                <div>
                  <p className="mb-2 text-sm font-semibold">Kiểm tra ràng buộc</p>
                  <EmptyState message="Các ràng buộc (giờ tối đa, kỹ năng, xung đột ca) sẽ được kiểm tra tại đây khi có dữ liệu." />
                </div>
                <Button disabled={!BACKEND_READY}>Lưu thay đổi</Button>
                {!BACKEND_READY && (
                  <p className="text-xs text-muted-foreground">Chưa kết nối Backend — chưa cho phép lưu thay đổi vào Database.</p>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Điều chỉnh bằng AI</CardTitle>
                <CardDescription>Mô tả yêu cầu điều chỉnh bằng ngôn ngữ tự nhiên.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ai-prompt">Yêu cầu điều chỉnh</Label>
                  <Textarea
                    id="ai-prompt"
                    className="mt-1.5"
                    placeholder='Ví dụ: "Ưu tiên xếp ca sáng cho nhân viên có kinh nghiệm bếp, tránh xếp 2 ca liên tiếp..."'
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button disabled={!AI_READY}>
                    <Sparkles className="mr-2 h-4 w-4" /> Đề xuất điều chỉnh bằng AI
                  </Button>
                  {!AI_READY && <Badge variant="secondary">Chưa kết nối AI</Badge>}
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold">Phương án AI đề xuất</p>
                  <EmptyState message="Chưa kết nối AI. Phương án đề xuất sẽ hiển thị tại đây và chỉ được áp dụng khi bạn bấm nút bên dưới." />
                </div>
                <Button variant="outline" disabled>
                  Áp dụng vào bản nháp
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Xác nhận lịch</CardTitle>
              <CardDescription>
                Lịch chỉ được gửi đến Giám sát khu vực sau khi Quản lý ca xác nhận.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button disabled={!BACKEND_READY}>Xác nhận lịch dự kiến</Button>
              <Button variant="secondary" disabled={!BACKEND_READY}>
                <Send className="mr-2 h-4 w-4" /> Gửi phê duyệt
              </Button>
              {!BACKEND_READY && (
                <p className="text-xs text-muted-foreground">
                  Hai nút này sẽ được kích hoạt khi Backend và các điều kiện nghiệp vụ tương ứng đã được triển khai.
                </p>
              )}
            </CardContent>
          </Card>
          <div className="flex justify-start">
            <Button variant="outline" onClick={() => setStep(3)}>Quay lại</Button>
          </div>
        </div>
      )}
    </div>
  );
}
