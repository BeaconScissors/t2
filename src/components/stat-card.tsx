interface StatCardProps {
  label: string
  value: string | number | null
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  )
}
