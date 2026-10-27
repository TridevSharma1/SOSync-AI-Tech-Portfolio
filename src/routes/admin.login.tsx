import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | SOSync Ai Tech" },
      { name: "description", content: "Sign in to manage SOSync Ai Tech website content." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Login | SOSync Ai Tech" },
      { property: "og:description", content: "Admin area for SOSync Ai Tech website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { login, isAdmin, authReady, data } = useSiteData();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (authReady && isAdmin) navigate({ to: "/admin" });
  }, [authReady, isAdmin, navigate]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (login(username.trim(), password)) navigate({ to: "/admin" });
    else setError("Invalid username or password.");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4">
      <div className="hero-grid-line absolute inset-0" aria-hidden="true" />
      <div className="absolute -left-32 top-10 size-96 rounded-full bg-brand/30 blur-3xl animate-pulse-glow" aria-hidden="true" />
      <form onSubmit={submit} className="card-soft relative w-full max-w-md p-8">
        <Logo tone="dark" name={data.company.shortName} />
        <h1 className="mt-6 font-display text-2xl font-bold text-foreground">Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage website content.</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="u">Username</label>
            <input id="u" className="field" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" />
          </div>
          <div>
            <label className="label" htmlFor="p">Password</label>
            <input id="p" type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" className="btn btn-gradient w-full">Sign in</button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Demo credentials: admin / admin123</p>
        <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">← Back to website</Link>
      </form>
    </div>
  );
}
