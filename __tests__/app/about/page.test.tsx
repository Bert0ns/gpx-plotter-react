import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutPage from "../../../app/about/page";

describe("AboutPage", () => {
  it("renders the about page content", () => {
    render(<AboutPage />);
    expect(screen.getByText("About GPX Plotter")).toBeDefined();
    expect(screen.getByText("Our Mission")).toBeDefined();
    expect(screen.getByText("What We Do")).toBeDefined();
    expect(screen.getByText("Our Team")).toBeDefined();
    expect(screen.getByText("Open Source")).toBeDefined();
  });
});
