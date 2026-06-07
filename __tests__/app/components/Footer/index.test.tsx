import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../../../../app/components/Footer";

describe("Footer", () => {
  it("renders footer content", () => {
    render(<Footer />);
    expect(screen.getByText("GPX Plotter App")).toBeDefined();
    expect(screen.getByText("Quick Links")).toBeDefined();
    expect(screen.getByText("Connect With Us")).toBeDefined();
  });
});
