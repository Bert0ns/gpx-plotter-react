import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useChartConfig } from "../../../app/hooks/useChartConfig";

describe("useChartConfig", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => useChartConfig());
    expect(result.current.config.displayLegend).toBe(true);
    expect(result.current.config.dataLabels).toEqual([]);
  });

  it("handles adding and removing data labels", () => {
    const { result } = renderHook(() => useChartConfig());
    act(() => {
      result.current.actions.addDataLabel();
    });
    expect(result.current.config.dataLabels.length).toBe(1);

    const labelId = result.current.config.dataLabels[0].id;
    act(() => {
      result.current.actions.updateDataLabel({
        id: labelId,
        x: 10,
        label: "Test",
        fontSize: 12,
        fontColor: "#000",
      });
    });
    expect(result.current.config.dataLabels[0].label).toBe("Test");

    act(() => {
      result.current.actions.removeDataLabel(labelId);
    });
    expect(result.current.config.dataLabels.length).toBe(0);
  });

  it("handles other actions", () => {
    const { result } = renderHook(() => useChartConfig());
    act(() => {
      result.current.actions.setDisplayLegend(false);
      result.current.actions.setChartTitleText("New Title");
      result.current.actions.setChartBackgroundColor("#123456");
      result.current.actions.setChartSmoothVisual(false);
    });
    expect(result.current.config.displayLegend).toBe(false);
    expect(result.current.config.chartTitleText).toBe("New Title");
    expect(result.current.config.chartBackgroundColor).toBe("#123456");
    expect(result.current.config.chartSmoothVisual).toBe(false);
  });
});
