// import { currentUser } from "../data";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { getProfileByEmail } from "../api/profiles";

type Profile = {
  id: string;
  name: string;
  email: string;
  is_referee: boolean;
  is_assigner: boolean;
};

//What profile to display
function ProfileCard({ profile }: { profile: Profile }) {
  const role =
    profile.is_referee && profile.is_assigner
      ? "Referee & Assigner" //Are you both referee and assigner? Show both
      : profile.is_assigner
        ? "Assigner" //Only an assigner?
        : profile.is_referee
          ? "Referee" //Only a referee?
          : "No role"; //Both are false

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
      <div style={{ padding: "32px", marginTop: -40 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            {role}
          </p>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          {[
            ["Email", profile.email],
            ["Referee", profile.is_referee ? "Yes" : "No"],
            ["Assigner", profile.is_assigner ? "Yes" : "No"],
          ].map(([label, value]) => (
            <div key={label} className="card-raised p-4">
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
              </p>
              <p className="text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProfileView() {
  const { session } = UserAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (session === undefined) return;

      const email = session?.user.email;
      if (!email) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const result = await getProfileByEmail(email);
        setProfile(result);
      } catch (err) {
        console.error(err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [session]);

  if (loading) {
    return <div>Loading profile...</div>;
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
      {profile ? <ProfileCard profile={profile} /> : <p>No profile found.</p>}
    </div>
  );
}
