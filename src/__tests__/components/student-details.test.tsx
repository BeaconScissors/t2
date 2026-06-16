import React from "react"
import { render, screen } from "@testing-library/react"
import StudentDetails from "@/components/student-details"
import { Student } from "@/lib/types"

const mockStudent: Student = {
  roll_number: "21261A0001",
  name: "Test Student",
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
      "2": {
        credits: "3.00",
        examCode: "PH102BS",
        finalGrade: "F",
        monthYear: "April 2022",
        points: 0,
        status: "FAIL",
        subject: "Applied Physics",
      },
    },
    sem2: {
      "1": {
        credits: "2.00",
        examCode: "EN201HS",
        finalGrade: "B+",
        monthYear: "October 2022",
        points: 7,
        status: "PASS",
        subject: "English",
      },
    },
    sem3: null,
    sem7: {
      "1": {
        credits: "3.00",
        examCode: "EC701PC",
        finalGrade: "A",
        monthYear: "March 2025",
        points: 8,
        status: "PASS",
        subject: "VLSI Design",
      },
    },
    sem8: null,
  },
  totalSubjects: 10,
  dueSubjects: 1,
  totalCredits: 120,
  studentCredits: 100,
  GPA: "8.50",
}

describe("StudentDetails", () => {
  it("renders summary cards with GPA, Credits, and Due Subjects", () => {
    render(<StudentDetails student={mockStudent} />)

    expect(screen.getByText("8.50")).toBeInTheDocument()
    expect(screen.getByText("100/123")).toBeInTheDocument()
    expect(screen.getByText("1/10")).toBeInTheDocument()
  })

  it("renders semester tabs excluding sem7 and sem8", () => {
    render(<StudentDetails student={mockStudent} />)

    expect(screen.getByText("SEM1")).toBeInTheDocument()
    expect(screen.getByText("SEM2")).toBeInTheDocument()
    expect(screen.queryByText("SEM3")).toBeNull() // null semester
    expect(screen.queryByText("SEM7")).toBeNull() // excluded
    expect(screen.queryByText("SEM8")).toBeNull() // excluded
  })

  it("renders subjects for the default (sem1) semester", () => {
    render(<StudentDetails student={mockStudent} />)

    expect(screen.getByText("Mathematics-I")).toBeInTheDocument()
    expect(screen.getByText("MA101BS")).toBeInTheDocument()
    expect(screen.getByText("Applied Physics")).toBeInTheDocument()
    expect(screen.getByText("PH102BS")).toBeInTheDocument()
  })

  it("renders subject table headers", () => {
    render(<StudentDetails student={mockStudent} />)

    expect(screen.getByText("Subject")).toBeInTheDocument()
    expect(screen.getByText("Exam Code")).toBeInTheDocument()
    expect(screen.getByText("Grade")).toBeInTheDocument()
    expect(screen.getByText("Points")).toBeInTheDocument()
    expect(screen.getByText("Status")).toBeInTheDocument()
  })

  it("renders PASS status with green styling", () => {
    render(<StudentDetails student={mockStudent} />)

    const passElements = screen.getAllByText("PASS")
    expect(passElements.length).toBeGreaterThan(0)
    passElements.forEach((el) => {
      expect(el.className).toContain("bg-green-100")
      expect(el.className).toContain("text-green-700")
    })
  })

  it("renders FAIL status with red styling", () => {
    render(<StudentDetails student={mockStudent} />)

    const failElement = screen.getByText("FAIL")
    expect(failElement.className).toContain("bg-red-100")
    expect(failElement.className).toContain("text-red-700")
  })
})
