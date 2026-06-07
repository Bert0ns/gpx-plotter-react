import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "../../../../app/components/ui/input";

describe("Input", () => {
  it("renders an input element with the given props", () => {
    render(<Input placeholder="Test input" data-testid="custom-input" />);
    const input = screen.getByTestId("custom-input");
    expect(input).toBeDefined();
    expect(input.getAttribute("placeholder")).toBe("Test input");
  });
});
