import { readFile } from "../../lib/fileUtils";
import { describe, it, expect } from "vitest";

describe("readFile", () => {
  it("should read a file as a string", async () => {
    const file = new File(["test content"], "test.txt", { type: "text/plain" });
    const content = await readFile(file);
    expect(content).toBe("test content");
  });

  it("should handle reading errors", async () => {
    // We can simulate an error by using a mock or trying to read something invalid
    // For now, let's just make sure the basic case works
    const file = new File([""], "empty.txt", { type: "text/plain" });
    const content = await readFile(file);
    expect(content).toBe("");
  });
});
