"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] text-white px-4">
      {/* Background Ambience: Spotlight Blue & Amber Gradients */}
      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-blue-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-amber-500/15 blur-[140px]" />
      <div className="hero-grid-line absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-blue-900/60 bg-[#0B152B]/85 p-8 shadow-2xl backdrop-blur-2xl">
        {/* Glow Accent Line at top */}
        <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        <div className="flex items-center justify-between">
          <Logo tone="light" name={data.company.shortName} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-amber-400">
            <ShieldCheck size={13} className="text-amber-400" />
            Portal
          </span>
        </div>

        <h1 className="mt-6 font-display text-2xl font-black tracking-tight text-white">
          Admin Control Center
        </h1>
        <p className="mt-1.5 text-xs text-blue-200/70 leading-relaxed">
          Sign in to manage SOSync projects, 360° showcase images, testimonials, inquiries and system settings.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-blue-200/90 mb-1.5" htmlFor="u">
              Admin Email or Username
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Mail size={16} />
              </span>
              <input
                id="u"
                className="w-full rounded-xl border border-blue-900/60 bg-[#070F1E] pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-blue-200/90 mb-1.5" htmlFor="p">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                id="p"
                type="password"
                className="w-full rounded-xl border border-blue-900/60 bg-[#070F1E] pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs font-medium text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 via-[#FF6B00] to-orange-500 py-3 text-xs sm:text-sm font-extrabold text-black uppercase tracking-wider shadow-lg shadow-orange-500/35 transition-all hover:opacity-95 hover:shadow-orange-500/50 disabled:opacity-50 cursor-pointer"
          >
            <span>{loading ? "Authenticating..." : "Sign in to Dashboard"}</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-blue-900/40 bg-[#070F1E]/80 p-3.5 text-xs text-blue-200/80">
          <p className="font-bold text-white flex items-center justify-between">
            <span>Default Admin Credentials:</span>
            <span className="font-mono text-amber-400 font-bold">admin / admin123</span>
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200/70 hover:text-amber-400 transition-colors"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
