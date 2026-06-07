import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "../../../../app/components/Header";

describe("Header", () => {
  it("renders header links and title", () => {
    render(<Header />);
    expect(screen.getByText("GPX Plotter")).toBeDefined();
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Plot")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
  });
});
