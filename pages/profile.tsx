import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const res = await fetch("/api/auth/user", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return <main style={{ padding: 24 }}>Loading...</main>;
  if (!user) return <main style={{ padding: 24 }}>Not logged in</main>;

  return (
    <main style={{ padding: 24, maxWidth: 400, margin: "0 auto" }}>
      <h2>My Profile</h2>
      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <div><b>Email:</b> {user.email || "-"}</div>
        <div><b>ID:</b> {user.id || "-"}</div>
      </div>
    </main>
  );
}
