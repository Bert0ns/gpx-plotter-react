import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import LineChart from "../../../../../app/components/atoms/LineChart";

vi.mock("react-chartjs-2", () => ({
  Line: () => <div data-testid="mock-line-chart" />,
}));

describe("LineChart", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(
      <LineChart
        chartXDataLabels={[1, 2, 3]}
        chartYData={[10, 20, 30]}
        chartTitle="Test Chart"
      />,
    );
    expect(getByTestId("mock-line-chart")).toBeDefined();
  });
});
