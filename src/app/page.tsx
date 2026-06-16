"use client"

import { useState } from 'react'
import StudentsTable from "@/components/students-table"
import { studentsData } from "@/lib/data"
import { ErrorBoundary } from "@/components/error-boundary"

export default function Home() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  const handleStudentSelect = (rollNumber: string) => {
    setSelectedStudent(rollNumber === selectedStudent ? null : rollNumber)
  }

  return (
    <main className="container mx-auto p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Mahtama Gandhi Institute of Technology</h1>
      <h1 className='text-xl font-bold text-center mb-6 text-gray-800'>Student Grade Overview (ECE - 3)</h1>
      <p className='text-sm text-center mb-2 text-gray-800'>Click on a student to view their grades</p>
      <ErrorBoundary
        fallback={
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-red-800 font-medium">
              Failed to load the students table. Please refresh the page.
            </p>
          </div>
        }
      >
        <StudentsTable 
          students={studentsData} 
          onStudentSelect={handleStudentSelect}
          selectedStudent={selectedStudent}
        />
      </ErrorBoundary>
    </main>
  )
}
