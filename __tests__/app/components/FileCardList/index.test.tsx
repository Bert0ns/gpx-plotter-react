/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import FileCardList from "../../../../app/components/FileCardList";
import { GpxSummaryData } from "../../../../lib/types/gpx";

const { mockDnd } = vi.hoisted(() => ({
  mockDnd: { onDragEnd: null as any },
}));

vi.mock("@hello-pangea/dnd", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    DragDropContext: ({ onDragEnd, children }: any) => {
      mockDnd.onDragEnd = onDragEnd;
      return <div data-testid="dnd-context">{children}</div>;
    },
    Droppable: ({ children }: any) =>
      children({ droppableProps: {}, innerRef: vi.fn(), placeholder: null }),
    Draggable: ({ children }: any) =>
      children({ draggableProps: {}, dragHandleProps: {}, innerRef: vi.fn() }),
  };
});

describe("FileCardList", () => {
  it("renders without crashing and handles imperative handle", () => {
    const ref = React.createRef<any>();
    render(
      <FileCardList onOrderChange={vi.fn()} onCardRemove={vi.fn()} ref={ref} />,
    );

    expect(ref.current).toBeDefined();

    const mockData: GpxSummaryData = {
      key: 123,
      filename: "test.gpx",
      author: "Test",
      description: "",
      whatIsShown: "Track",
      totalDistance: 10,
      maxElevation: 100,
      minElevation: 10,
      diffAltitude: 90,
      posElevationDiff: 50,
      negElevationDiff: 40,
      fileGpxParsed: {} as any,
    };

    act(() => {
      ref.current.addFileCardData(mockData);
    });

    expect(screen.getByText("test.gpx")).toBeDefined();

    // Test remove
    const removeButton = screen.getByRole("button");
    fireEvent.click(removeButton);
  });

  it("handles drag end and removes card", () => {
    const mockOnOrderChange = vi.fn();
    const mockOnCardRemove = vi.fn();
    const ref = React.createRef<any>();

    const { unmount } = render(
      <FileCardList
        onOrderChange={mockOnOrderChange}
        onCardRemove={mockOnCardRemove}
        ref={ref}
      />,
    );

    const mockData1: GpxSummaryData = {
      key: 123,
      filename: "test1.gpx",
      author: "Test",
      description: "",
      whatIsShown: "Track",
      totalDistance: 10,
      maxElevation: 100,
      minElevation: 10,
      diffAltitude: 90,
      posElevationDiff: 50,
      negElevationDiff: 40,
      fileGpxParsed: {} as any,
    };

    const mockData2: GpxSummaryData = {
      ...mockData1,
      key: 456,
      filename: "test2.gpx",
    };

    act(() => {
      ref.current.addFileCardData(mockData1);
      ref.current.addFileCardData(mockData2);
    });

    // We can't easily capture the onDragEnd from the mock inside the same file unless hoisted.
    // Instead we'll trigger remove here.
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(mockOnCardRemove).toHaveBeenCalledWith(123);

    // Test mockDnd onDragEnd
    if (mockDnd.onDragEnd) {
      act(() => {
        mockDnd.onDragEnd({
          source: { index: 0 },
          destination: { index: 1 },
        } as any);
      });
      expect(mockOnOrderChange).toHaveBeenCalled();
    }

    // Call onDragEnd with invalid destination
    if (mockDnd.onDragEnd) {
      act(() => {
        mockDnd.onDragEnd({
          source: { index: 0 },
          destination: null,
        } as any);
      });
    }

    unmount();
  });
});
