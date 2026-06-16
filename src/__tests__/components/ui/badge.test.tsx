import React from "react"
import { render, screen } from "@testing-library/react"
import { Badge } from "@/components/ui/badge"

describe("Badge", () => {
  it("renders with default variant", () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText("Default")
    expect(badge).toBeInTheDocument()
    expect(badge.className).toContain("bg-primary")
  })

  it("renders with secondary variant", () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    const badge = screen.getByText("Secondary")
    expect(badge.className).toContain("bg-secondary")
  })

  it("renders with destructive variant", () => {
    render(<Badge variant="destructive">Destructive</Badge>)
    const badge = screen.getByText("Destructive")
    expect(badge.className).toContain("bg-destructive")
  })

  it("renders with outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>)
    const badge = screen.getByText("Outline")
    expect(badge.className).toContain("text-foreground")
  })

  it("merges custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText("Custom")
    expect(badge.className).toContain("custom-class")
  })

  it("passes through additional props", () => {
    render(<Badge data-testid="badge-test">Props</Badge>)
    expect(screen.getByTestId("badge-test")).toBeInTheDocument()
  })
})
