"use client";

import { useState } from "react";
import type { AuthUser } from "@/components/residents/residents-client";
import { signIn } from "@/lib/firebase/auth";

type LoginPanelProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
};

export function LoginPanel({ open, onClose, onSuccess }: LoginPanelProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await signIn(email, password);
      onSuccess(user);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.25rem] border border-line bg-surface p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-label text-muted mb-2">Sign in</p>
            <h2 className="text-display-sm text-2xl">Tenant portal</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 text-muted hover:text-ink">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-label text-muted mb-2 block">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="text-label text-muted mb-2 block">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </label>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink py-3.5 text-sm font-medium text-surface hover:bg-ink/90 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-xs leading-relaxed text-muted">
          Property managers can sign in with their admin credentials on this same form.
        </p>
      </div>
    </div>
  );
}
