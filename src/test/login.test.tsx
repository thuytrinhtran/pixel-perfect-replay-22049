import { fireEvent, render, screen, cleanup, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoginPage } from "@/components/features/login/LoginPage";
import { signIn } from "@/services/auth";
const navigate = vi.fn();
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => navigate }));
vi.mock("@/services/auth", () => ({ signIn: vi.fn() }));

afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe("Real login", () => {
  it("does not navigate when credentials are rejected", async () => {
    vi.mocked(signIn).mockRejectedValue(new Error("Email hoặc mật khẩu không đúng."));
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Mật khẩu", { exact: true }), { target: { value: "not-a-real-password" } });
    fireEvent.submit(screen.getByLabelText("Email").closest("form") as HTMLFormElement);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(signIn).toHaveBeenCalledWith("test@example.com", "not-a-real-password");
    expect(navigate).not.toHaveBeenCalled();
  });
});