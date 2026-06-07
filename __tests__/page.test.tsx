import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import LandingPage from "@/app/page";

test("LandingPage renders correctly", () => {
  render(<LandingPage />);

  expect(
    screen.getByRole("heading", {
      name: /^Visualize Your Adventures with GPX Plotter$/i,
    }),
  ).toBeDefined();

  // Verify 'Get Started' button or link exists
  expect(screen.getByRole("link", { name: /Get Started/i })).toBeDefined();
});
