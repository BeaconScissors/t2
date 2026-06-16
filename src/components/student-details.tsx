"use client"

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Student, Semester } from "@/lib/types"
import { formatCredits, formatDueSubjects, getAvailableSemesters } from "@/lib/utils"
import StatCard from "@/components/stat-card"
import StatusBadge from "@/components/status-badge"

interface StudentDetailsProps {
  student: Student
}

export default function StudentDetails({ student }: StudentDetailsProps) {
  const [selectedSemester, setSelectedSemester] = useState("sem1")

  const semesters = getAvailableSemesters(student)

  return (
    <div className="p-6 bg-gray-50 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="GPA" value={student.GPA} />
        <StatCard label="Credits" value={formatCredits(student)} />
        <StatCard label="Due Subjects" value={formatDueSubjects(student)} />
      </div>
      <Tabs defaultValue="sem1" value={selectedSemester} onValueChange={setSelectedSemester} className="bg-white p-4 rounded-lg shadow">
        <TabsList className="grid grid-cols-6 gap-2 mb-4">
          {semesters.map((semester) => (
            <TabsTrigger key={semester} value={semester} className="text-gray-600">
              {semester.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        {semesters.map((semester) => (
          <TabsContent key={semester} value={semester}>
            {student.semesters[semester] && (
              <SemesterTable subjects={student.semesters[semester] as Semester} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

interface SemesterTableProps {
  subjects: Semester
}

function SemesterTable({ subjects }: SemesterTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-semibold text-gray-700">Subject</TableHead>
            <TableHead className="font-semibold text-gray-700">Exam Code</TableHead>
            <TableHead className="font-semibold text-gray-700">Grade</TableHead>
            <TableHead className="font-semibold text-gray-700">Points</TableHead>
            <TableHead className="font-semibold text-gray-700">Credits</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(subjects).map(([key, subject]) => (
            <TableRow key={key} className="hover:bg-gray-50">
              <TableCell className="text-gray-800 font-medium">{subject.subject}</TableCell>
              <TableCell className="text-gray-800">{subject.examCode}</TableCell>
              <TableCell className="text-gray-800">{subject.finalGrade}</TableCell>
              <TableCell className="text-gray-800">{subject.points}</TableCell>
              <TableCell className="text-gray-800">{subject.credits}</TableCell>
              <TableCell>
                <StatusBadge status={subject.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
