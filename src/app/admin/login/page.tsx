"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";

export default function AdminLoginPage() {
  const { login, isAdmin, authReady, data } = useSiteData();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authReady && isAdmin) router.push("/admin");
  }, [authReady, isAdmin, router]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter both username/email and password.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const ok = await login(username.trim(), password);
      if (ok) {
        router.push("/admin");
      } else {
        setError("Invalid credentials. Please verify your admin username or email and password.");
      }
    } catch {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4">
      <div className="hero-grid-line absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -left-32 top-10 size-96 rounded-full bg-brand/30 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <form onSubmit={submit} className="card-soft relative w-full max-w-md p-8">
        <Logo tone="dark" name={data.company.shortName} />
        <h1 className="mt-6 font-display text-2xl font-bold text-foreground">Admin Portal</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage SOSync projects, 360° solutions, testimonials & settings.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="u">
              Admin Email or Username
            </label>
            <input
              id="u"
              className="field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="p">
              Password
            </label>
            <input
              id="p"
              type="password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-gradient w-full disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign in to Dashboard"}
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
          <p className="font-semibold text-white">Default Admin Credentials:</p>
          <p className="mt-1 font-mono text-[11px] text-brand">admin / admin123</p>
        </div>

        <Link href="/" className="mt-4 inline-block text-sm text-primary hover:underline">
          ← Back to website
        </Link>
      </form>
    </div>
  );
}
