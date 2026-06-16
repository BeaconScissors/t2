import React from "react"
import { render, screen } from "@testing-library/react"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"

describe("Table", () => {
  it("renders a complete table structure", () => {
    render(
      <Table>
        <TableCaption>Test Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
            <TableCell>Footer 2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )

    expect(screen.getByText("Test Caption")).toBeInTheDocument()
    expect(screen.getByText("Header 1")).toBeInTheDocument()
    expect(screen.getByText("Header 2")).toBeInTheDocument()
    expect(screen.getByText("Cell 1")).toBeInTheDocument()
    expect(screen.getByText("Cell 2")).toBeInTheDocument()
    expect(screen.getByText("Footer 1")).toBeInTheDocument()
    expect(screen.getByText("Footer 2")).toBeInTheDocument()
  })

  it("renders table with correct semantic elements", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>H</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>C</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(container.querySelector("table")).toBeInTheDocument()
    expect(container.querySelector("thead")).toBeInTheDocument()
    expect(container.querySelector("tbody")).toBeInTheDocument()
    expect(container.querySelector("th")).toBeInTheDocument()
    expect(container.querySelector("td")).toBeInTheDocument()
    expect(container.querySelector("tr")).toBeInTheDocument()
  })

  it("merges custom classNames", () => {
    const { container } = render(
      <Table data-testid="table" className="custom-table">
        <TableHeader data-testid="header" className="custom-header">
          <TableRow data-testid="row" className="custom-row">
            <TableHead data-testid="head" className="custom-head">
              H
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-testid="body" className="custom-body">
          <TableRow>
            <TableCell data-testid="cell" className="custom-cell">
              C
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(container.querySelector("table")?.className).toContain(
      "custom-table"
    )
    expect(screen.getByTestId("header").className).toContain("custom-header")
    expect(screen.getByTestId("row").className).toContain("custom-row")
    expect(screen.getByTestId("head").className).toContain("custom-head")
    expect(screen.getByTestId("body").className).toContain("custom-body")
    expect(screen.getByTestId("cell").className).toContain("custom-cell")
  })

  it("wraps table in a scrollable container", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain("overflow-auto")
  })
})
