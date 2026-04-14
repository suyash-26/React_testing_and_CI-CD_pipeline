import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import User from "./User";

describe("Testing User component", () => {
  it("shows loading then user data", async () => {
    render(<User />);

    // 1. loading should be there initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // 2. wait for user data
    const user = await screen.findByText("User: Suyash");

    expect(user).toBeInTheDocument();

    // 3. loading should be gone
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});
