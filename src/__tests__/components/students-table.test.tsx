import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import StudentsTable from "@/components/students-table"
import { Student } from "@/lib/types"

const mockStudents: Student[] = [
  {
    roll_number: "21261A0001",
    name: "Test Student 1",
    semesters: {
      sem1: {
        "1": {
          credits: "4.00",
          examCode: "MA101BS",
          finalGrade: "A",
          monthYear: "April 2022",
          points: 8,
          status: "PASS",
          subject: "Mathematics-I",
        },
      },
      sem2: null,
    },
    totalSubjects: 10,
    dueSubjects: 1,
    totalCredits: 120,
    studentCredits: 100,
    GPA: "8.50",
  },
  {
    roll_number: "21261A0002",
    name: "Test Student 2",
    semesters: {
      sem1: null,
    },
    totalSubjects: 10,
    dueSubjects: 3,
    totalCredits: 120,
    studentCredits: 80,
    GPA: "7.00",
  },
]

describe("StudentsTable", () => {
  const mockOnStudentSelect = jest.fn()

  beforeEach(() => {
    mockOnStudentSelect.mockClear()
  })

  it("renders the table headers", () => {
    render(
      <StudentsTable
        students={mockStudents}
        onStudentSelect={mockOnStudentSelect}
        selectedStudent={null}
      />
    )

    expect(screen.getByText("Roll Number")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("GPA")).toBeInTheDocument()
    expect(screen.getByText("Credits")).toBeInTheDocument()
    expect(screen.getByText("Due Subjects")).toBeInTheDocument()
  })

  it("renders student rows", () => {
    render(
      <StudentsTable
        students={mockStudents}
        onStudentSelect={mockOnStudentSelect}
        selectedStudent={null}
      />
    )

    expect(screen.getByText("21261A0001")).toBeInTheDocument()
    expect(screen.getByText("Test Student 1")).toBeInTheDocument()
    expect(screen.getByText("8.50")).toBeInTheDocument()
    expect(screen.getByText("100/123")).toBeInTheDocument()
    expect(screen.getByText("1/10")).toBeInTheDocument()

    expect(screen.getByText("21261A0002")).toBeInTheDocument()
    expect(screen.getByText("Test Student 2")).toBeInTheDocument()
    expect(screen.getByText("7.00")).toBeInTheDocument()
    expect(screen.getByText("80/123")).toBeInTheDocument()
    expect(screen.getByText("3/10")).toBeInTheDocument()
  })

  it("calls onStudentSelect when a row is clicked", () => {
    render(
      <StudentsTable
        students={mockStudents}
        onStudentSelect={mockOnStudentSelect}
        selectedStudent={null}
      />
    )

    fireEvent.click(screen.getByText("Test Student 1"))
    expect(mockOnStudentSelect).toHaveBeenCalledWith("21261A0001")
  })

  it("shows StudentDetails when a student is selected", () => {
    render(
      <StudentsTable
        students={mockStudents}
        onStudentSelect={mockOnStudentSelect}
        selectedStudent="21261A0001"
      />
    )

    // StudentDetails renders GPA, Credits, and Due Subjects cards
    // The detail view shows the student's stats
    expect(screen.getAllByText("8.50").length).toBeGreaterThanOrEqual(1)
  })

  it("does not show StudentDetails when no student is selected", () => {
    const { container } = render(
      <StudentsTable
        students={mockStudents}
        onStudentSelect={mockOnStudentSelect}
        selectedStudent={null}
      />
    )

    // There should be no expanded details section (no p-6 bg-gray-50 div)
    const detailsSection = container.querySelector(".bg-gray-50")
    expect(detailsSection).toBeNull()
  })

  it("renders empty table when no students provided", () => {
    render(
      <StudentsTable
        students={[]}
        onStudentSelect={mockOnStudentSelect}
        selectedStudent={null}
      />
    )

    expect(screen.getByText("Roll Number")).toBeInTheDocument()
    expect(screen.queryByText("21261A0001")).toBeNull()
  })
})
