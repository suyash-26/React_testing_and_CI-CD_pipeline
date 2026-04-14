import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Greeting from "./Greeting";


describe("Testing Greeting Component", ()=>{
    it("should render Greeting", ()=>{
        render(<Greeting/>)
        const text = screen.getByText(/Suyash/i);
        expect(text).toBeInTheDocument();
    })

    it("should render name it some name prop is passed", ()=>{
        render(<Greeting name={"Rahul"}/>);
        const text = screen.getByText(/Rahul/i);
        expect(text).toBeInTheDocument();
    })
})