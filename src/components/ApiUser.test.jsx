import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import ApiUser from "./ApiUser";

describe("Testing mock service worker", () => {
  it("shows user after successful API call", async () => {
    render(<ApiUser />);

    // loading first
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // wait for API response
    const user = await screen.findByText("User: Suyash");

    expect(user).toBeInTheDocument();

    // loading gone
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
  it("shows error when API fails", async () => {
    server.use(
      http.get("/api/user", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(<ApiUser />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    const error = await screen.findByText("Failed to load");

    expect(error).toBeInTheDocument();
  });
});
