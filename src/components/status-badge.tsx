interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorClass =
    status === "PASS"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}
    >
      {status}
    </span>
  )
}
