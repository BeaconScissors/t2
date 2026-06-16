import { Fragment } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Student } from "@/lib/types"
import StudentDetails from "@/components/student-details"
import { ErrorBoundary } from "@/components/error-boundary"

interface StudentsTableProps {
  students: Student[]
  onStudentSelect: (rollNumber: string) => void
  selectedStudent: string | null
}

export default function StudentsTable({ students, onStudentSelect, selectedStudent }: StudentsTableProps) {
  if (!students || students.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center shadow-lg">
        <p className="text-gray-500">No student data available.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="font-semibold text-gray-700">Roll Number</TableHead>
            <TableHead className="font-semibold text-gray-700">Name</TableHead>
            <TableHead className="font-semibold text-gray-700">GPA</TableHead>
            <TableHead className="font-semibold text-gray-700">Credits</TableHead>
            <TableHead className="font-semibold text-gray-700">Due Subjects</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <Fragment key={student.roll_number}>
              <TableRow 
                className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                  selectedStudent === student.roll_number ? 'bg-gray-100' : ''
                }`}
                onClick={() => onStudentSelect(student.roll_number)}
              >
                <TableCell className="font-medium text-gray-900">{student.roll_number}</TableCell>
                <TableCell className="text-gray-800">{student.name}</TableCell>
                <TableCell className="text-gray-800">{student.GPA ?? "N/A"}</TableCell>
                <TableCell className="text-gray-800">{`${student.studentCredits ?? 0}/123`}</TableCell>
                <TableCell className="text-gray-800">{`${student.dueSubjects ?? 0}/${student.totalSubjects ?? 0}`}</TableCell>
              </TableRow>
              {selectedStudent === student.roll_number && (
                <TableRow>
                  <TableCell colSpan={5} className="p-0">
                    <ErrorBoundary
                      fallback={
                        <div className="p-6 text-center text-red-600">
                          Failed to load details for {student.name}. Please try again.
                        </div>
                      }
                    >
                      <StudentDetails student={student} />
                    </ErrorBoundary>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
