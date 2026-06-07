import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DataLabel from "../../../../../app/components/atoms/DataLabel";
import { IDataLabel } from "../../../../../app/components/atoms/DataLabel/index.types";

describe("DataLabel", () => {
  const mockLabel: IDataLabel = {
    id: 1,
    x: 10,
    label: "Peak",
    fontSize: 12,
    fontColor: "#000000",
  };

  it("renders inputs with correct values", () => {
    render(
      <DataLabel label={mockLabel} onRemove={vi.fn()} onUpdate={vi.fn()} />,
    );
    expect(
      (screen.getByPlaceholderText("X coordinate") as HTMLInputElement).value,
    ).toBe("10");
    expect(
      (screen.getByPlaceholderText("Label text") as HTMLInputElement).value,
    ).toBe("Peak");
    expect(
      (screen.getByPlaceholderText("Font size") as HTMLInputElement).value,
    ).toBe("12");
    expect(
      (screen.getByPlaceholderText("Font color") as HTMLInputElement).value,
    ).toBe("#000000");
  });

  it("calls onUpdate when inputs change", () => {
    const onUpdateMock = vi.fn();
    render(
      <DataLabel
        label={mockLabel}
        onRemove={vi.fn()}
        onUpdate={onUpdateMock}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("X coordinate"), {
      target: { value: "20" },
    });
    expect(onUpdateMock).toHaveBeenCalledWith({ ...mockLabel, x: 20 });

    fireEvent.change(screen.getByPlaceholderText("Label text"), {
      target: { value: "Valley" },
    });
    expect(onUpdateMock).toHaveBeenCalledWith({
      ...mockLabel,
      label: "Valley",
    });

    fireEvent.change(screen.getByPlaceholderText("Font size"), {
      target: { value: "14" },
    });
    expect(onUpdateMock).toHaveBeenCalledWith({ ...mockLabel, fontSize: 14 });

    fireEvent.change(screen.getByPlaceholderText("Font color"), {
      target: { value: "#ffffff" },
    });
    expect(onUpdateMock).toHaveBeenCalledWith({
      ...mockLabel,
      fontColor: "#ffffff",
    });
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemoveMock = vi.fn();
    render(
      <DataLabel
        label={mockLabel}
        onRemove={onRemoveMock}
        onUpdate={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByText("Remove"));
    expect(onRemoveMock).toHaveBeenCalledWith(1);
  });
});
