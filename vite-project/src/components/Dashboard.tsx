import { isUpcoming } from "../utils";
import { games, type Game } from "../data";
import { type View } from "../types";
import { Ico } from "./Icon";

export function Dashboard({
  onNavigate,
  onGame,
}: {
  onNavigate: (v: View) => void;
  onGame: (g: Game) => void;
}) {
  const upcoming = games.filter(
    (g) => isUpcoming(g.date) && g.status === "Accepted",
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: 24,
        alignItems: "start",
      }}
    >
      {/* Left column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Welcome */}
        <div className="card p-6">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1 className="text-2xl font-bold">Good evening, Marcus.</h1>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--text-secondary)" }}
              >
                NBOA Premier League 2026–27 season overview.
              </p>
            </div>
            <span className="live-badge">SEASON ACTIVE</span>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {[
            {
              label: "Games Worked",
              value: games.filter(
                (g) => g.status === "Accepted" && !isUpcoming(g.date),
              ).length,
              color: "var(--accent)",
            },
            { label: "Upcoming", value: upcoming.length, color: "#60a5fa" },
          ].map(({ label, value, color }) => (
            <div key={label} className="card p-5">
              <p
                className="text-xs uppercase tracking-wider mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
              </p>
              <p className="text-3xl font-bold" style={{ color }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Upcoming games */}
        <div className="card overflow-hidden">
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <h2 className="font-bold text-base">Upcoming Games</h2>
            <button
              onClick={() => onNavigate("schedule")}
              className="flex items-center gap-1 text-xs font-medium"
              style={{ color: "var(--accent)" }}
            >
              View All <Ico.chevR />
            </button>
          </div>
          {upcoming.slice(0, 4).map((g, i) => (
            <div
              key={g.id}
              onClick={() => onGame(g)}
              className="flex items-center gap-5 px-6 py-4 cursor-pointer"
              style={{
                borderTop: i > 0 ? "1px solid var(--border)" : undefined,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface-raised)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <div className="text-center" style={{ minWidth: 48 }}>
                <p
                  className="text-xs uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  {new Date(g.date + "T12:00:00").toLocaleDateString("en-CA", {
                    month: "short",
                  })}
                </p>
                <p className="text-2xl font-bold">
                  {new Date(g.date + "T12:00:00").getDate()}
                </p>
              </div>
              <div
                style={{
                  width: 1,
                  height: 32,
                  background: "var(--border-strong)",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="font-semibold text-sm truncate">
                  {g.homeTeam}{" "}
                  <span style={{ color: "var(--text-muted)" }}>vs</span>{" "}
                  {g.awayTeam}
                </p>
                <p
                  className="text-xs mt-0.5 truncate"
                  style={{ color: "var(--text-muted)" }}
                >
                  {g.venue.split("—")[0].trim()} · {g.time}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="font-bold text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  ${g.fee}
                </p>
                <p
                  className="mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {g.id}
                </p>
              </div>
              <span style={{ color: "var(--text-muted)" }}>
                <Ico.chevR />
              </span>
            </div>
          ))}
          {upcoming.length === 0 && (
            <p
              className="px-6 py-10 text-sm text-center"
              style={{ color: "var(--text-muted)" }}
            >
              No upcoming games.
            </p>
          )}
        </div>
      </div>

      {/* Right column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Quick nav */}
        <div className="card overflow-hidden">
          <div
            className="px-5 py-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <h2 className="font-bold text-sm">Quick Navigation</h2>
          </div>
          {(
            [
              ["schedule", "Schedule", "Upcoming & past games"],
              ["calendar", "Calendar", "Monthly view & blocks"],
              ["profile", "Profile", "Your official details"],
            ] as const
          ).map(([v, label, desc]) => (
            <button
              key={v}
              onClick={() => onNavigate(v)}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left"
              style={{
                borderTop: "1px solid var(--border)",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface-raised)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <span style={{ color: "var(--accent)" }}>
                {v === "schedule" ? (
                  <Ico.list />
                ) : v === "calendar" ? (
                  <Ico.calendar />
                ) : (
                  <Ico.user />
                )}
              </span>
              <div style={{ flex: 1 }}>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {desc}
                </p>
              </div>
              <span style={{ color: "var(--text-muted)" }}>
                <Ico.chevR />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
