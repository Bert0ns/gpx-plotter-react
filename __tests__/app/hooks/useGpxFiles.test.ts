/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useGpxFiles } from "../../../app/hooks/useGpxFiles";
import React from "react";

describe("useGpxFiles", () => {
  it("initializes with default values", () => {
    const ref = React.createRef<any>();
    const { result } = renderHook(() => useGpxFiles(ref));
    expect(result.current.isChartVisible).toBe(false);
    expect(result.current.isButtonPlotElevationVisible).toBe(false);
  });

  it("handles removeFileGpxParsed", () => {
    const ref = React.createRef<any>();
    const { result } = renderHook(() => useGpxFiles(ref));
    act(() => {
      result.current.removeFileGpxParsed(123);
    });
    expect(result.current.isChartVisible).toBe(false);
  });

  it("handles button plot elevation click without files", () => {
    const ref = React.createRef<any>();
    const { result } = renderHook(() => useGpxFiles(ref));
    act(() => {
      result.current.handleButtonPlotElevationClick();
    });
    expect(result.current.isChartVisible).toBe(false);
  });

  it("handles handleSelectedFiles properly", async () => {
    const mockFileCardListRef = {
      current: { addFileCardData: vi.fn() },
    } as any;
    const { result } = renderHook(() => useGpxFiles(mockFileCardListRef));

    // Valid mock GPX File
    const validGPX = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Test">
  <trk>
    <name>Test Track</name>
    <trkseg>
      <trkpt lat="40.0" lon="-105.0"><ele>1000</ele></trkpt>
      <trkpt lat="40.1" lon="-105.1"><ele>1100</ele></trkpt>
    </trkseg>
  </trk>
</gpx>`;

    // Mock readFile directly
    const fileUtils = await import("../../../lib/fileUtils");
    vi.spyOn(fileUtils, "readFile").mockResolvedValue(validGPX);

    const file = new File(["dummy"], "test.gpx", { type: "text/plain" });

    // Mock FileList behavior
    const fileListMock = {
      0: file,
      length: 1,
      item: (index: number) => file,
    } as any;

    await act(async () => {
      await result.current.handleSelectedFiles(fileListMock);
    });

    // Should now have 1 track and button visible
    expect(result.current.filesGpxParsed.length).toBe(1);
    expect(result.current.isButtonPlotElevationVisible).toBe(true);

    // Call handleButtonPlotElevationClick
    act(() => {
      result.current.handleButtonPlotElevationClick();
    });
    expect(result.current.isChartVisible).toBe(true);

    // Call handleOrderChange
    act(() => {
      result.current.handleOrderChange([
        ...result.current.filesGpxParsed,
      ] as any);
    });
    // Shouldn't crash and order remains same
    expect(result.current.filesGpxParsed.length).toBe(1);
  });
});
