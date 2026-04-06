"use client";

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

type Stage = "loading" | "form" | "success" | "error";

export default function ResetPasswordPage() {
  const [stage, setStage] = useState<Stage>("loading");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const supabaseRef = useRef<SupabaseClient | null>(null);

  function getSupabase() {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
    }
    return supabaseRef.current;
  }

  useEffect(() => {
    async function handleAuth() {
      const supabase = getSupabase();
      // PKCE flow: Supabase redirects with ?code=...
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      // Implicit flow fallback: #access_token=...&type=recovery
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setError(error.message);
          setStage("error");
        } else {
          setStage("form");
        }
      } else if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) {
          setError(error.message);
          setStage("error");
        } else {
          setStage("form");
        }
      } else {
        setError("Invalid or expired reset link.");
        setStage("error");
      }
    }

    handleAuth();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setSaving(true);
    const { error } = await getSupabase().auth.updateUser({ password });
    setSaving(false);

    if (error) {
      setError(error.message);
    } else {
      setStage("success");
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="font-black">ELO</span>{" "}
            <span className="font-light">RANKINGS</span>
          </h1>
        </div>

        <div className="rounded-2xl bg-card border border-border p-8">
          {stage === "loading" && (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="mt-4 text-muted">Verifying reset link...</p>
            </div>
          )}

          {stage === "error" && (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">😕</div>
              <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
              <p className="text-muted">{error}</p>
              <p className="text-muted mt-4 text-sm">
                Try requesting a new reset link from the app.
              </p>
            </div>
          )}

          {stage === "form" && (
            <>
              <h2 className="text-xl font-semibold mb-1">Set new password</h2>
              <p className="text-muted text-sm mb-6">
                Enter your new password below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                    New password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-xl bg-bg border border-border px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="At least 6 characters"
                  />
                </div>

                <div>
                  <label htmlFor="confirm" className="block text-sm font-medium mb-1.5">
                    Confirm password
                  </label>
                  <input
                    id="confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-xl bg-bg border border-border px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Repeat password"
                  />
                </div>

                {error && (
                  <p className="text-red text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold py-3 transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save new password"}
                </button>
              </form>
            </>
          )}

          {stage === "success" && (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-semibold mb-2">Password updated!</h2>
              <p className="text-muted">
                You can now log in with your new password in the app.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
