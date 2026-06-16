import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Student } from "@/lib/types"
import { formatCredits, formatDueSubjects } from "@/lib/utils"
import StudentDetails from "@/components/student-details"

interface StudentsTableProps {
  students: Student[]
  onStudentSelect: (rollNumber: string) => void
  selectedStudent: string | null
}

export default function StudentsTable({ students, onStudentSelect, selectedStudent }: StudentsTableProps) {
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
            <>
              <TableRow 
                key={student.roll_number} 
                className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                  selectedStudent === student.roll_number ? 'bg-gray-100' : ''
                }`}
                onClick={() => onStudentSelect(student.roll_number)}
              >
                <TableCell className="font-medium text-gray-900">{student.roll_number}</TableCell>
                <TableCell className="text-gray-800">{student.name}</TableCell>
                <TableCell className="text-gray-800">{student.GPA}</TableCell>
                <TableCell className="text-gray-800">{formatCredits(student)}</TableCell>
                <TableCell className="text-gray-800">{formatDueSubjects(student)}</TableCell>
              </TableRow>
              {selectedStudent === student.roll_number && (
                <TableRow>
                  <TableCell colSpan={5} className="p-0">
                    <StudentDetails student={student} />
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
