export function ProfileView() {
  function ProfileCard() {
    return (
      <div className="card overflow-hidden" style={{ maxWidth: 600 }}>
        <div
          style={{
            height: 100,
            background:
              "linear-gradient(135deg, var(--surface-raised) 0%, var(--surface-high) 100%)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.2,
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(249,115,22,0.15) 20px, rgba(249,115,22,0.15) 40px)",
            }}
          />
        </div>
        <div style={{ padding: "0 32px 32px", marginTop: -40 }}>
          <img
            src={currentUser.photo}
            alt={currentUser.name}
            className="w-20 h-20 object-cover"
            style={{
              borderRadius: 18,
              border: "4px solid var(--surface)",
              background: "#2a3650",
              marginBottom: 16,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div>
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <p
                className="text-sm mt-0.5"
                style={{ color: "var(--text-secondary)" }}
              >
                {currentUser.role}
              </p>
              {currentUser.certification && (
                <span
                  style={{
                    display: "inline-flex",
                    marginTop: 10,
                    padding: "4px 14px",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    border: "1px solid var(--accent-glow)",
                  }}
                >
                  {currentUser.certification}
                </span>
              )}
            </div>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {[
              ["Email", currentUser.email],
              ["Phone", currentUser.phone],
              ["Date of Birth", currentUser.dob],
              ["Location", currentUser.location],
              ...(currentUser.certification
                ? [["Certification", currentUser.certification]]
                : []),
            ].map(([l, v]) => (
              <div key={l} className="card-raised p-4">
                <p
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {l}
                </p>
                <p className="text-sm font-medium">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        maxWidth: 700,
      }}
    >
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Your official details and contact information.
        </p>
      </div>
      <ProfileCard />
    </div>
  );
}
