import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FileSelector from "../../../../../app/components/atoms/FileSelector";

describe("FileSelector", () => {
  it("renders button and handles file selection", () => {
    const onFileSelectMock = vi.fn();
    render(
      <FileSelector
        onFileSelect={onFileSelectMock}
        value="Select File"
        title="Upload"
      />,
    );

    // Check button
    const button = screen.getByTitle("Upload");
    expect(button).toBeDefined();

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(fileInput).not.toBeNull();

    // Simulate file upload
    const file = new File(["test content"], "test.gpx", { type: "text/plain" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(onFileSelectMock).toHaveBeenCalled();
  });
});
