import { isUpcoming } from "../utils";
import { useState, useEffect } from "react";
import { games, type Game } from "../data";
import { Ico } from "./Icon";
import { StatusBadge } from "./SatusBadge";
import { fmtShort } from "../utils";
import { supabase } from "../config/supabaseClient";

export function Schedule({ onGame }: { onGame: (g: Game) => void }) {
  const [tab, setTab] = useState<"all" | "upcoming" | "past">("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filtered = games.filter((g) => {
    if (tab === "upcoming" && !isUpcoming(g.date)) return false;
    if (tab === "past" && isUpcoming(g.date)) return false;
    if (status && g.status !== status) return false;
    const q = search.toLowerCase();
    return (
      !q ||
      [g.homeTeam, g.awayTeam, g.venue, g.id, g.division].some((s) =>
        s.toLowerCase().includes(q),
      )
    );
  });

  //This useEffect function asks supabase for all the games inside the game table once. [] runs the code once when the page loads and not one very render.

  useEffect(() => {
    async function loadGames() {
      const { data, error } = await supabase.from("games").select("*");
      console.log("data:", data);
      console.error("error:", error);
    }

    loadGames();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 className="text-2xl font-bold">Schedule</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Your game assignments for NBOA Premier League 2026–27.
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Pill tabs */}
        <div
          className="card"
          style={{
            display: "inline-flex",
            padding: 4,
            borderRadius: 100,
            gap: 2,
          }}
        >
          {(["all", "upcoming", "past"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`nav-pill ${tab === t ? "active" : ""}`}
              style={{ textTransform: "capitalize" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search */}
        <div
          className="card flex items-center gap-2.5 px-4 py-2.5"
          style={{ flex: 1, minWidth: 200, borderRadius: 100, display: "flex" }}
        >
          <span style={{ color: "var(--text-muted)" }}>
            <Ico.search />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teams, venues, game ID…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>

        {/* Status filter */}
        <div className="card" style={{ borderRadius: 100 }}>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-5 py-2.5 text-sm outline-none appearance-none cursor-pointer bg-transparent"
            style={{ color: "var(--text-primary)" }}
          >
            <option value="">All Statuses</option>
            {["Accepted", "Pending", "Declined", "Withdrawn"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {[
                "Game ID",
                "Date",
                "Division",
                "Matchup",
                "Venue",
                "Crew",
                "Fee",
                "Status",
                "",
              ].map((h) => (
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
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((g, i) => (
              <tr
                key={g.id}
                onClick={() => onGame(g)}
                style={{
                  borderTop: i > 0 ? "1px solid var(--border)" : undefined,
                  cursor: "pointer",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--surface-raised)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <td style={{ padding: "14px 20px" }}>
                  <span
                    className="mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {g.id}
                  </span>
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <p className="font-medium text-sm">{fmtShort(g.date)}</p>
                  <p
                    className="text-xs mono"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {g.time}
                  </p>
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {g.division}
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <p className="font-semibold text-sm">{g.homeTeam}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    vs {g.awayTeam}
                  </p>
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    maxWidth: 160,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {g.venue.split("—")[0].trim()}
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex" }}>
                    {[g.crewChief, g.u1, g.u2]
                      .filter(
                        (o, idx, arr) =>
                          arr.findIndex((x) => x.id === o.id) === idx,
                      )
                      .slice(0, 3)
                      .map((o, oi) => (
                        <img
                          key={o.id}
                          src={o.photo}
                          alt={o.name}
                          title={o.name}
                          className="w-7 h-7 rounded-full object-cover"
                          style={{
                            background: "#2a3650",
                            marginLeft: oi > 0 ? -8 : 0,
                            border: "2px solid var(--surface)",
                            zIndex: 3 - oi,
                          }}
                        />
                      ))}
                  </div>
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span
                    className="mono font-bold text-sm"
                    style={{ color: "var(--accent)" }}
                  >
                    ${g.fee}
                  </span>
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <StatusBadge status={g.status} />
                </td>
                <td
                  style={{ padding: "14px 20px", color: "var(--text-muted)" }}
                >
                  <Ico.chevR />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p
            className="py-14 text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No games match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
