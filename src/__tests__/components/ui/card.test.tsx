import React from "react"
import { render, screen } from "@testing-library/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

describe("Card", () => {
  it("renders Card with children", () => {
    render(<Card data-testid="card">Card content</Card>)
    const card = screen.getByTestId("card")
    expect(card).toBeInTheDocument()
    expect(card.className).toContain("rounded-xl")
    expect(card.className).toContain("border")
  })

  it("renders CardHeader", () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    const header = screen.getByTestId("header")
    expect(header).toBeInTheDocument()
    expect(header.className).toContain("p-6")
  })

  it("renders CardTitle", () => {
    render(<CardTitle data-testid="title">Title</CardTitle>)
    const title = screen.getByTestId("title")
    expect(title).toBeInTheDocument()
    expect(title.className).toContain("font-semibold")
  })

  it("renders CardDescription", () => {
    render(
      <CardDescription data-testid="desc">Description</CardDescription>
    )
    const desc = screen.getByTestId("desc")
    expect(desc).toBeInTheDocument()
    expect(desc.className).toContain("text-sm")
  })

  it("renders CardContent", () => {
    render(<CardContent data-testid="content">Content</CardContent>)
    const content = screen.getByTestId("content")
    expect(content).toBeInTheDocument()
    expect(content.className).toContain("p-6")
  })

  it("renders CardFooter", () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    const footer = screen.getByTestId("footer")
    expect(footer).toBeInTheDocument()
    expect(footer.className).toContain("flex")
  })

  it("composes a full card", () => {
    render(
      <Card data-testid="full-card">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
    expect(screen.getByText("Test Content")).toBeInTheDocument()
    expect(screen.getByText("Test Footer")).toBeInTheDocument()
  })

  it("merges custom className on each subcomponent", () => {
    render(
      <Card className="card-custom" data-testid="card">
        <CardHeader className="header-custom" data-testid="header">
          <CardTitle className="title-custom" data-testid="title">
            T
          </CardTitle>
        </CardHeader>
        <CardContent className="content-custom" data-testid="content">
          C
        </CardContent>
        <CardFooter className="footer-custom" data-testid="footer">
          F
        </CardFooter>
      </Card>
    )

    expect(screen.getByTestId("card").className).toContain("card-custom")
    expect(screen.getByTestId("header").className).toContain("header-custom")
    expect(screen.getByTestId("title").className).toContain("title-custom")
    expect(screen.getByTestId("content").className).toContain("content-custom")
    expect(screen.getByTestId("footer").className).toContain("footer-custom")
  })
})
