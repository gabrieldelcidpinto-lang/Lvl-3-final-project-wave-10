import { useState } from "react";
import { Ico } from "./Icon";
import { currentUser, games, type Game } from "../data";
import { Dashboard } from "./Dashboard";
import { CalendarView } from "./Calendar";
import { Schedule } from "./Schedule";
import { ProfileView } from "./Profile";
import { GameDetail } from "./GameDetail";
import { type View } from "../types";
import { Tip } from "./Tip";

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const pending = games.filter((g) => g.status === "Pending").length;

  const sideNav = [
    { id: "dashboard" as View, icon: Ico.grid, label: "Dashboard" },
    { id: "schedule" as View, icon: Ico.list, label: "Schedule" },
    { id: "calendar" as View, icon: Ico.calendar, label: "Calendar" },
    { id: "profile" as View, icon: Ico.user, label: "Profile" },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Icon sidebar */}
      <nav
        style={{
          width: 72,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
          gap: 4,
          borderRight: "1px solid var(--border)",
          background: "var(--surface)",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            flexShrink: 0,
          }}
        >
          <Ico.ball />
        </div>

        {/* Nav */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}
        >
          {sideNav.map(({ id, icon: Ic, label }) => (
            <Tip key={id} label={label}>
              <button
                onClick={() => setView(id)}
                className={`sidebar-btn ${view === id ? "active" : ""}`}
                style={{ position: "relative" }}
              >
                <Ic />
                {id === "schedule" && pending > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      border: "2px solid var(--surface)",
                    }}
                  />
                )}
              </button>
            </Tip>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <button onClick={() => setView("profile")}>
            <img
              src={currentUser.photo}
              alt={currentUser.name}
              style={{
                width: 40,
                height: 40,
                borderRadius: 13,
                objectFit: "cover",
                background: "#2a3650",
                border: "2px solid var(--border-strong)",
                display: "block",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Main area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        {/* Top bar with pill tabs */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 28px",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
            flexShrink: 0,
          }}
        >
          {/* Pill nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: 4,
              borderRadius: 100,
              background: "var(--surface-raised)",
              border: "1px solid var(--border)",
            }}
          >
            {sideNav.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`nav-pill ${view === id ? "active" : ""}`}
                style={{ position: "relative" }}
              >
                {label}
                {id === "schedule" && pending > 0 && (
                  <span
                    style={{
                      display: "inline-flex",
                      marginLeft: 6,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      color: "white",
                      fontSize: 10,
                      fontWeight: 700,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {pending}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              className="mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {new Date().toLocaleDateString("en-CA", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>
          {view === "dashboard" && (
            <Dashboard onNavigate={setView} onGame={setSelectedGame} />
          )}
          {view === "schedule" && <Schedule onGame={setSelectedGame} />}
          {view === "calendar" && <CalendarView onGame={setSelectedGame} />}
          {view === "profile" && <ProfileView />}
        </main>
      </div>

      {selectedGame && (
        <GameDetail game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
}
