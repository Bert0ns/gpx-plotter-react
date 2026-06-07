import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VisibleDiv from "../../../../../app/components/atoms/VisibleDiv";

describe("VisibleDiv", () => {
  it("renders children when isVisible is true", () => {
    render(
      <VisibleDiv isVisible={true} data-testid="visible-div">
        Content
      </VisibleDiv>,
    );
    expect(screen.getByText("Content")).toBeDefined();
    expect(screen.getByTestId("visible-div")).toBeDefined();
  });

  it("does not render children when isVisible is false", () => {
    const { container } = render(
      <VisibleDiv isVisible={false}>Content</VisibleDiv>,
    );
    expect(container.firstChild).toBeNull();
  });
});
