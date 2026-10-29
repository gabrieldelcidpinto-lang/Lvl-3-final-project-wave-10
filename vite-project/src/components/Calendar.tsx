export function CalendarView({ onGame }: { onGame: (g: Game) => void }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(9);
  const [calBlocks, setCalBlocks] = useState<CalendarBlock[]>(initialBlocks);
  const [showAdd, setShowAdd] = useState(false);
  const [nb, setNb] = useState({
    type: "Personal" as CalendarBlock["type"],
    date: "",
    startTime: "",
    endTime: "",
    note: "",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month, 1).toLocaleString("en-CA", {
    month: "long",
    year: "numeric",
  });

  function prev() {
    month === 0
      ? (setMonth(11), setYear((y) => y - 1))
      : setMonth((m) => m - 1);
  }
  function next() {
    month === 11
      ? (setMonth(0), setYear((y) => y + 1))
      : setMonth((m) => m + 1);
  }
  const ds = (d: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const today = new Date();

  const BLOCK_CLR: Record<string, string> = {
    Vacation: "#a78bfa",
    Personal: "#60a5fa",
    "Work Conflict": "#fbbf24",
    Medical: "#f87171",
    Travel: "#34d399",
  };

  function addBlock() {
    if (!nb.date) return;
    setCalBlocks((b) => [
      ...b,
      {
        id: `B-${String(b.length + 1).padStart(3, "0")}`,
        ...nb,
        created: new Date().toISOString().split("T")[0],
      },
    ]);
    setShowAdd(false);
    setNb({ type: "Personal", date: "", startTime: "", endTime: "", note: "" });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Your schedule at a glance.
          </p>
        </div>
        <button
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowAdd(true)}
        >
          <Ico.plus /> Add Block
        </button>
      </div>

      {/* Calendar grid */}
      <div className="card overflow-hidden">
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <button onClick={prev} className="sidebar-btn">
            <Ico.chevL />
          </button>
          <h2 className="font-bold text-base">{monthName}</h2>
          <button onClick={next} className="sidebar-btn">
            <Ico.chevLg />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--text-muted)",
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              {d}
            </div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div
              key={`e${i}`}
              style={{
                minHeight: 88,
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
              }}
            />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayGames = games.filter((g) => g.date === ds(day));
            const dayBlocks = calBlocks.filter((b) => b.date === ds(day));
            const isToday =
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === day;
            return (
              <div
                key={day}
                style={{
                  minHeight: 88,
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                  padding: 6,
                  transition: "background 0.12s",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--surface-raised)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 4,
                    background: isToday ? "var(--accent)" : "transparent",
                    color: isToday ? "white" : "var(--text-primary)",
                  }}
                >
                  {day}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  {dayGames.slice(0, 2).map((g) => (
                    <div
                      key={g.id}
                      onClick={() => onGame(g)}
                      title={`${g.homeTeam} vs ${g.awayTeam}`}
                      style={{
                        fontSize: 10,
                        padding: "2px 6px",
                        borderRadius: 6,
                        background: "rgba(249,115,22,0.18)",
                        color: "var(--accent)",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {g.time} {g.homeTeam.split(" ").pop()}
                    </div>
                  ))}
                  {dayBlocks.slice(0, 1).map((b) => (
                    <div
                      key={b.id}
                      style={{
                        fontSize: 10,
                        padding: "2px 6px",
                        borderRadius: 6,
                        background: `${BLOCK_CLR[b.type]}22`,
                        color: BLOCK_CLR[b.type],
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {b.type}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* My Blocks */}
      <div>
        <h2 className="font-bold text-lg mb-4">My Blocks</h2>
        <div className="card overflow-hidden">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Type", "Date", "Time", "Note", "Created", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "14px 20px",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {calBlocks.map((b, i) => (
                <tr
                  key={b.id}
                  style={{
                    borderTop: i > 0 ? "1px solid var(--border)" : undefined,
                  }}
                >
                  <td style={{ padding: "14px 20px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "3px 12px",
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 600,
                        background: `${BLOCK_CLR[b.type]}22`,
                        color: BLOCK_CLR[b.type],
                      }}
                    >
                      {b.type}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: 13 }}>
                    {fmtShort(b.date)}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: 12,
                      color: "var(--text-muted)",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    {b.startTime === "All Day"
                      ? "All Day"
                      : `${b.startTime}–${b.endTime}`}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: 13,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {b.note || "—"}
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: 12,
                      color: "var(--text-muted)",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    {b.created}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="sidebar-btn"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          color: "var(--text-muted)",
                        }}
                        onClick={() =>
                          setCalBlocks((bs) => bs.filter((x) => x.id !== b.id))
                        }
                        onMouseEnter={(e) => (
                          (e.currentTarget.style.color = "#f87171"),
                          (e.currentTarget.style.background =
                            "rgba(239,68,68,0.12)")
                        )}
                        onMouseLeave={(e) => (
                          (e.currentTarget.style.color = "var(--text-muted)"),
                          (e.currentTarget.style.background = "")
                        )}
                      >
                        <Ico.trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {calBlocks.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: "48px 20px",
                      textAlign: "center",
                      fontSize: 13,
                      color: "var(--text-muted)",
                    }}
                  >
                    No blocks added.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Block modal */}
      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="card p-8 w-full max-w-md space-y-5"
            style={{ borderRadius: 24 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Add Block</h2>
              <button onClick={() => setShowAdd(false)} className="sidebar-btn">
                <Ico.close />
              </button>
            </div>
            {[
              {
                label: "Block Type",
                node: (
                  <select
                    value={nb.type}
                    onChange={(e) =>
                      setNb((b) => ({
                        ...b,
                        type: e.target.value as CalendarBlock["type"],
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-2xl text-sm outline-none"
                    style={{
                      background: "var(--surface-raised)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {[
                      "Vacation",
                      "Personal",
                      "Work Conflict",
                      "Medical",
                      "Travel",
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                ),
              },
              {
                label: "Date",
                node: (
                  <input
                    type="date"
                    value={nb.date}
                    onChange={(e) =>
                      setNb((b) => ({ ...b, date: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-2xl text-sm outline-none"
                    style={{
                      background: "var(--surface-raised)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  />
                ),
              },
              {
                label: "Time Range",
                node: (
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="time"
                      value={nb.startTime}
                      onChange={(e) =>
                        setNb((b) => ({ ...b, startTime: e.target.value }))
                      }
                      className="flex-1 px-3 py-2.5 rounded-2xl text-sm outline-none"
                      style={{
                        background: "var(--surface-raised)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                      }}
                    />
                    <input
                      type="time"
                      value={nb.endTime}
                      onChange={(e) =>
                        setNb((b) => ({ ...b, endTime: e.target.value }))
                      }
                      className="flex-1 px-3 py-2.5 rounded-2xl text-sm outline-none"
                      style={{
                        background: "var(--surface-raised)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                ),
              },
              {
                label: "Note",
                node: (
                  <input
                    type="text"
                    value={nb.note}
                    onChange={(e) =>
                      setNb((b) => ({ ...b, note: e.target.value }))
                    }
                    placeholder="Optional note…"
                    className="w-full px-4 py-2.5 rounded-2xl text-sm outline-none"
                    style={{
                      background: "var(--surface-raised)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  />
                ),
              },
            ].map(({ label, node }) => (
              <div key={label}>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </p>
                {node}
              </div>
            ))}
            <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
              <button
                onClick={addBlock}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                Add Block
              </button>
              <button onClick={() => setShowAdd(false)} className="btn-ghost">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
