import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CheckBox from "../../../../../app/components/atoms/CheckBox";

describe("CheckBox", () => {
  it("renders with a label and handles toggle", () => {
    const onChangeMock = vi.fn();
    render(<CheckBox label="Test CheckBox" onChange={onChangeMock} />);

    // Get the button element using the label
    const button = screen.getByRole("button", { name: /Test CheckBox/i });
    expect(button).toBeDefined();

    // Toggle
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalledWith(true);

    // Toggle again
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalledWith(false);
  });

  it("renders as checked initially if checked prop is true", () => {
    render(<CheckBox label="Checked Box" checked={true} />);
    const checkbox = screen.getByRole("checkbox", { hidden: true });
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });
});
