import { useState, type FormEvent } from "react";
import { AlertCircle, Eye, EyeOff, LoaderCircle, LockKeyhole, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/jollishift-logo.jpg.asset.json";
import background from "@/assets/login-background.png.asset.json";
import { useNavigate } from "@tanstack/react-router";
import { signIn } from "@/services/auth";
import { UNASSIGNED_MESSAGE } from "@/services/auth-policy";

export function LoginPage({ unassigned = false }: { unassigned?: boolean }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(unassigned ? UNASSIGNED_MESSAGE : "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (processing) return;
    setError("");
    const form = new FormData(event.currentTarget);
    setProcessing(true);
    try {
      const profile = await signIn(String(form.get("email") ?? ""), String(form.get("password") ?? ""));
      await navigate({ to: "/$role", params: { role: profile.role }, replace: true });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Không thể đăng nhập. Vui lòng thử lại.");
    } finally { setProcessing(false); }
  }

  return (
    <main className="login-scene">
      <img className="login-background" src={background.url} alt="" />
      <div className="login-overlay" />
      <section className="login-panel" aria-labelledby="login-title">
        <div className="flex flex-col items-center text-center">
          <img src={logo.url} alt="Logo JolliShift" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
          <h1 id="login-title" className="mt-3 text-3xl font-extrabold text-primary">JolliShift</h1>
          <p className="mt-2 text-sm text-muted-foreground">Hệ thống quản lý lịch làm việc</p>
        </div>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input id="email" name="email" type="email" autoComplete="username" placeholder="Email của bạn" required disabled={processing} className="h-11 pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold">Mật khẩu</label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input id="password" name="password" type={visible ? "text" : "password"} autoComplete="current-password" placeholder="Mật khẩu của bạn" required disabled={processing} className="h-11 pl-10 pr-12" />
              <Button type="button" size="icon" variant="ghost" disabled={processing} className="absolute right-1 top-1" onClick={() => setVisible((value) => !value)} aria-label={visible ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"} title={visible ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}>
                {visible ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>
          <div className="min-h-12" aria-live="polite">
            {error && <p role="alert" className="flex gap-2 text-sm text-destructive"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</p>}
          </div>
          <Button type="submit" className="h-11 w-full" disabled={processing} aria-busy={processing}>
            {processing ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : <LogIn />}
            {processing ? "Đang xử lý…" : "Đăng nhập"}
          </Button>
        </form>
        <p className="mt-7 border-t border-border pt-5 text-center text-[11px] leading-relaxed text-muted-foreground">Nguyên mẫu học thuật — không phải hệ thống chính thức của Jollibee.</p>
      </section>
    </main>
  );
}