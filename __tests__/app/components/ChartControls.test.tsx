import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChartControls from "../../../app/components/ChartControls";

describe("ChartControls", () => {
  const mockConfig = {
    displayLegend: true,
    chartLineColor: "#ff0000",
    chartLineBorderWidth: 2,
    chartTitleFontSize: 16,
    colorChartTitle: "#00ff00",
    chartTitleText: "Test Title",
    chartBackgroundColor: "#ffffff",
    chartAxisVisual: true,
    chartPointsVisual: false,
    chartSmoothVisual: true,
    dataLabels: [],
  };

  const mockActions = {
    setDisplayLegend: vi.fn(),
    setChartLineColor: vi.fn(),
    setChartLineBorderWidth: vi.fn(),
    setChartTitleFontSize: vi.fn(),
    setColorChartTitle: vi.fn(),
    setChartTitleText: vi.fn(),
    setChartBackgroundColor: vi.fn(),
    setChartAxisVisual: vi.fn(),
    setChartPointsVisual: vi.fn(),
    setChartSmoothVisual: vi.fn(),
    addDataLabel: vi.fn(),
    removeDataLabel: vi.fn(),
    updateDataLabel: vi.fn(),
  };

  it("renders correctly and handles interactions", () => {
    render(<ChartControls config={mockConfig} actions={mockActions} />);

    // Test add data label button
    const addLabelBtn = screen.getByText("Add Data Label");
    fireEvent.click(addLabelBtn);
    expect(mockActions.addDataLabel).toHaveBeenCalled();

    // Test title text input
    const titleInput = screen.getByTitle("Change the chart title");
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    expect(mockActions.setChartTitleText).toHaveBeenCalledWith("New Title");

    // Test Checkbox toggle
    const legendCheckboxButton = screen.getByTitle(
      "Show or hide the chart legend",
    );
    fireEvent.click(legendCheckboxButton);
    expect(mockActions.setDisplayLegend).toHaveBeenCalledWith(false);

    const axisCheckboxButton = screen.getByTitle("Show or hide the chart axis");
    fireEvent.click(axisCheckboxButton);
    expect(mockActions.setChartAxisVisual).toHaveBeenCalledWith(false);

    const pointsCheckboxButton = screen.getByTitle(
      "Show or hide the points on the chart",
    );
    fireEvent.click(pointsCheckboxButton);
    expect(mockActions.setChartPointsVisual).toHaveBeenCalledWith(true);

    const smoothCheckboxButton = screen.getByTitle(
      "Make the line chart smoother",
    );
    fireEvent.click(smoothCheckboxButton);
    expect(mockActions.setChartSmoothVisual).toHaveBeenCalledWith(false);

    // Test Color and Number Inputs
    const lineColorInput = screen.getByTitle(
      "Change the color of the line on the chart",
    );
    fireEvent.change(lineColorInput, { target: { value: "#111111" } });
    expect(mockActions.setChartLineColor).toHaveBeenCalledWith("#111111");

    const lineWidthInput = screen.getByTitle(
      "Change the width of the line on the chart",
    );
    fireEvent.change(lineWidthInput, { target: { value: "5" } });
    expect(mockActions.setChartLineBorderWidth).toHaveBeenCalledWith(5);

    const bgColorInput = screen.getByTitle("Change the chart background color");
    fireEvent.change(bgColorInput, { target: { value: "#222222" } });
    expect(mockActions.setChartBackgroundColor).toHaveBeenCalledWith("#222222");

    const titleColorInput = screen.getByTitle("Change chart title color");
    fireEvent.change(titleColorInput, { target: { value: "#333333" } });
    expect(mockActions.setColorChartTitle).toHaveBeenCalledWith("#333333");

    const titleSizeInput = screen.getByTitle("Change chart title font size");
    fireEvent.change(titleSizeInput, { target: { value: "24" } });
    expect(mockActions.setChartTitleFontSize).toHaveBeenCalledWith(24);
  });
});
