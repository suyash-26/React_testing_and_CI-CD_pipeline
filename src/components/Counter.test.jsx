import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import Counter from "./Counter";
import userEvent from "@testing-library/user-event";


describe("Testing counter component", ()=>{

    // This can be done to run before all test cases instead of running render(<Counter/>) in each test cases
    // beforeEach(() => {
    //     render(<Counter />);
    // });

    it("initial count is 0 ",async ()=>{
        render(<Counter/>)
        const p = screen.getByText("Count: 0");
        expect(p).toBeInTheDocument();

    })
    it("testing increment button ",async ()=>{
        render(<Counter/>)
        const button = screen.getByRole("button",{name:/increment/i});
        expect(button).toBeInTheDocument();
        
        await userEvent.click(button);
        const p = screen.getByText("Count: 1");
        expect(p).toBeInTheDocument();

    })
     it("testing multiple increment button clicks ",async ()=>{
        render(<Counter/>)
        const button = screen.getByRole("button",{name:/increment/i});
        expect(button).toBeInTheDocument();
        
        await userEvent.click(button);
        await userEvent.click(button);
        await userEvent.click(button);
        const p = screen.getByText("Count: 3");
        expect(p).toBeInTheDocument();

    })

    it("testing decrement button ",async ()=>{
        render(<Counter/>)
        const button = screen.getByRole("button",{name:/decrement/i});
        expect(button).toBeInTheDocument();
        
        await userEvent.click(button);
        const p = screen.getByText("Count: -1");
        expect(p).toBeInTheDocument();

    })

     it("testing rapid interactions with buttons ",async ()=>{
        render(<Counter/>)
        const incButton = screen.getByRole("button",{name:/increment/i});
        const decButton = screen.getByRole("button",{name:/decrement/i});
        
        await userEvent.click(incButton);
         await userEvent.click(incButton);
          await userEvent.click(incButton);
           await userEvent.click(decButton);
        const p = screen.getByText("Count: 2");
        expect(p).toBeInTheDocument();

    })
})