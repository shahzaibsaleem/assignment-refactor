import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button component", () => {
    it("should render children properly", () => {
        const { getByText } = render(<Button>Click me</Button>);
        expect(getByText("Click me")).toBeInTheDocument();
    });

    it("should handle onClick event", () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(getByText("Click me"));
        expect(handleClick).toHaveBeenCalled();
    });

    it("should have a default style defined in the CSS module", () => {
        const { container } = render(<Button>Click me</Button>);
        expect(container.firstChild).toHaveClass("button");
    });
});