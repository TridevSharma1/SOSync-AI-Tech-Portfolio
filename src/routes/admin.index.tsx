import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { useSiteData } from "@/context/SiteDataContext";
import type { ListKey, SiteData } from "@/data/types";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | SOSync Ai Tech" },
      { name: "description", content: "Manage SOSync Ai Tech website content." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard | SOSync Ai Tech" },
      { property: "og:description", content: "Admin dashboard for SOSync Ai Tech website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminDashboard,
});

type FieldType = "text" | "textarea" | "number" | "list";
interface Field { key: string; label: string; type?: FieldType }

/** CRUD configuration for every list-shaped mock data collection. */
const LIST_MODULES: Partial<Record<ListKey, { label: string; icon: string; fields: Field[]; filterKey?: string }>> = {
  portfolio: {
    label: "Portfolio", icon: "briefcase", filterKey: "category",
    fields: [
      { key: "title", label: "Title" }, { key: "category", label: "Category" },
      { key: "technologies", label: "Technologies (comma separated)", type: "list" },
      { key: "image", label: "Image URL" }, { key: "description", label: "Description", type: "textarea" },
    ],
  },
  services: { label: "Services", icon: "layers", fields: [{ key: "title", label: "Title" }, { key: "icon", label: "Icon name" }, { key: "description", label: "Description", type: "textarea" }] },
  testimonials: {
    label: "Testimonials", icon: "quote",
    fields: [
      { key: "name", label: "Name" }, { key: "company", label: "Company" }, { key: "role", label: "Role" },
      { key: "initials", label: "Initials" }, { key: "rating", label: "Rating (1-5)", type: "number" },
      { key: "review", label: "Review", type: "textarea" },
    ],
  },
  team: { label: "Team", icon: "users", fields: [{ key: "name", label: "Name" }, { key: "position", label: "Position" }, { key: "initials", label: "Initials" }] },
  technologies: { label: "Technologies", icon: "code", filterKey: "category", fields: [{ key: "name", label: "Name" }, { key: "category", label: "Category" }] },
  faqs: { label: "FAQ", icon: "clipboard", fields: [{ key: "question", label: "Question" }, { key: "answer", label: "Answer", type: "textarea" }] },
  stats: { label: "Statistics", icon: "chart", fields: [{ key: "label", label: "Label" }, { key: "value", label: "Value", type: "number" }, { key: "suffix", label: "Suffix" }] },
  story: { label: "Our Story", icon: "calendar", fields: [{ key: "year", label: "Year" }, { key: "title", label: "Title" }, { key: "description", label: "Description", type: "textarea" }] },
};

type Tab = "dashboard" | ListKey | "enquiries" | "company" | "hero" | "settings";

