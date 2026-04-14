import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Login from "./Login";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import { delay, http, HttpResponse } from "msw";

describe("testing login form", () => {
  it("should show email and paswword input on first render", () => {
    render(<Login />);
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("typing in login inputs", async () => {
    render(<Login />);
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    await userEvent.type(email, "test@gmail.com");
    await userEvent.type(password, "123456");

    expect(email).toHaveValue("test@gmail.com");
    expect(password).toHaveValue("123456");
  });

  it("logs in successfully", async () => {
    server.use(
      http.post("/api/login", () => {
        return new HttpResponse(null, { status: 200 });
      }),
    );

    render(<Login />);

    await userEvent.type(screen.getByLabelText("Email"), "test@gmail.com");
    await userEvent.type(screen.getByLabelText("Password"), "123456");

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    const success = await screen.findByText("Welcome");

    expect(success).toBeInTheDocument();
  });

  it("should error text on login failure", async () => {
    server.use(
      http.post("/api/login", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(<Login />);

    await userEvent.type(screen.getByLabelText("Email"), "wrong@gmail.com");
    await userEvent.type(screen.getByLabelText("Password"), "wrong");

    const button = screen.getByRole("button", { name: /login/i });
    await userEvent.click(button);
    await screen.findByText("Invalid credentials");
  });

  it("should show loading while submitting", async () => {
    server.use(
      http.post("/api/login", async () => {
        await delay(2000);
        return new HttpResponse(null, { status: 200 });
      }),
    );

    render(<Login />);

    await userEvent.type(screen.getByLabelText(/email/i), "sj@gmail.com");
    await userEvent.type(screen.getByLabelText(/password/i), "123");

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error if required fields are missing", async () => {
    render(<Login />);

    await userEvent.type(screen.getByLabelText(/email/i), "sj@gmail.com");

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/all fields required/i)).toBeInTheDocument();
  });
});
