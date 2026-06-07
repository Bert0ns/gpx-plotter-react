/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FileCard from "../../../../../app/components/atoms/FileCard";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { GpxSummaryData } from "../../../../../lib/types/gpx";

describe("FileCard", () => {
  const mockData: GpxSummaryData = {
    key: 123,
    filename: "test.gpx",
    author: "Test Author",
    description: "Test Description",
    whatIsShown: "Track",
    totalDistance: 10,
    maxElevation: 100,
    minElevation: 10,
    diffAltitude: 90,
    posElevationDiff: 50,
    negElevationDiff: 40,
    fileGpxParsed: {} as any,
  };

  it("renders the file card with correct data and handles remove", () => {
    const onRemoveMock = vi.fn();
    render(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="test-droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <FileCard
                value={mockData}
                index={0}
                onClickRemove={onRemoveMock}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    );

    expect(screen.getByText("test.gpx")).toBeDefined();
    expect(screen.getByText("Track")).toBeDefined();

    // Check remove button
    const removeButton = screen.getByText("Remove");
    expect(removeButton).toBeDefined();

    fireEvent.click(removeButton);
    expect(onRemoveMock).toHaveBeenCalledWith(mockData);
  });
});
