import { useState } from "react";
import type { ReactNode } from "react";

export function Tip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap px-2.5 py-1.5 rounded-lg text-xs font-medium pointer-events-none"
          style={{
            background: "var(--surface-high)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-strong)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
