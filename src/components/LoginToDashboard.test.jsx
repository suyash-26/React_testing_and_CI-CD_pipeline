import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import ReducerLogin from "./ReducerLogin";

describe("testing dashboard after login success", () => {
  it("should render welcome name after successfull login", async () => {
    server.use(
      http.post("/api/login", () => {
        return new HttpResponse(null, { status: 200 });
      }),
    );

    render(
      <AuthProvider>
        <ReducerLogin />
        <Dashboard />
      </AuthProvider>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), "sj@gmail.com");
    await userEvent.type(screen.getByLabelText(/password/i), "2332");

    await userEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText(/welcome suyash/i)).toBeInTheDocument();
  });
});
