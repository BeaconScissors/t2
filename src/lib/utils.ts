import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Student } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const TOTAL_CREDITS = 123

export function formatCredits(student: Student): string {
  return `${student.studentCredits}/${TOTAL_CREDITS}`
}

export function formatDueSubjects(student: Student): string {
  return `${student.dueSubjects}/${student.totalSubjects}`
}

const EXCLUDED_SEMESTERS = ["sem7", "sem8"]

export function getAvailableSemesters(student: Student): string[] {
  return Object.entries(student.semesters)
    .filter(([sem, data]) => data !== null && !EXCLUDED_SEMESTERS.includes(sem))
    .map(([sem]) => sem)
}
