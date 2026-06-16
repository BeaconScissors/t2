import { cn } from "@/lib/utils"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1")
  })

  it("handles conditional classes", () => {
    expect(cn("px-2", false && "py-1")).toBe("px-2")
    expect(cn("px-2", true && "py-1")).toBe("px-2 py-1")
  })

  it("deduplicates tailwind classes (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })

  it("handles undefined and null inputs", () => {
    expect(cn("px-2", undefined, null)).toBe("px-2")
  })

  it("handles empty input", () => {
    expect(cn()).toBe("")
  })

  it("merges conflicting tailwind utilities", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500")
  })

  it("handles array inputs", () => {
    expect(cn(["px-2", "py-1"])).toBe("px-2 py-1")
  })
})
