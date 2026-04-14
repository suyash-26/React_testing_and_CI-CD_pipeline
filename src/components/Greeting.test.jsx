import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Greeting from "./Greeting";

describe("Testing Greeting Component", () => {
    it("should render Greeting", () => {
        render(<Greeting />);
        const text = screen.getByText(/Suyash/i);
        expect(text).toBeInTheDocument();
    });

    it("should render name if some name prop is passed", () => {
        render(<Greeting name={"Rahul"} />);
        const text = screen.getByText(/Rahul/i);
        expect(text).toBeInTheDocument();
    });

    it("should update the rendered name when props change", () => {
        const { rerender } = render(<Greeting name="Rahul" />);
        expect(screen.getByText(/Rahul/i)).toBeInTheDocument();

        rerender(<Greeting name="Anil" />);
        expect(screen.getByText(/Anil/i)).toBeInTheDocument();
    });

    it("should not render an unrelated name", () => {
        render(<Greeting name="Rahul" />);
        const absent = screen.queryByText(/Anil/i);
        expect(absent).not.toBeInTheDocument();
    });
});