function AdminDashboard() {
  const { isAdmin, authReady, logout, data, resetData } = useSiteData();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("dashboard");

  useEffect(() => {
    if (authReady && !isAdmin) navigate({ to: "/admin/login" });
  }, [authReady, isAdmin, navigate]);

  if (!authReady || !isAdmin) return <div className="min-h-screen bg-background" />;

  const unread = data.enquiries.filter((e) => !e.read).length;
  const nav: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    ...Object.entries(LIST_MODULES).map(([id, m]) => ({ id: id as Tab, label: m!.label, icon: m!.icon })),
    { id: "enquiries", label: `Enquiries${unread ? ` (${unread})` : ""}`, icon: "mail" },
    { id: "hero", label: "Homepage", icon: "rocket" },
    { id: "company", label: "Company & Contact", icon: "pin" },
    { id: "settings", label: "Settings", icon: "globe" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy p-5 md:flex">
        <Logo tone="light" name={data.company.shortName} />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((n) => (
            <button key={n.id} onClick={() => setTab(n.id)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${tab === n.id ? "bg-brand text-primary-foreground" : "text-primary-foreground/70 hover:bg-navy-soft"}`}>
              <Icon name={n.icon} className="size-4" /> {n.label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="flex-1 min-w-0">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-6 py-4">
          <select className="field max-w-xs md:hidden" value={tab} onChange={(e) => setTab(e.target.value as Tab)}>
            {nav.map((n) => <option key={n.id} value={n.id}>{n.label}</option>)}
          </select>
          <h1 className="hidden font-display text-xl font-bold md:block">{nav.find((n) => n.id === tab)?.label}</h1>
          <div className="flex gap-2">
            <Link to="/" className="btn btn-outline btn-sm">View site</Link>
            <button className="btn btn-gradient btn-sm" onClick={() => { logout(); navigate({ to: "/admin/login" }); }}>
              <Icon name="logout" className="size-4" /> Logout
            </button>
          </div>
        </header>
        <main className="p-6">
          {tab === "dashboard" && <Overview data={data} onOpen={setTab} />}
          {tab in LIST_MODULES && <ListManager key={tab} listKey={tab as ListKey} />}
          {tab === "enquiries" && <Enquiries />}
          {tab === "hero" && <SingletonEditor k="hero" />}
          {tab === "company" && <SingletonEditor k="company" />}
          {tab === "settings" && (
            <div className="space-y-6">
              <SingletonEditor k="social" />
              <div className="card-soft p-6">
                <h2 className="font-display font-bold">Reset content</h2>
                <p className="mt-1 text-sm text-muted-foreground">Restore all website content to the original mock data.</p>
                <button className="btn btn-outline btn-sm mt-4" onClick={() => confirm("Reset all content?") && resetData()}>Reset to defaults</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Overview({ data, onOpen }: { data: SiteData; onOpen: (t: Tab) => void }) {
  const cards: { label: string; value: number; tab: Tab; icon: string }[] = [
    { label: "Total Projects", value: data.portfolio.length, tab: "portfolio", icon: "briefcase" },
    { label: "Total Services", value: data.services.length, tab: "services", icon: "layers" },
    { label: "Testimonials", value: data.testimonials.length, tab: "testimonials", icon: "quote" },
    { label: "Team Members", value: data.team.length, tab: "team", icon: "users" },
    { label: "Enquiries", value: data.enquiries.length, tab: "enquiries", icon: "mail" },
    { label: "Portfolio Categories", value: new Set(data.portfolio.map((p) => p.category)).size, tab: "portfolio", icon: "filter" },
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((c) => (
        <button key={c.label} onClick={() => onOpen(c.tab)} className="card-soft flex items-center gap-4 p-6 text-left">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-cyan text-primary-foreground">
            <Icon name={c.icon} className="size-6" />
          </span>
          <span>
            <span className="block font-display text-3xl font-bold">{c.value}</span>
            <span className="text-sm text-muted-foreground">{c.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

type Row = Record<string, unknown> & { id: string };

function ListManager({ listKey }: { listKey: ListKey }) {
  const cfg = LIST_MODULES[listKey]!;
  const { data, addItem, updateItem, removeItem } = useSiteData();
  const rows = data[listKey] as unknown as Row[];
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<Row | "new" | null>(null);

  const cats = cfg.filterKey ? ["All", ...new Set(rows.map((r) => String(r[cfg.filterKey!])))] : [];
  const shown = useMemo(() => rows.filter((r) =>
    (filter === "All" || !cfg.filterKey || r[cfg.filterKey] === filter) &&
    JSON.stringify(r).toLowerCase().includes(q.toLowerCase())), [rows, q, filter, cfg.filterKey]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Icon name="search" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input className="field pl-9" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {cats.length > 0 && (
          <select className="field max-w-48" value={filter} onChange={(e) => setFilter(e.target.value)}>
            {cats.map((c) => <option key={c}>{c}</option>)}
          </select>
        )}
        <button className="btn btn-gradient btn-sm" onClick={() => setEditing("new")}><Icon name="plus" className="size-4" /> Add</button>
      </div>
      <div className="card-soft divide-y divide-border overflow-hidden">
        {shown.length === 0 && <p className="p-6 text-sm text-muted-foreground">No items found.</p>}
        {shown.map((r) => (
          <div key={r.id} className="flex items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{String(r[cfg.fields[0]!.key] ?? "")}</p>
              <p className="truncate text-sm text-muted-foreground">{String(cfg.fields[1] ? r[cfg.fields[1].key] ?? "" : "")}</p>
            </div>
            <button aria-label="Edit" className="rounded-lg p-2 hover:bg-muted" onClick={() => setEditing(r)}><Icon name="edit" className="size-4" /></button>
            <button aria-label="Delete" className="rounded-lg p-2 text-destructive hover:bg-muted" onClick={() => confirm("Delete this item?") && removeItem(listKey, r.id)}><Icon name="trash" className="size-4" /></button>
          </div>
        ))}
      </div>
      {editing && (
        <ItemForm fields={cfg.fields} initial={editing === "new" ? {} : editing} onCancel={() => setEditing(null)}
          onSave={(vals) => { editing === "new" ? addItem(listKey, vals) : updateItem(listKey, editing.id, vals); setEditing(null); }} />
      )}
    </div>
  );
}

function toInput(v: unknown) { return Array.isArray(v) ? v.join(", ") : v == null ? "" : String(v); }

function ItemForm({ fields, initial, onSave, onCancel }: { fields: Field[]; initial: Record<string, unknown>; onSave: (v: Record<string, unknown>) => void; onCancel: () => void }) {
  const [vals, setVals] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.key, toInput(initial[f.key])])));
  const save = () => {
    const out: Record<string, unknown> = {};
    for (const f of fields) {
      const v = vals[f.key] ?? "";
      out[f.key] = f.type === "number" ? Number(v) || 0 : f.type === "list" ? v.split(",").map((s) => s.trim()).filter(Boolean) : v;
    }
    onSave(out);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4" onClick={onCancel}>
      <div className="card-soft max-h-[90vh] w-full max-w-lg overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-display text-lg font-bold">{initial["id"] ? "Edit item" : "Add item"}</h2>
        <div className="mt-4 space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="label">{f.label}</label>
              {f.type === "textarea"
                ? <textarea rows={4} className="field" value={vals[f.key]} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} />
                : <input type={f.type === "number" ? "number" : "text"} className="field" value={vals[f.key]} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} />}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button className="btn btn-outline btn-sm" onClick={onCancel}>Cancel</button>
          <button className="btn btn-gradient btn-sm" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}

function Enquiries() {
  const { data, removeItem, markEnquiryRead } = useSiteData();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="card-soft divide-y divide-border overflow-hidden">
      {data.enquiries.length === 0 && <p className="p-6 text-sm text-muted-foreground">No enquiries yet.</p>}
      {data.enquiries.map((e) => (
        <div key={e.id} className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            {!e.read && <span className="size-2 rounded-full bg-success" aria-label="Unread" />}
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{e.subject} <span className="font-normal text-muted-foreground">— {e.name}</span></p>
              <p className="text-xs text-muted-foreground">{e.date} · {e.email}</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => { setOpen(open === e.id ? null : e.id); if (!e.read) markEnquiryRead(e.id, true); }}><Icon name="eye" className="size-4" /> View</button>
            <button className="btn btn-outline btn-sm" onClick={() => markEnquiryRead(e.id, !e.read)}>{e.read ? "Mark unread" : "Mark read"}</button>
            <button aria-label="Delete" className="rounded-lg p-2 text-destructive hover:bg-muted" onClick={() => confirm("Delete enquiry?") && removeItem("enquiries", e.id)}><Icon name="trash" className="size-4" /></button>
          </div>
          {open === e.id && (
            <div className="mt-3 rounded-xl bg-muted p-4 text-sm">
              <p><b>Phone:</b> {e.phone} · <b>Company:</b> {e.company}</p>
              <p className="mt-2 whitespace-pre-wrap">{e.message}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const LABELS: Record<string, string> = {
  addressLines: "Address lines (one per line)", phones: "Phone numbers (one per line)",
  primaryCta: "Primary button text", secondaryCta: "Secondary button text", mapQuery: "Map search text",
};

function SingletonEditor({ k }: { k: "company" | "social" | "hero" }) {
  const { data, updateSingleton } = useSiteData();
  const obj = data[k] as unknown as Record<string, unknown>;
  const [vals, setVals] = useState<Record<string, string>>(() =>
    Object.fromEntries(Object.entries(obj).map(([key, v]) => [key, Array.isArray(v) ? v.join("\n") : String(v)])));
  const [saved, setSaved] = useState(false);
  const save = () => {
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(vals)) out[key] = Array.isArray(obj[key]) ? v.split("\n").map((s) => s.trim()).filter(Boolean) : v;
    updateSingleton(k, out as never);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="card-soft max-w-2xl p-6">
      <h2 className="font-display font-bold capitalize">{k === "social" ? "Social links" : k === "hero" ? "Homepage hero" : "Company & contact details"}</h2>
      <div className="mt-4 space-y-4">
        {Object.keys(vals).map((key) => {
          const long = Array.isArray(obj[key]) || (vals[key] ?? "").length > 60;
          return (
            <div key={key}>
              <label className="label">{LABELS[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</label>
              {long
                ? <textarea rows={3} className="field" value={vals[key]} onChange={(e) => setVals({ ...vals, [key]: e.target.value })} />
                : <input className="field" value={vals[key]} onChange={(e) => setVals({ ...vals, [key]: e.target.value })} />}
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button className="btn btn-gradient btn-sm" onClick={save}>Save changes</button>
        {saved && <span className="text-sm text-success">Saved</span>}
      </div>
    </div>
  );
}
