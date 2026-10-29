export function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    Accepted: "status-accepted",
    Declined: "status-declined",
    Pending: "status-pending",
    Withdrawn: "status-withdrawn",
  };
  return (
    <span className={`status-badge ${cls[status] ?? "status-withdrawn"}`}>
      {status}
    </span>
  );
}
