const colorMap: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  contacted: "bg-purple-100 text-purple-700",
  confirmed: "bg-blue-100 text-blue-700",
  quoted: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-red-100 text-red-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }: { status: string }) {
  const classes = colorMap[status] ?? "bg-gray-100 text-gray-700";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${classes}`}>
      {status}
    </span>
  );
}
