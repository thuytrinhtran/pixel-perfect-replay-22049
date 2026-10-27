import { act, fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoginPage } from "@/pages/login/LoginPage";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("UI-only login", () => {
  it("never grants a session or navigates after submission", async () => {
    vi.useFakeTimers();
    const initialUrl = window.location.href;
    const storage = vi.spyOn(Storage.prototype, "setItem");
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Mật khẩu", { exact: true }), { target: { value: "not-a-real-password" } });
    fireEvent.submit(screen.getByLabelText("Email").closest("form") as HTMLFormElement);
    expect(screen.getByRole("button", { name: "Đang xử lý…" })).toBeDisabled();
    await act(async () => { await vi.advanceTimersByTimeAsync(600); });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(window.location.href).toBe(initialUrl);
    expect(storage).not.toHaveBeenCalled();
    storage.mockRestore();
  });
});