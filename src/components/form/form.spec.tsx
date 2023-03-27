import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Form } from "./form";

describe("Form component", () => {
    const addProduct = jest.fn();

    beforeEach(() => {
        addProduct.mockClear();
    });

    it("should render form elements properly", () => {
        const { getByPlaceholderText, getByText } = render(<Form onAddProduct={addProduct} />);
        expect(getByPlaceholderText("Title...")).toBeInTheDocument();
        expect(getByPlaceholderText("Price...")).toBeInTheDocument();
        expect(getByPlaceholderText("Start typing product description here...")).toBeInTheDocument();
        expect(getByText("Add a product")).toBeInTheDocument();
    });

    it("should add a new product when form is submitted with valid data", () => {
        const { getByPlaceholderText, getByText } = render(<Form onAddProduct={addProduct} />);
        fireEvent.change(getByPlaceholderText("Title..."), { target: { value: "Test Product" } });
        fireEvent.change(getByPlaceholderText("Price..."), { target: { value: "20" } });
        fireEvent.change(getByPlaceholderText("Start typing product description here..."), { target: { value: "Test description" } });
        fireEvent.submit(getByText("Add a product"));
        expect(addProduct).toHaveBeenCalledTimes(1);
        expect(addProduct).toHaveBeenCalledWith({
            title: "Test Product",
            price: 20,
            description: "Test description",
        });
    });

    it("should not add a new product when form is submitted with invalid data", () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        const { getByText } = render(<Form onAddProduct={addProduct} />);
        fireEvent.submit(getByText("Add a product"));
        expect(addProduct).not.toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith("Your product needs a title");
    });
});