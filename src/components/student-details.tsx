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

interface StudentDetailsProps {
  student: Student
}

export default function StudentDetails({ student }: StudentDetailsProps) {
  const semesters = Object.entries(student.semesters)
    .filter(([sem, data]) =>
      data !== null && data !== undefined && !['sem7', 'sem8'].includes(sem)
    )
    .map(([sem]) => sem);

  const defaultSemester = semesters[0] ?? "sem1"
  const [selectedSemester, setSelectedSemester] = useState(defaultSemester)

  if (semesters.length === 0) {
    return (
      <div className="p-6 bg-gray-50 text-center">
        <p className="text-gray-500">No semester data available for this student.</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">GPA</p>
          <p className="text-2xl font-semibold text-gray-800">{student.GPA ?? "N/A"}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Credits</p>
          <p className="text-2xl font-semibold text-gray-800">{student.studentCredits ?? 0}/123</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Due Subjects</p>
          <p className="text-2xl font-semibold text-gray-800">{student.dueSubjects ?? 0}/{student.totalSubjects ?? 0}</p>
        </div>
      </div>
      <Tabs defaultValue={defaultSemester} value={selectedSemester} onValueChange={setSelectedSemester} className="bg-white p-4 rounded-lg shadow">
        <TabsList className="grid grid-cols-6 gap-2 mb-4">
          {semesters.map((semester) => (
            <TabsTrigger key={semester} value={semester} className="text-gray-600">
              {semester.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        {semesters.map((semester) => {
          const semesterData = student.semesters[semester]
          return (
            <TabsContent key={semester} value={semester}>
              {semesterData != null ? (
                <SemesterTable subjects={semesterData} />
              ) : (
                <p className="py-4 text-center text-gray-500">
                  No data available for this semester.
                </p>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

interface SemesterTableProps {
  subjects: Semester
}

function SemesterTable({ subjects }: SemesterTableProps) {
  const entries = Object.entries(subjects)

  if (entries.length === 0) {
    return (
      <p className="py-4 text-center text-gray-500">
        No subjects recorded for this semester.
      </p>
    )
  }

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
          {entries.map(([key, subject]) => (
            <TableRow key={key} className="hover:bg-gray-50">
              <TableCell className="text-gray-800 font-medium">{subject.subject}</TableCell>
              <TableCell className="text-gray-800">{subject.examCode}</TableCell>
              <TableCell className="text-gray-800">{subject.finalGrade}</TableCell>
              <TableCell className="text-gray-800">{subject.points}</TableCell>
              <TableCell className="text-gray-800">{subject.credits}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  subject.status === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {subject.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
