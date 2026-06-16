import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: "Click me" })
    expect(button).toBeInTheDocument()
    expect(button.className).toContain("bg-primary")
    expect(button.className).toContain("h-9")
  })

  it("renders with destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole("button", { name: "Delete" })
    expect(button.className).toContain("bg-destructive")
  })

  it("renders with outline variant", () => {
    render(<Button variant="outline">Outlined</Button>)
    const button = screen.getByRole("button", { name: "Outlined" })
    expect(button.className).toContain("border")
  })

  it("renders with secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole("button", { name: "Secondary" })
    expect(button.className).toContain("bg-secondary")
  })

  it("renders with ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByRole("button", { name: "Ghost" })
    expect(button.className).toContain("hover:bg-accent")
  })

  it("renders with link variant", () => {
    render(<Button variant="link">Link</Button>)
    const button = screen.getByRole("button", { name: "Link" })
    expect(button.className).toContain("underline-offset-4")
  })

  it("renders with sm size", () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole("button", { name: "Small" })
    expect(button.className).toContain("h-8")
  })

  it("renders with lg size", () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByRole("button", { name: "Large" })
    expect(button.className).toContain("h-10")
  })

  it("renders with icon size", () => {
    render(<Button size="icon">I</Button>)
    const button = screen.getByRole("button", { name: "I" })
    expect(button.className).toContain("w-9")
  })

  it("handles click events", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole("button", { name: "Click" }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("supports disabled state", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled()
  })

  it("renders as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = screen.getByRole("link", { name: "Link Button" })
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe("A")
  })

  it("merges custom className", () => {
    render(<Button className="custom-btn">Custom</Button>)
    const button = screen.getByRole("button", { name: "Custom" })
    expect(button.className).toContain("custom-btn")
  })
})
