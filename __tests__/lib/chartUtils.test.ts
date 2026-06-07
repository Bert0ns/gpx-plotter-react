import { generateUniqueKey } from "../../lib/chartUtils";
import { describe, it, expect } from "vitest";

describe("generateUniqueKey", () => {
  it("should return a number", () => {
    const key = generateUniqueKey();
    expect(typeof key).toBe("number");
  });

  it("should return unique keys", () => {
    const key1 = generateUniqueKey();
    const key2 = generateUniqueKey();
    expect(key1).not.toBe(key2);
  });
});
