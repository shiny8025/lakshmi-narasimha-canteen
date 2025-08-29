"use client";

import { useState } from "react";
import { supabaseBrowser } from "../lib/supabaseBrowser";

export default function AuthPage() {
  const supabase = supabaseBrowser();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (error) return setMsg(error.message);
    // Store user in users table if not present (username/phone not updated on sign in)
    if (data && data.user) {
      await supabase.from('users').upsert({ id: data.user.id, email: data.user.email }, { onConflict: 'id' });
    }
    window.location.href = "/mode-select";
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const { data, error } = await supabase.auth.signUp({ email, password: pwd });
    setLoading(false);
    if (!error && data && data.user) {
      await supabase.from('users').upsert({ id: data.user.id, email: data.user.email, username, phone }, { onConflict: 'id' });
    }
    setMsg(error ? error.message : "Check your email to confirm sign up");
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
        queryParams: { prompt: 'select_account' }
      }
    });
    setLoading(false);
    if (error) setMsg(error.message);
  };

  return (
    <main style={{ padding: 24, maxWidth: 360, margin: "0 auto" }}>
      <h2>Sign in / Sign up</h2>
      <form style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="college email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <input
          type="text"
          placeholder="username (for sign up)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="tel"
          placeholder="phone number (for sign up)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={signIn} disabled={loading} type="submit">Sign in</button>
        <button onClick={signUp} disabled={loading} type="button">Sign up</button>
        <button onClick={signInWithGoogle} disabled={loading} type="button">Sign in with Google</button>
      </form>
      {msg && <p>{msg}</p>}
    </main>
  );
}
