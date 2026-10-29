import { useState } from "react";
import { assigner } from "../data";
import type { Game } from "../data";
import { Ico } from "./Icon";
import { StatusBadge } from "./SatusBadge";
import { fmtDate } from "../utils";

export function GameDetail({
  game,
  onClose,
}: {
  game: Game;
  onClose: () => void;
}) {
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "Devon Whitmore",
      text: "Heads up — parking is tight at this venue. Arrive early.",
      time: "09:14",
    },
    {
      from: "Robert Haines",
      text: "Shot clock will be operated by venue staff this game.",
      time: "10:02",
    },
  ]);
  function send() {
    if (!chatMsg.trim()) return;
    setMessages((m) => [
      ...m,
      {
        from: "Marcus Rivera (You)",
        text: chatMsg.trim(),
        time: new Date().toLocaleTimeString("en-CA", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setChatMsg("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="relative h-full w-full max-w-xl overflow-y-auto"
        style={{
          background: "var(--surface)",
          borderLeft: "1px solid var(--border-strong)",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-7 py-5"
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <p
              className="mono text-xs mb-1"
              style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
            >
              {game.id}
            </p>
            <h2 className="text-lg font-bold">
              {game.homeTeam}{" "}
              <span style={{ color: "var(--text-muted)" }}>vs</span>{" "}
              {game.awayTeam}
            </h2>
          </div>
          <button onClick={onClose} className="sidebar-btn">
            <Ico.close />
          </button>
        </div>

        <div className="px-7 py-6 space-y-7">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Competition", game.competition],
              ["Division", game.division],
              ["Format", game.format],
              ["Date", fmtDate(game.date)],
              ["Start", game.time],
              ["End", game.endTime],
            ].map(([l, v]) => (
              <div key={l} className="card-raised p-4">
                <p
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {l}
                </p>
                <p className="font-semibold text-sm">{v}</p>
              </div>
            ))}
          </div>

          {/* Crew */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Crew
            </p>
            <div className="space-y-2">
              {[
                {
                  role: "Assigner",
                  name: game.assigner,
                  photo: assigner.photo,
                },
                {
                  role: "Crew Chief",
                  name: game.crewChief.name,
                  photo: game.crewChief.photo,
                },
                { role: "U1", name: game.u1.name, photo: game.u1.photo },
                { role: "U2 / 3PO", name: game.u2.name, photo: game.u2.photo },
              ].map(({ role, name, photo }) => (
                <div
                  key={role}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--surface-raised)",
                  }}
                >
                  <img
                    src={photo}
                    alt={name}
                    className="w-9 h-9 rounded-full object-cover"
                    style={{ background: "#2a3650" }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{name}</p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {role}
                    </p>
                  </div>
                  <StatusBadge status="Accepted" />
                </div>
              ))}
            </div>
          </div>

          {/* Venue */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Venue
            </p>
            <div
              className="p-4 rounded-2xl space-y-2"
              style={{
                border: "1px solid var(--border)",
                background: "var(--surface-raised)",
              }}
            >
              <p className="font-semibold text-sm">{game.venue}</p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {game.address}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(game.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: "var(--accent)" }}
              >
                <Ico.map /> Open in Google Maps <Ico.ext />
              </a>
            </div>
          </div>

          {/* Notes */}
          {game.notes && (
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Game Notes
              </p>
              <p
                className="text-sm leading-relaxed p-4 rounded-2xl"
                style={{
                  background: "var(--surface-raised)",
                  borderLeft: "3px solid var(--accent)",
                  color: "var(--text-primary)",
                }}
              >
                {game.notes}
              </p>
            </div>
          )}

          {/* Chat */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
              style={{ color: "var(--text-secondary)" }}
            >
              <Ico.chat /> Game Communication
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <div
                className="p-4 space-y-4 max-h-48 overflow-y-auto"
                style={{ background: "var(--surface-raised)" }}
              >
                {messages.map((m, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold">{m.from}</span>
                      <span
                        className="mono text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {m.time}
                      </span>
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="flex gap-2 p-3"
                style={{
                  borderTop: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                <input
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Add a message…"
                  className="flex-1 text-sm px-4 py-2.5 rounded-xl outline-none"
                  style={{
                    background: "var(--surface-raised)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)",
                  }}
                />
                <button onClick={send} className="btn-primary">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pb-8">
            {game.status === "Pending" && (
              <>
                <button
                  disabled
                  title="Assignment responses are read-only in this demo"
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Ico.check /> Accept Game
                </button>
                <button
                  disabled
                  title="Assignment responses are read-only in this demo"
                  className="btn-ghost flex-1"
                >
                  Decline
                </button>
              </>
            )}
            <button onClick={onClose} className="btn-ghost px-6">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
