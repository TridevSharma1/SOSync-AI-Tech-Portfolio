"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import {
  useSiteData,
  type ProjectItem,
  type BackendTestimonial,
  type Story360Item,
} from "@/context/SiteDataContext";

type AdminTab =
  | "overview"
  | "projects"
  | "story360"
  | "testimonials"
  | "footer"
  | "settings";

export default function AdminDashboard() {
  const {
    isAdmin,
    authReady,
    logout,
    projects,
    allAdminTestimonials,
    admin360Slides,
    settings,
    data,
    createProject,
    updateProject,
    reorderProjects,
    deleteProject,
    approveTestimonial,
    updateTestimonial,
    createTestimonial,
    deleteTestimonial,
    create360Slide,
    update360Slide,
    delete360Slide,
    updateSettings,
    toggleMaintenanceMode,
    uploadImage,
    markEnquiryRead,
    deleteEnquiry,
  } = useSiteData();

  const router = useRouter();
  const [tab, setTab] = useState<AdminTab>("overview");
  const [togglingMaintenance, setTogglingMaintenance] = useState(false);

  const handleQuickToggleMaintenance = async () => {
    setTogglingMaintenance(true);
    try {
      const nextMode = !settings.maintenanceMode;
      const ok = await updateSettings({ maintenanceMode: nextMode });
      if (ok) {
        showToast(
          nextMode
            ? "Maintenance Mode Turned ON! (Public site is hidden)"
            : "Maintenance Mode Turned OFF! (Public site is LIVE)"
        );
      } else {
        showToast("Could not update maintenance mode. Please try again.");
      }
    } finally {
      setTogglingMaintenance(false);
    }
  };
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [seqModalOpen, setSeqModalOpen] = useState(false);
  const [projectModal, setProjectModal] = useState<{
    open: boolean;
    mode: "add" | "edit";
    item?: ProjectItem;
  }>({ open: false, mode: "add" });

  const [testimonialModal, setTestimonialModal] = useState<{
    open: boolean;
    mode: "add" | "edit";
    item?: BackendTestimonial;
  }>({ open: false, mode: "add" });


  // View Details Modals state
  const [viewProject, setViewProject] = useState<ProjectItem | null>(null);
  const [viewTestimonial, setViewTestimonial] = useState<BackendTestimonial | null>(null);

  useEffect(() => {
    if (authReady && !isAdmin) {
      router.push("/admin/login");
    }
  }, [authReady, isAdmin, router]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!authReady || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
          <p className="text-sm font-semibold text-slate-300">Authenticating admin...</p>
        </div>
      </div>
    );
  }

  const pendingTestimonials = allAdminTestimonials.filter((t) => t.status === "pending").length;

  const NAV_ITEMS: { id: AdminTab; label: string; icon: string; badge?: number }[] = [
    { id: "overview", label: "Overview", icon: "dashboard" },
    { id: "projects", label: "Portfolio Projects", icon: "briefcase" },
    { id: "story360", label: "Porfolio Slide", icon: "sparkles" },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: "quote",
      badge: pendingTestimonials > 0 ? pendingTestimonials : undefined,
    },
    { id: "footer", label: "Footer & Company", icon: "pin" },
    { id: "settings", label: "Settings & Maintenance", icon: "settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#030712] text-slate-100 relative selection:bg-amber-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[999] flex items-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 shadow-xl border border-white/10 animate-in fade-in slide-in-from-top-4">
          <span className="size-2 rounded-full bg-success" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="hidden w-64 shrink-0 flex-col bg-[#070F1E] p-5 text-white lg:flex border-r border-blue-900/50 shadow-2xl relative z-10">
        <div className="px-2 py-1">
          <Logo tone="light" name={settings.company.shortName || "SOSync AI Tech"} />
        </div>
        <div className="mt-2 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand">
          CMS Control Center
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1.5">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-all ${
                tab === n.id
                  ? "bg-gradient-to-r from-orange-600 via-[#FF6B00] to-orange-500 text-black font-extrabold shadow-lg shadow-orange-500/30"
                  : "text-blue-200/80 hover:bg-white/5 hover:text-white font-semibold"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name={n.icon} className="size-4" />
                <span>{n.label}</span>
              </div>
              {n.badge ? (
                <span className="rounded-full bg-amber-400 text-black px-2 py-0.5 text-[10px] font-black">
                  {n.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* Maintenance Mode Quick Button */}
        <div className="mt-auto border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={handleQuickToggleMaintenance}
            disabled={togglingMaintenance}
            title={
              settings.maintenanceMode
                ? "Maintenance is ON (Public site is hidden). Click to turn OFF."
                : "Maintenance is OFF (Public site is LIVE). Click to turn ON."
            }
            className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer border text-left ${
              settings.maintenanceMode
                ? "bg-amber-500/20 border-amber-500/40 hover:bg-amber-500/30 text-amber-300 shadow-sm"
                : "bg-[#0B152B]/60 border-blue-900/50 hover:bg-[#0B152B] text-blue-200/80 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`size-2.5 rounded-full transition-all ${
                  settings.maintenanceMode ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                }`}
              />
              <span className="text-xs font-semibold">
                {togglingMaintenance ? "Saving..." : "Maintenance"}
              </span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider transition-colors ${
                settings.maintenanceMode
                  ? "bg-amber-400 text-slate-950 shadow-xs"
                  : "bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30"
              }`}
            >
              {settings.maintenanceMode ? "ACTIVE" : "OFF"}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-blue-900/40 bg-[#030712]/90 backdrop-blur-xl px-6 py-4 shadow-xl">
          <div className="flex items-center gap-3 lg:hidden">
            <select
              className="field text-sm font-semibold py-1.5 bg-[#0B152B] border-blue-900/60 text-white"
              value={tab}
              onChange={(e) => setTab(e.target.value as AdminTab)}
            >
              {NAV_ITEMS.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label} {n.badge ? `(${n.badge})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <h1 className="font-display text-xl font-extrabold text-white tracking-tight">
              {NAV_ITEMS.find((n) => n.id === tab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleQuickToggleMaintenance}
              disabled={togglingMaintenance}
              title={
                settings.maintenanceMode
                  ? "Maintenance Mode is ACTIVE (Visitors see maintenance screen). Click to make site LIVE."
                  : "Maintenance Mode is OFF (Site is LIVE). Click to enable maintenance screen."
              }
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all border shadow-xs cursor-pointer disabled:opacity-50 ${
                settings.maintenanceMode
                  ? "bg-amber-500 text-slate-950 border-amber-600 hover:bg-amber-400 shadow-amber-500/20"
                  : "bg-[#0B152B] border-blue-900/60 text-blue-200 hover:border-amber-500/40 hover:bg-[#0E1A34]"
              }`}
            >
              <span
                className={`size-2 rounded-full ${
                  settings.maintenanceMode ? "bg-slate-950 animate-ping" : "bg-emerald-500"
                }`}
              />
              <span>
                {togglingMaintenance
                  ? "Updating..."
                  : settings.maintenanceMode
                  ? "Maintenance: ON"
                  : "Maintenance: OFF"}
              </span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-blue-900/60 bg-[#0B152B] px-3.5 py-1.5 text-xs font-bold text-blue-200 hover:border-amber-500/50 hover:text-amber-400 hover:bg-[#0E1A34] transition-all shadow-xs"
            >
              View Live Website ↗
            </Link>
            <button
              className="btn btn-outline btn-sm text-xs font-semibold py-1.5"
              onClick={async () => {
                await logout();
                router.push("/admin/login");
              }}
            >
              <Icon name="logout" className="size-3.5" /> Logout
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {tab === "overview" && (
            <OverviewTab
              projectsCount={projects.length}
              testimonialsCount={allAdminTestimonials.length}
              pendingTestimonials={pendingTestimonials}
              slides360Count={projects.filter((p) => p.showIn360 !== false && Boolean(p.image)).length}
              maintenanceMode={settings.maintenanceMode}
              onNavigate={setTab}
              onToggleMaintenance={handleQuickToggleMaintenance}
              togglingMaintenance={togglingMaintenance}
            />
          )}

          {tab === "projects" && (
            <ProjectsTab
              projects={projects}
              onAddNew={() => setProjectModal({ open: true, mode: "add" })}
              onView={(p) => setViewProject(p)}
              onEdit={(p) => setProjectModal({ open: true, mode: "edit", item: p })}
              onOpenSequenceEditor={() => setSeqModalOpen(true)}
              onBatchReorder={async (orders) => {
                const ok = await reorderProjects(orders);
                if (ok) showToast("Project sequences updated successfully!");
              }}
              onReorder={async (id, newOrder) => {
                await updateProject(id, { order: newOrder });
              }}
              onDelete={async (id) => {
                if (window.confirm("Are you sure you want to delete this project?")) {
                  const ok = await deleteProject(id);
                  if (ok) {
                    showToast("Project deleted successfully");
                  } else {
                    showToast("Could not delete project. Please try again.");
                  }
                }
              }}
            />
          )}

          {tab === "story360" && (
            <PorfolioSlideTab
              projects={projects}
              onNavigate={setTab}
              onBatchReorder={async (orders) => {
                const ok = await reorderProjects(orders);
                if (ok) showToast("Carousel slide sequence updated!");
              }}
              onReorder={async (id, newOrder) => {
                await updateProject(id, { order: newOrder });
              }}
              onToggle360={async (p) => {
                const nextState = !p.showIn360;
                const id = p._id || p.id || "";
                if (id) {
                  const ok = await updateProject(id, { showIn360: nextState });
                  if (ok) showToast(nextState ? "Project added to 360° carousel" : "Project removed from 360° carousel");
                }
              }}
              onView={(p) => setViewProject(p)}
              onEdit={(p) => setProjectModal({ open: true, mode: "edit", item: p })}
            />
          )}

          {tab === "testimonials" && (
            <TestimonialsTab
              testimonials={allAdminTestimonials}
              onAddNew={() => setTestimonialModal({ open: true, mode: "add" })}
              onView={(t) => setViewTestimonial(t)}
              onEdit={(t) => setTestimonialModal({ open: true, mode: "edit", item: t })}
              onApprove={async (id) => {
                const ok = await approveTestimonial(id, "approved");
                if (ok) showToast("Testimonial Approved!");
              }}
              onReject={async (id) => {
                const ok = await approveTestimonial(id, "rejected");
                if (ok) showToast("Testimonial Rejected");
              }}
              onDelete={async (id) => {
                if (confirm("Delete this testimonial?")) {
                  const ok = await deleteTestimonial(id);
                  if (ok) showToast("Testimonial deleted");
                }
              }}
            />
          )}

          {tab === "footer" && (
            <FooterCompanyTab
              settings={settings}
              onSave={async (patch) => {
                const ok = await updateSettings(patch);
                if (ok) showToast("Footer & Company details updated!");
              }}
            />
          )}

          {tab === "settings" && (
            <SettingsTab
              settings={settings}
              onSave={async (patch) => {
                const ok = await updateSettings(patch);
                if (ok) {
                  if (patch.maintenanceMode !== undefined) {
                    showToast(
                      patch.maintenanceMode
                        ? "Maintenance Mode Turned ON! (Public site is hidden)"
                        : "Maintenance Mode Turned OFF! (Public site is LIVE)"
                    );
                  } else {
                    showToast("Settings updated successfully!");
                  }
                } else {
                  showToast("Could not update settings. Please try again.");
                }
              }}
            />
          )}
        </main>
      </div>

      {/* Project Add/Edit Modal */}
      {projectModal.open && (
        <ProjectFormModal
          mode={projectModal.mode}
          initial={projectModal.item}
          onClose={() => setProjectModal({ open: false, mode: "add" })}
          onUpload={uploadImage}
          onSave={async (data) => {
            let ok = false;
            if (projectModal.mode === "add") {
              ok = await createProject(data);
              if (ok) showToast("New Project Added to Portfolio!");
            } else if (projectModal.item?._id || projectModal.item?.id) {
              const id = projectModal.item._id || projectModal.item.id!;
              const desiredOrder = Number(data.order);
              if (desiredOrder > 0) {
                // Auto-shift collision-free sequence:
                const list = [...projects];
                const curIdx = list.findIndex((p) => p._id === id || p.id === id);
                if (curIdx !== -1) {
                  const [moved] = list.splice(curIdx, 1);
                  const targetIdx = Math.max(0, Math.min(desiredOrder - 1, list.length));
                  list.splice(targetIdx, 0, { ...moved, ...data, order: desiredOrder });
                  const payload = list.map((p, i) => ({
                    id: (p._id || p.id || "") as string,
                    order: i + 1,
                  }));
                  await reorderProjects(payload);
                }
              }
              ok = await updateProject(id, data);
              if (ok) showToast("Project Updated & Sequences Adjusted!");
            }
            if (ok) setProjectModal({ open: false, mode: "add" });
          }}
        />
      )}

      {/* Full-Fledged Drag & Drop Sequence Editor Modal */}
      {seqModalOpen && (
        <SequenceEditorModal
          projects={projects}
          onClose={() => setSeqModalOpen(false)}
          onSave={async (orders) => {
            const ok = await reorderProjects(orders);
            if (ok) showToast("All project sequences saved successfully!");
          }}
        />
      )}



      {/* Testimonial Add/Edit Modal */}
      {testimonialModal.open && (
        <TestimonialModal
          mode={testimonialModal.mode}
          initial={testimonialModal.item}
          onClose={() => setTestimonialModal({ open: false, mode: "add" })}
          onSave={async (data) => {
            let ok = false;
            if (testimonialModal.mode === "add") {
              ok = await createTestimonial({ ...data, status: "approved" });
              if (ok) showToast("Testimonial created & approved!");
            } else if (testimonialModal.item?._id) {
              ok = await updateTestimonial(testimonialModal.item._id, data);
              if (ok) showToast("Testimonial updated successfully!");
            }
            if (ok) setTestimonialModal({ open: false, mode: "add" });
          }}
        />
      )}

      {/* Project View Modal */}
      {viewProject && (
        <ProjectViewModal
          project={viewProject}
          onClose={() => setViewProject(null)}
          onEdit={(p) => {
            setViewProject(null);
            setProjectModal({ open: true, mode: "edit", item: p });
          }}
          onDelete={async (id) => {
            if (window.confirm("Are you sure you want to delete this project?")) {
              setViewProject(null);
              const ok = await deleteProject(id);
              if (ok) {
                showToast("Project deleted successfully");
              } else {
                showToast("Could not delete project. Please try again.");
              }
            }
          }}
        />
      )}

      {/* Testimonial View Modal */}
      {viewTestimonial && (
        <TestimonialViewModal
          testimonial={viewTestimonial}
          onClose={() => setViewTestimonial(null)}
          onEdit={(t) => {
            setViewTestimonial(null);
            setTestimonialModal({ open: true, mode: "edit", item: t });
          }}
          onApprove={async (id) => {
            const ok = await approveTestimonial(id, "approved");
            if (ok) {
              showToast("Testimonial Approved!");
              setViewTestimonial((prev) => (prev ? { ...prev, status: "approved" } : null));
            }
          }}
          onReject={async (id) => {
            const ok = await approveTestimonial(id, "rejected");
            if (ok) {
              showToast("Testimonial Rejected!");
              setViewTestimonial((prev) => (prev ? { ...prev, status: "rejected" } : null));
            }
          }}
          onDelete={async (id) => {
            if (confirm("Delete this testimonial?")) {
              const ok = await deleteTestimonial(id);
              if (ok) {
                showToast("Testimonial deleted");
                setViewTestimonial(null);
              }
            }
          }}
        />
      )}

    </div>
  );
}

// -------------------------------------------------------------
// 1. OVERVIEW TAB
// -------------------------------------------------------------
function OverviewTab({
  projectsCount,
  testimonialsCount,
  pendingTestimonials,
  slides360Count,
  maintenanceMode,
  onNavigate,
  onToggleMaintenance,
  togglingMaintenance,
}: {
  projectsCount: number;
  testimonialsCount: number;
  pendingTestimonials: number;
  slides360Count: number;
  maintenanceMode: boolean;
  onNavigate: (t: AdminTab) => void;
  onToggleMaintenance?: () => void;
  togglingMaintenance?: boolean;
}) {
  const cards = [
    {
      title: "Portfolio Projects",
      value: projectsCount,
      sub: "Active live projects",
      tab: "projects" as AdminTab,
      icon: "briefcase",
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Porfolio Slides",
      value: slides360Count,
      sub: "Projects in 360° carousel",
      tab: "story360" as AdminTab,
      icon: "sparkles",
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Testimonials",
      value: testimonialsCount,
      sub: pendingTestimonials > 0 ? `${pendingTestimonials} pending approval` : "All approved",
      badge: pendingTestimonials > 0 ? "Action Required" : undefined,
      tab: "testimonials" as AdminTab,
      icon: "quote",
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Maintenance alert if active */}
      {maintenanceMode && (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/40 backdrop-blur-md p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-amber-500/5">
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-amber-500 animate-ping shrink-0" />
            <div>
              <h3 className="font-bold text-amber-300 text-sm font-bold">Maintenance Mode is ON</h3>
              <p className="text-xs text-amber-200/80">
                Regular visitors are seeing the maintenance page. Public site is temporarily hidden.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onToggleMaintenance && (
              <button
                type="button"
                onClick={onToggleMaintenance}
                disabled={togglingMaintenance}
                className="btn btn-sm bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-bold shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {togglingMaintenance ? "Turning OFF..." : "Turn OFF Maintenance"}
              </button>
            )}
            <button
              type="button"
              onClick={() => onNavigate("settings")}
              className="btn btn-sm btn-outline border-amber-400 text-amber-900 hover:bg-amber-100 text-xs font-semibold cursor-pointer"
            >
              Settings
            </button>
          </div>
        </div>
      )}

      {/* Quick stats grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <button
            key={c.title}
            onClick={() => onNavigate(c.tab)}
            className="rounded-2xl text-left p-6 flex flex-col justify-between bg-[#0B152B]/75 border border-blue-900/60 hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] backdrop-blur-md transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span
                className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-md`}
              >
                <Icon name={c.icon} className="size-6" />
              </span>
              {c.badge && (
                <span className="rounded-full bg-brand-deep px-2.5 py-0.5 text-xs font-bold text-white animate-pulse">
                  {c.badge}
                </span>
              )}
            </div>
            <div className="mt-6">
              <div className="font-display text-3xl sm:text-4xl font-black text-white">{c.value}</div>
              <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors mt-1">{c.title}</div>
              <div className="text-xs text-blue-200/70 mt-0.5">{c.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Action Bar */}
      <div className="rounded-2xl p-6 bg-[#0B152B]/75 border border-blue-900/60 backdrop-blur-md shadow-xl">
        <h3 className="font-display text-base font-bold text-white mb-4 flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-400" />
          <span>Quick Management</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate("projects")}
            className="btn btn-gradient btn-sm"
          >
            <Icon name="plus" className="size-4" /> Add New Project
          </button>
          <button
            onClick={() => onNavigate("story360")}
            className="btn btn-outline btn-sm"
          >
            <Icon name="sparkles" className="size-4" /> Manage Porfolio Slides
          </button>
          <button
            onClick={() => onNavigate("testimonials")}
            className="btn btn-outline btn-sm"
          >
            <Icon name="check" className="size-4" /> Review Testimonials
          </button>
          <button
            type="button"
            onClick={onToggleMaintenance || (() => onNavigate("settings"))}
            disabled={togglingMaintenance}
            className={`btn btn-sm cursor-pointer disabled:opacity-50 ${
              maintenanceMode
                ? "bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold border-amber-500"
                : "btn-outline"
            }`}
          >
            <Icon name="settings" className="size-4" />
            {togglingMaintenance
              ? "Updating..."
              : maintenanceMode
              ? "Turn OFF Maintenance Mode"
              : "Toggle Maintenance Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. PROJECTS TAB (Full CRUD + Cloudinary Upload)
// -------------------------------------------------------------
function ProjectsTab({
  projects,
  onAddNew,
  onView,
  onEdit,
  onDelete,
  onReorder,
  onBatchReorder,
  onOpenSequenceEditor,
}: {
  projects: ProjectItem[];
  onAddNew: () => void;
  onView: (p: ProjectItem) => void;
  onEdit: (p: ProjectItem) => void;
  onDelete: (id: string) => void;
  onReorder?: (id: string, newOrder: number) => Promise<boolean | void>;
  onBatchReorder?: (orders: Array<{ id: string; order: number }>) => Promise<boolean | void>;
  onOpenSequenceEditor?: () => void;
}) {
  const [viewSection, setViewSection] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const categories = [
    "All",
    "Dynamic Portfolio",
    "Static Portfolio",
    "Ecommerce",
    "Custom Software",
  ] as const;

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const pCat = (p.category || "").trim().toLowerCase();
      const fCat = catFilter.trim().toLowerCase();
      let matchCat = catFilter === "All" || pCat === fCat;
      if (!matchCat && catFilter !== "All") {
        if (fCat === "dynamic portfolio") matchCat = pCat.includes("dynamic");
        else if (fCat === "static portfolio") matchCat = pCat.includes("static");
        else if (fCat === "ecommerce") matchCat = pCat.includes("ecom") || pCat.includes("commerce");
        else if (fCat === "custom software") matchCat = pCat.includes("custom") || pCat.includes("software") || pCat.includes("erp") || pCat.includes("crm");
      }
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [projects, catFilter, search]);

  const handleShiftRank = async (targetId: string, newRank: number) => {
    if (!onBatchReorder) return;
    const list = [...projects];
    const curIdx = list.findIndex((p) => (p._id === targetId || p.id === targetId));
    if (curIdx === -1) return;
    const [moved] = list.splice(curIdx, 1);
    const targetIdx = Math.max(0, Math.min(newRank - 1, list.length));
    list.splice(targetIdx, 0, moved);

    const payload = list.map((p, i) => ({
      id: (p._id || p.id || "") as string,
      order: i + 1,
    }));
    await onBatchReorder(payload);
  };

  const handleMove = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= filtered.length) return;
    const targetItem = filtered[index];
    const targetId = targetItem._id || targetItem.id || "";
    if (!targetId) return;
    await handleShiftRank(targetId, targetIndex + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-bold text-white">Portfolio Projects</h2>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {projects.length} Total
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage projects shown on the portfolio page and the 360° carousel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Section Switcher: Card Wise Preview & List Wise */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#070F1E] border border-blue-900/60 shadow-inner">
            <button
              type="button"
              onClick={() => setViewSection("card")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                viewSection === "card"
                  ? "bg-gradient-to-r from-orange-600 via-[#FF6B00] to-orange-500 text-black shadow-md shadow-orange-500/25"
                  : "text-blue-200/80 hover:text-white"
              }`}
            >
              <Icon name="grid" className="size-3.5" />
              Card Wise Preview
            </button>
            <button
              type="button"
              onClick={() => setViewSection("list")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                viewSection === "list"
                  ? "bg-gradient-to-r from-orange-600 via-[#FF6B00] to-orange-500 text-black shadow-md shadow-orange-500/25"
                  : "text-blue-200/80 hover:text-white"
              }`}
            >
              <Icon name="list" className="size-3.5" />
              List Wise
            </button>
          </div>

          {onOpenSequenceEditor && (
            <button
              type="button"
              onClick={onOpenSequenceEditor}
              className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/60 bg-orange-500/10 hover:bg-[#FF6B00] hover:text-black text-orange-400 font-extrabold px-3.5 py-1.5 text-xs transition-all shadow-xs cursor-pointer"
              title="Open Drag & Drop Sequence Editor"
            >
              <Icon name="layers" className="size-3.5" />
              Arrange Sequence
            </button>
          )}

          <button onClick={onAddNew} className="btn btn-gradient btn-sm self-start sm:self-auto">
            <Icon name="plus" className="size-4" /> Add Project
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 bg-[#0B152B]/75 border border-blue-900/60 p-4 rounded-2xl backdrop-blur-md shadow-lg">
        <div className="relative flex-1 min-w-[200px]">
          <Icon name="search" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full rounded-xl border border-blue-900/60 bg-[#070F1E] pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            placeholder="Search projects by title, tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="rounded-xl border border-blue-900/60 bg-[#070F1E] px-3 py-2.5 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none max-w-[220px]"
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* SECTION 1: Card Wise Preview */}
      {viewSection === "card" && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, idx) => {
            const id = p._id || p.id || "";
            return (
              <div
                key={id}
                className="rounded-2xl overflow-hidden flex flex-col justify-between h-full bg-[#0B152B]/75 border border-blue-900/60 hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 group shadow-md"
              >
                <div>
                  <div className="relative aspect-[21/10] bg-[#070F1E] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-navy/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xs">
                        {p.category}
                      </span>
                    </div>
                    {p.showIn360 && (
                      <div className="absolute top-3 right-3">
                        <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-extrabold text-white shadow-xs">
                          360° Active
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-amber-400 transition-colors" title={p.title}>
                      {p.title}
                    </h3>
                    <div className="mt-2 h-14 overflow-y-auto pr-1 text-xs text-blue-200/70 leading-relaxed custom-scrollbar">
                      {p.description || ""}
                    </div>
                    <div className="mt-3 h-6 flex items-center gap-1 overflow-x-auto no-scrollbar">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="shrink-0 rounded-full border border-blue-900/60 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-blue-200/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-blue-900/40 flex items-center justify-between gap-2 bg-[#070F1E]/60">
                  <div className="flex items-center gap-2">
                    {onReorder && (
                      <div className="flex items-center gap-0.5 bg-[#0B152B] border border-blue-900/60 rounded-xl px-1.5 py-0.5 shadow-xs">
                        <button
                          type="button"
                          onClick={() => handleMove(idx, -1)}
                          disabled={idx === 0}
                          title="Move earlier in sequence"
                          className="p-1 rounded-lg text-slate-400 hover:text-amber-400 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                        >
                          <Icon name="arrow-left" className="size-3" />
                        </button>
                        <span className="text-[10px] font-bold text-amber-400 min-w-[22px] text-center" title={`Display sequence: #${idx + 1}`}>
                          #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleMove(idx, 1)}
                          disabled={idx === filtered.length - 1}
                          title="Move later in sequence"
                          className="p-1 rounded-lg text-slate-400 hover:text-amber-400 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                        >
                          <Icon name="arrow-right" className="size-3" />
                        </button>
                      </div>
                    )}

                    {p.href && p.href !== "#" ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
                      >
                        Live Demo ↗
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">No URL</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onView(p)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-blue-900/60 bg-[#0B152B] px-3 py-1.5 text-xs font-bold text-blue-200 hover:border-amber-500/50 hover:text-amber-400 transition-all shadow-xs cursor-pointer"
                      title="View full project details"
                    >
                      <Icon name="eye" className="size-3.5" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => onEdit(p)}
                      className="p-1.5 rounded-lg text-blue-200/80 hover:bg-amber-500/10 hover:text-amber-400 transition-colors cursor-pointer"
                      title="Edit project"
                    >
                      <Icon name="edit" className="size-4" />
                    </button>
                    <button
                      onClick={() => onDelete(id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Icon name="trash" className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 2: List Wise */}
      {viewSection === "list" && (
        <div className="rounded-2xl border border-blue-900/60 bg-[#0B152B]/80 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#070F1E] border-b border-blue-900/60 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-32 text-center">Arrange Seq</th>
                  <th className="py-3.5 px-4 w-28">Preview</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Project Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-center">360° Slide</th>
                  <th className="py-3.5 px-4">Live Link</th>
                  <th className="py-3.5 px-4 text-right pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30">
                {filtered.map((p, idx) => {
                  const id = p._id || p.id || "";
                  return (
                    <tr key={id} className="hover:bg-white/[0.03] transition-colors">
                      {/* Arrange in Sequence Option (Editable Rank + Auto-Shift) */}
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1 bg-[#070F1E] border border-blue-900/50 rounded-xl px-2 py-1 shadow-xs">
                          <button
                            type="button"
                            onClick={() => handleMove(idx, -1)}
                            disabled={idx === 0}
                            title="Move up in sequence"
                            className="p-1 rounded-md text-slate-400 hover:text-amber-400 hover:bg-white/5 disabled:opacity-20 cursor-pointer"
                          >
                            <Icon name="arrow-up" className="size-3.5" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={projects.length}
                            defaultValue={idx + 1}
                            key={`seq-input-${id}-${idx + 1}`}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const val = parseInt(e.currentTarget.value, 10);
                                if (!isNaN(val) && val >= 1 && val !== idx + 1) {
                                  handleShiftRank(id, val);
                                }
                              }
                            }}
                            onBlur={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val) && val >= 1 && val !== idx + 1) {
                                handleShiftRank(id, val);
                              }
                            }}
                            className="w-10 h-6 text-center font-black text-amber-400 bg-black/40 hover:bg-black/60 focus:bg-[#0B152B] rounded border border-blue-900/40 focus:border-amber-500/70 outline-none text-xs cursor-text transition-all"
                            title="Type new rank and press Enter (automatically shifts others without collision)"
                          />
                          <button
                            type="button"
                            onClick={() => handleMove(idx, 1)}
                            disabled={idx === filtered.length - 1}
                            title="Move down in sequence"
                            className="p-1 rounded-md text-slate-400 hover:text-amber-400 hover:bg-white/5 disabled:opacity-20 cursor-pointer"
                          >
                            <Icon name="arrow-down" className="size-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* 16:9 Thumbnail Preview */}
                      <td className="py-3 px-4">
                        <div className="w-20 sm:w-22 aspect-video rounded-lg overflow-hidden border border-blue-900/60 bg-[#070F1E] shrink-0 shadow-xs">
                          <img src={p.image} alt={p.title} className="size-full object-cover" />
                        </div>
                      </td>

                      {/* Project Title & Tags */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-sm hover:text-amber-400 transition-colors" title={p.title}>
                          {p.title}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {p.tags.slice(0, 3).map((t) => (
                            <span key={t} className="rounded-full border border-blue-900/50 bg-white/5 px-2 py-0.2 text-[9px] text-blue-200/70">
                              {t}
                            </span>
                          ))}
                          {p.tags.length > 3 && (
                            <span className="text-[9px] text-slate-500">+{p.tags.length - 3}</span>
                          )}
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-3 px-4">
                        <span className="inline-block rounded-full bg-navy/80 border border-blue-800/60 px-2.5 py-0.5 text-xs font-bold text-blue-200 whitespace-nowrap">
                          {p.category}
                        </span>
                      </td>

                      {/* 360° Status */}
                      <td className="py-3 px-4 text-center">
                        {p.showIn360 ? (
                          <span className="inline-block rounded-full bg-brand/20 border border-brand/50 text-brand px-2.5 py-0.5 text-[10px] font-black whitespace-nowrap">
                            360° Active
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500">Inactive</span>
                        )}
                      </td>

                      {/* Live Link */}
                      <td className="py-3 px-4">
                        {p.href && p.href !== "#" ? (
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1"
                          >
                            <span>Visit</span>
                            <span className="text-[10px]">↗</span>
                          </a>
                        ) : (
                          <span className="text-slate-500 text-xs">—</span>
                        )}
                      </td>

                      {/* Action Column: Strictly View, Edit, Delete */}
                      <td className="py-3 px-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onView(p)}
                            className="inline-flex items-center gap-1 rounded-lg border border-blue-900/60 bg-[#0B152B] px-2.5 py-1 text-xs font-bold text-blue-200 hover:border-amber-500/60 hover:text-amber-400 transition-all cursor-pointer shadow-xs"
                            title="View project details"
                          >
                            <Icon name="eye" className="size-3.5" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => onEdit(p)}
                            className="inline-flex items-center gap-1 rounded-lg border border-blue-900/60 bg-[#0B152B] px-2.5 py-1 text-xs font-bold text-blue-200 hover:border-amber-500/60 hover:text-amber-400 transition-all cursor-pointer shadow-xs"
                            title="Edit project"
                          >
                            <Icon name="edit" className="size-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => onDelete(id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-900/50 bg-red-950/20 px-2.5 py-1 text-xs font-bold text-red-400 hover:bg-red-900/40 hover:text-red-300 transition-all cursor-pointer shadow-xs"
                            title="Delete project"
                          >
                            <Icon name="trash" className="size-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="rounded-2xl p-12 text-center bg-[#0B152B]/60 border border-blue-900/50 text-blue-200/70 text-sm">
          No projects found in this category. Click &quot;Add Project&quot; to create a new one!
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 3. PORFOLIO SLIDE TAB (360° Carousel Slides & Sequence Reorder)
// -------------------------------------------------------------
const INITIAL_PROJECT_TITLES = new Set([
  "phoolrani sarees",
  "sp art hubs",
  "karyon college",
  "sonai residential world school",
  "sonai school erp software",
  "erudition infinite",
  "suraj naturo dry fruits",
  "finsight ai",
  "medicare+ mobile app",
  "salessync crm",
  "manufactpro erp",
  "nova brand identity system",
  "pixelcraft ui kit & graphics",
]);

function PorfolioSlideTab({
  projects = [],
  onNavigate,
  onReorder,
  onBatchReorder,
  onToggle360,
  onView,
  onEdit,
}: {
  projects?: ProjectItem[];
  onNavigate?: (t: AdminTab) => void;
  onReorder?: (id: string, newOrder: number) => Promise<boolean | void>;
  onBatchReorder?: (orders: Array<{ id: string; order: number }>) => Promise<boolean | void>;
  onToggle360?: (project: ProjectItem) => Promise<boolean | void>;
  onView?: (p: ProjectItem) => void;
  onEdit?: (p: ProjectItem) => void;
}) {

  const hasAdminProjects = projects.some((p) => {
    const t = (p.title || "").trim().toLowerCase();
    return !INITIAL_PROJECT_TITLES.has(t);
  });

  const projectsIn360 = useMemo(() => {
    return projects.filter((p) => {
      if (p.showIn360 === false) return false;
      const t = (p.title || "").trim().toLowerCase();
      if (hasAdminProjects && INITIAL_PROJECT_TITLES.has(t)) return false;
      return Boolean(p.image);
    });
  }, [projects, hasAdminProjects]);

  const handleSlideMove = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projectsIn360.length) return;
    const currentItem = projectsIn360[index];
    const currentId = currentItem._id || currentItem.id || "";
    if (!currentId) return;

    if (onBatchReorder) {
      const list = [...projects];
      const curIdx = list.findIndex((p) => (p._id === currentId || p.id === currentId));
      if (curIdx === -1) return;
      const [moved] = list.splice(curIdx, 1);
      const targetProj = projectsIn360[targetIndex];
      const targetProjId = targetProj._id || targetProj.id;
      const targetListIdx = list.findIndex((p) => (p._id === targetProjId || p.id === targetProjId));
      const insertAt = targetListIdx === -1 ? curIdx : (direction === 1 ? targetListIdx + 1 : targetListIdx);
      list.splice(insertAt, 0, moved);

      const payload = list.map((p, i) => ({
        id: (p._id || p.id || "") as string,
        order: i + 1,
      }));
      await onBatchReorder(payload);
    } else if (onReorder) {
      const targetItem = projectsIn360[targetIndex];
      const targetId = targetItem._id || targetItem.id || "";
      await onReorder(currentId, targetIndex + 1);
      await onReorder(targetId, index + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-bold text-white">Porfolio Slide</h2>
            <span className="rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-black px-2.5 py-0.5 text-xs font-black shadow-xs">
              {projectsIn360.length} in Carousel
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Projects displayed in 360° Carousel on homepage & portfolio. Widescreen 16:9 previews matching the live main site display.
          </p>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate("projects")}
            className="btn btn-outline btn-sm self-start sm:self-auto text-xs"
          >
            Manage All in Projects →
          </button>
        )}
      </div>

      {projectsIn360.length === 0 ? (
        <div className="rounded-2xl p-12 text-center bg-[#0B152B]/60 border border-dashed border-blue-900/60 text-blue-200/70">
          <p className="text-base text-white font-bold">No projects currently marked to display in 360° Carousel.</p>
          <p className="text-xs text-slate-400 mt-1">
            Edit any project in Portfolio Projects and enable &quot;Show in 360° Digital Solution section carousel&quot;.
          </p>
          {onNavigate && (
            <button onClick={() => onNavigate("projects")} className="btn btn-gradient btn-sm mt-4">
              Go to Portfolio Projects
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectsIn360.map((p, idx) => {
            const id = p._id || p.id || "";
            return (
              <div
                key={id}
                className="rounded-2xl overflow-hidden bg-[#0B152B]/80 border border-blue-900/60 hover:border-orange-500/50 flex flex-col justify-between transition-all duration-300 shadow-lg group"
              >
                <div>
                  {/* 16:9 Aspect Video Preview Card (Exact Main Site Parity, Not Circle) */}
                  <div className="relative aspect-video bg-[#070F1E] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="rounded-full bg-black/85 backdrop-blur-md px-2.5 py-0.5 text-xs font-black text-amber-400 border border-amber-500/30 shadow-md">
                        Slide #{idx + 1}
                      </span>
                      <span className="rounded-full bg-navy/85 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                        {p.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-gradient-to-r from-orange-600 to-orange-500 px-2.5 py-0.5 text-[10px] font-black text-black shadow-md">
                        360° Active
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-bold text-sm text-white truncate group-hover:text-amber-400 transition-colors" title={p.title}>
                      {p.title}
                    </h4>
                    <p className="text-xs text-blue-200/70 line-clamp-2 mt-1 leading-relaxed">
                      {p.description || "Project featured in the 360° carousel."}
                    </p>
                  </div>
                </div>

                {/* Footer with Sequence Reorder Controls & Actions */}
                <div className="p-3 border-t border-blue-900/40 flex items-center justify-between bg-[#070F1E]/70 gap-2">
                  {/* Arrange in Sequence Option */}
                  <div className="flex items-center gap-1 bg-[#0B152B] border border-blue-900/60 rounded-xl px-2 py-1 shadow-xs">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mr-1">Seq:</span>
                    <button
                      type="button"
                      onClick={() => handleSlideMove(idx, -1)}
                      disabled={idx === 0}
                      title="Move earlier in 360 carousel sequence"
                      className="p-1 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/5 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                    >
                      <Icon name="arrow-left" className="size-3.5" />
                    </button>
                    <span className="text-xs font-black text-amber-400 min-w-[20px] text-center">
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSlideMove(idx, 1)}
                      disabled={idx === projectsIn360.length - 1}
                      title="Move later in 360 carousel sequence"
                      className="p-1 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/5 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                    >
                      <Icon name="arrow-right" className="size-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {onView && (
                      <button
                        onClick={() => onView(p)}
                        className="inline-flex items-center gap-1 rounded-lg border border-blue-900/60 bg-[#0B152B] px-2.5 py-1 text-xs font-bold text-blue-200 hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Icon name="eye" className="size-3.5" />
                        <span>View</span>
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(p)}
                        className="p-1.5 rounded-lg text-blue-200/80 hover:bg-amber-500/10 hover:text-amber-400 transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Icon name="edit" className="size-3.5" />
                      </button>
                    )}
                    {onToggle360 && (
                      <button
                        onClick={() => onToggle360(p)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-900/40 bg-red-950/30 px-2 py-1 text-[11px] font-bold text-red-300 hover:bg-red-900/50 transition-colors cursor-pointer"
                        title="Remove from 360 Carousel (Keeps project in portfolio)"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TestimonialsTab({
  testimonials,
  onAddNew,
  onView,
  onEdit,
  onApprove,
  onReject,
  onDelete,
}: {
  testimonials: BackendTestimonial[];
  onAddNew: () => void;
  onView: (t: BackendTestimonial) => void;
  onEdit: (t: BackendTestimonial) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return testimonials;
    return testimonials.filter((t) => t.status === filter);
  }, [testimonials, filter]);

  const pendingCount = testimonials.filter((t) => t.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Client Testimonials</h2>
          <p className="text-xs text-muted-foreground">
            Approve client reviews before they appear on the public website.
          </p>
        </div>
        <button onClick={onAddNew} className="btn btn-gradient btn-sm self-start sm:self-auto">
          <Icon name="plus" className="size-4" /> Add Testimonial
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {(["all", "pending", "approved", "rejected"] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold capitalize transition-all ${
              filter === st
                ? "bg-amber-500 text-black font-extrabold shadow-md shadow-amber-500/25"
                : "border border-blue-900/60 bg-[#0B152B]/80 text-blue-200/80 hover:bg-[#0B152B] hover:text-white"
            }`}
          >
            {st}{" "}
            {st === "pending" && pendingCount > 0 ? (
              <span className="ml-1 rounded-full bg-brand px-1.5 py-0.2 text-[10px] text-white">
                {pendingCount}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Testimonials List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div
            key={t._id}
            className="rounded-2xl p-5 bg-[#0B152B]/75 border border-blue-900/60 hover:border-amber-500/50 flex flex-col justify-between transition-all duration-300 shadow-md group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    t.status === "approved"
                      ? "bg-emerald-100 text-emerald-800"
                      : t.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800 animate-pulse"
                  }`}
                >
                  {t.status}
                </span>
                <span className="text-amber-500 font-bold text-xs">★ {t.rating} / 5</span>
              </div>
              <p className="text-xs text-blue-200/80 italic leading-relaxed line-clamp-4">
                &ldquo;{t.review}&rdquo;
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan text-white text-xs font-bold">
                  {t.initials || t.name[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {t.role} {t.company ? `· ${t.company}` : ""}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-slate-50">
                <div className="flex gap-1.5">
                  {t.status !== "approved" && (
                    <button
                      onClick={() => onApprove(t._id)}
                      className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700 shadow-xs"
                    >
                      Approve
                    </button>
                  )}
                  {t.status !== "rejected" && (
                    <button
                      onClick={() => onReject(t._id)}
                      className="rounded-lg border border-blue-900/60 bg-[#070F1E] px-2.5 py-1 text-[11px] font-bold text-blue-200 hover:bg-white/10"
                    >
                      Reject
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onView(t)}
                    className="inline-flex items-center gap-1 rounded-lg border border-blue-900/60 bg-[#0B152B] px-2.5 py-1 text-xs font-semibold text-blue-200 hover:border-amber-500 hover:text-amber-400 shadow-xs transition-colors"
                    title="View full review"
                  >
                    <Icon name="eye" className="size-3.5" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onEdit(t)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-white/10 hover:text-amber-400"
                    title="Edit testimonial"
                  >
                    <Icon name="edit" className="size-4" />
                  </button>
                  <button
                    onClick={() => onDelete(t._id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Icon name="trash" className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl p-12 text-center bg-[#0B152B]/60 border border-blue-900/50 text-blue-200/70 text-sm">
          No testimonials in this category.
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 6. FOOTER & COMPANY TAB
// -------------------------------------------------------------
function FooterCompanyTab({
  settings,
  onSave,
}: {
  settings: any;
  onSave: (patch: any) => Promise<void>;
}) {
  const [form, setForm] = useState({
    name: settings.company?.name || "SOSync Ai Tech IT Solution",
    shortName: settings.company?.shortName || "SOSync Ai Tech",
    tagline: settings.company?.tagline || "",
    email: settings.company?.email || "support@sosyncaitech.in",
    phone1: settings.company?.phones?.[0] || "+91 91724 03714",
    phone2: settings.company?.phones?.[1] || "+91 70043 30655",
    addressLines: settings.company?.addressLines?.join("\n") || "",
    copyright: settings.company?.copyright || "SOSync Ai Tech IT Solution. All rights reserved.",
  });

  const save = () => {
    onSave({
      company: {
        name: form.name.trim(),
        shortName: form.shortName.trim(),
        tagline: form.tagline.trim(),
        email: form.email.trim(),
        phones: [form.phone1.trim(), form.phone2.trim()].filter(Boolean),
        addressLines: form.addressLines
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean),
        copyright: form.copyright.trim(),
      },
    });
  };

  return (
    <div className="rounded-2xl p-6 md:p-8 bg-[#0B152B]/75 border border-blue-900/60 max-w-3xl space-y-6 shadow-xl">
      <div>
        <h2 className="font-display text-xl font-bold text-white">Footer & Company Settings</h2>
        <p className="text-xs text-muted-foreground">
          Update the corporate contact information, address lines, and footer lockup across the website.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Full Legal Company Name</label>
          <input
            className="field"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Short Brand Name</label>
          <input
            className="field"
            value={form.shortName}
            onChange={(e) => setForm({ ...form, shortName: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="label">Company Tagline</label>
        <input
          className="field"
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="label">Support Email</label>
          <input
            className="field"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Primary Phone</label>
          <input
            className="field"
            value={form.phone1}
            onChange={(e) => setForm({ ...form, phone1: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Secondary Phone</label>
          <input
            className="field"
            value={form.phone2}
            onChange={(e) => setForm({ ...form, phone2: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="label">Office Address (One line per entry)</label>
        <textarea
          rows={3}
          className="field"
          value={form.addressLines}
          onChange={(e) => setForm({ ...form, addressLines: e.target.value })}
        />
      </div>

      <div>
        <label className="label">Footer Copyright Text</label>
        <input
          className="field"
          value={form.copyright}
          onChange={(e) => setForm({ ...form, copyright: e.target.value })}
        />
      </div>

      <div className="pt-2">
        <button onClick={save} className="btn btn-gradient">
          Save Footer & Company Info
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. SETTINGS TAB (Maintenance Mode Toggle & Social Media Links)
// -------------------------------------------------------------
function SettingsTab({
  settings,
  onSave,
}: {
  settings: any;
  onSave: (patch: any) => Promise<void>;
}) {
  const [maintenanceMode, setMaintenanceMode] = useState(Boolean(settings.maintenanceMode));
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    settings.maintenanceMessage ||
      "SOSync AI Tech is currently undergoing scheduled platform upgrades. We will be back online shortly."
  );
  const [savingMode, setSavingMode] = useState(false);
  const [savingMsg, setSavingMsg] = useState(false);

  useEffect(() => {
    if (settings) {
      if (settings.maintenanceMode !== undefined) {
        setMaintenanceMode(Boolean(settings.maintenanceMode));
      }
      if (settings.maintenanceMessage) {
        setMaintenanceMessage(settings.maintenanceMessage);
      }
      if (settings.social) {
        setSocial((prev) => ({ ...prev, ...settings.social }));
      }
    }
  }, [settings]);

  const [social, setSocial] = useState({
    linkedin: settings.social?.linkedin || "https://www.linkedin.com/company/sosyncaitech/posts/?feedView=all",
    twitter: settings.social?.twitter || "https://twitter.com",
    instagram: settings.social?.instagram || "https://www.instagram.com/sosyncaitech_multimediaa?obrf=MWtxODgwdGo2YWpzZg==",
    facebook: settings.social?.facebook || "https://facebook.com",
    github: settings.social?.github || "https://github.com",
    youtube: settings.social?.youtube || "https://www.youtube.com/@SOSyncAITech",
  });

  const handleToggleMaintenance = async () => {
    const nextMode = !maintenanceMode;
    setMaintenanceMode(nextMode);
    setSavingMode(true);
    try {
      await onSave({
        maintenanceMode: nextMode,
        maintenanceMessage: maintenanceMessage.trim(),
        social,
      });
    } finally {
      setSavingMode(false);
    }
  };

  const handleSaveMessage = async () => {
    setSavingMsg(true);
    try {
      await onSave({
        maintenanceMode,
        maintenanceMessage: maintenanceMessage.trim(),
        social,
      });
    } finally {
      setSavingMsg(false);
    }
  };

  const saveSettings = () => {
    onSave({
      maintenanceMode,
      maintenanceMessage: maintenanceMessage.trim(),
      social,
    });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Maintenance Mode Card */}
      <div className="rounded-2xl p-6 md:p-8 bg-[#0B152B]/75 border border-blue-900/60 space-y-5 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white">Website Maintenance Mode</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              When turned ON, public visitors are shown a maintenance screen while you maintain access to the admin panel.
            </p>
          </div>
          <button
            type="button"
            disabled={savingMode}
            onClick={handleToggleMaintenance}
            title={maintenanceMode ? "Click to turn OFF" : "Click to turn ON"}
            className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${
              maintenanceMode ? "bg-amber-500" : "bg-[#070F1E] border border-blue-900/60"
            }`}
          >
            <span
              className={`pointer-events-none inline-block size-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                maintenanceMode ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 ${
            maintenanceMode
              ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`size-2.5 rounded-full ${
                maintenanceMode ? "bg-amber-500 animate-ping" : "bg-emerald-500"
              }`}
            />
            <span>
              {maintenanceMode
                ? "Status: ACTIVE (Visitors see the Maintenance page)"
                : "Status: LIVE (Public site is fully accessible)"}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              disabled={savingMode}
              onClick={handleToggleMaintenance}
              className={`btn btn-sm text-xs font-bold cursor-pointer disabled:opacity-50 ${
                maintenanceMode
                  ? "bg-amber-600 text-white hover:bg-amber-700"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {savingMode
                ? "Updating..."
                : maintenanceMode
                ? "Turn OFF"
                : "Turn ON"}
            </button>
            <a
              href="/?preview_maintenance=true"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-blue-900/60 bg-[#070F1E] px-2.5 py-1 text-xs font-semibold text-blue-200 hover:border-amber-500 hover:text-amber-400 shadow-xs transition-colors"
            >
              Preview Screen ↗
            </a>
          </div>
        </div>

        <div>
          <label className="label">Custom Maintenance Message for Visitors</label>
          <textarea
            rows={3}
            className="field"
            value={maintenanceMessage}
            onChange={(e) => setMaintenanceMessage(e.target.value)}
          />
          <div className="mt-2.5 flex justify-end">
            <button
              type="button"
              disabled={savingMsg}
              onClick={handleSaveMessage}
              className="btn btn-secondary btn-sm text-xs"
            >
              {savingMsg ? "Updating..." : "Save Message"}
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Links Card */}
      <div className="rounded-2xl p-6 md:p-8 bg-[#0B152B]/75 border border-blue-900/60 space-y-5 shadow-xl">
        <div>
          <h3 className="font-display text-lg font-bold text-white">Social Media Links</h3>
          <p className="text-xs text-muted-foreground">
            Connect your official brand channels displayed in the footer and navbar.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">LinkedIn Profile / Company URL</label>
            <input
              className="field"
              value={social.linkedin}
              onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
              placeholder="https://www.linkedin.com/company/sosyncaitech/posts/?feedView=all"
            />
          </div>
          <div>
            <label className="label">Twitter / X URL</label>
            <input
              className="field"
              value={social.twitter}
              onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
              placeholder="https://x.com/sosyncaitech"
            />
          </div>
          <div>
            <label className="label">Instagram URL</label>
            <input
              className="field"
              value={social.instagram}
              onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
              placeholder="https://instagram.com/sosyncaitech_multimediaa"
            />
          </div>
          <div>
            <label className="label">Facebook Page URL</label>
            <input
              className="field"
              value={social.facebook}
              onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
              placeholder="https://facebook.com/sosyncaitech"
            />
          </div>
          <div>
            <label className="label">GitHub Organization URL</label>
            <input
              className="field"
              value={social.github}
              onChange={(e) => setSocial({ ...social, github: e.target.value })}
              placeholder="https://github.com/sosyncaitech"
            />
          </div>
          <div>
            <label className="label">YouTube Channel URL</label>
            <input
              className="field"
              value={(social as any).youtube || ""}
              onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
              placeholder="https://www.youtube.com/@SOSyncAITech"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-blue-900/40 flex justify-end">
          <button onClick={saveSettings} className="btn btn-gradient">
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MODALS
// -------------------------------------------------------------

/** Project Form Modal with Cloudinary Upload */
function ProjectFormModal({
  mode,
  initial,
  onClose,
  onUpload,
  onSave,
}: {
  mode: "add" | "edit";
  initial?: ProjectItem;
  onClose: () => void;
  onUpload: (file: File | string, folder?: string) => Promise<string | null>;
  onSave: (data: any) => Promise<void>;
}) {
  const STANDARD_CATEGORIES = [
    "Dynamic Portfolio",
    "Static Portfolio",
    "Ecommerce",
    "Custom Software",
  ] as const;

  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initial?.category || "Dynamic Portfolio");
  const [href, setHref] = useState(initial?.href || "");
  const [image, setImage] = useState(initial?.image || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [tags, setTags] = useState(initial?.tags ? initial.tags.join(", ") : "React, Next.js, Node.js");
  const [order, setOrder] = useState<number>(initial?.order ?? 0);
  const [showIn360, setShowIn360] = useState(initial?.showIn360 !== false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await onUpload(file, "sosync/portfolio");
      if (url) {
        setImage(url);
      }
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image || !category) {
      alert("Please provide title, category, and an image.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        title,
        category: category.trim(),
        href,
        image,
        description,
        tags: tags.split(",").map((s: string) => s.trim()).filter(Boolean),
        showIn360,
        order: Number(order) || 0,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[88vh] flex flex-col rounded-2xl bg-[#0B152B] border border-blue-900/80 shadow-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header */}
        <div className="px-5 py-3.5 border-b border-blue-900/40 bg-[#070F1E]/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-orange-500/15 text-brand">
              <Icon name={mode === "add" ? "plus" : "edit"} className="size-4" />
            </span>
            <h2 className="font-display text-base sm:text-lg font-bold text-white">
              {mode === "add" ? "Add Portfolio Project" : "Edit Project"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <Icon name="close" className="size-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={submit} className="flex-1 overflow-y-auto p-5 space-y-3.5 custom-scrollbar">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Project Title *</label>
            <input
              className="field h-10 text-xs sm:text-sm px-3.5 py-2"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Phoolrani Sarees Marketplace"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Category *</label>
              <select
                className="w-full h-10 rounded-xl border border-blue-900/70 bg-[#070F1E] px-3.5 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none transition-colors cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Dynamic Portfolio" className="bg-[#0B152B] text-white">Dynamic Portfolio</option>
                <option value="Static Portfolio" className="bg-[#0B152B] text-white">Static Portfolio</option>
                <option value="Ecommerce" className="bg-[#0B152B] text-white">Ecommerce</option>
                <option value="Custom Software" className="bg-[#0B152B] text-white">Custom Software</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Live Project URL</label>
              <input
                className="field h-10 text-xs sm:text-sm px-3.5 py-2"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Unified Compact Image & Upload Group */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-300">Project Image *</label>
              <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                16:9 or 21:10 Widescreen
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="field flex-1 h-10 text-xs sm:text-sm px-3.5 py-2"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Paste image URL or upload"
              />
              <label className="btn btn-outline btn-sm h-10 px-3.5 text-xs shrink-0 cursor-pointer flex items-center gap-1.5 font-bold hover:border-orange-500/60">
                {uploading ? (
                  <span className="size-3 rounded-full border-2 border-brand border-t-transparent animate-spin" />
                ) : (
                  <Icon name="upload" className="size-3.5" />
                )}
                <span>{uploading ? "Uploading..." : "Upload ☁️"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={handleFileUpload}
                />
              </label>
              {image && (
                <div className="size-10 rounded-lg overflow-hidden border border-blue-900/60 shrink-0 bg-[#070F1E] shadow-xs">
                  <img src={image} alt="preview" className="size-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-300 block mb-1">Technologies / Tags</label>
              <input
                className="field h-10 text-xs sm:text-sm px-3.5 py-2"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="React, Next.js, Node.js"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Sequence / Order</label>
              <input
                type="number"
                min={0}
                className="field h-10 text-xs sm:text-sm px-3.5 py-2 text-center font-bold text-amber-400"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value) || 0)}
                placeholder="1, 2, 3..."
                title="Display sequence rank (1 appears first)"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Description</label>
            <textarea
              rows={2}
              className="field text-xs sm:text-sm px-3 py-2 leading-relaxed"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the digital product, deliverables, and impact..."
            />
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <input
              type="checkbox"
              id="chk360"
              checked={showIn360}
              onChange={(e) => setShowIn360(e.target.checked)}
              className="size-4 text-brand rounded cursor-pointer"
            />
            <label htmlFor="chk360" className="text-xs font-semibold text-blue-200 cursor-pointer select-none">
              Show in 360° Carousel as well
            </label>
          </div>
        </form>

        {/* Sticky Footer */}
        <div className="px-5 py-3 border-t border-blue-900/40 bg-[#070F1E]/95 flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline btn-sm text-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={saving || uploading}
            className="btn btn-gradient btn-sm text-xs font-black shadow-lg shadow-orange-500/25 cursor-pointer"
          >
            {saving ? "Saving..." : mode === "add" ? "Create Project" : "Update Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TestimonialModal({
  mode = "add",
  initial,
  onClose,
  onSave,
}: {
  mode?: "add" | "edit";
  initial?: BackendTestimonial;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [role, setRole] = useState(initial?.role || "");
  const [company, setCompany] = useState(initial?.company || "");
  const [rating, setRating] = useState(initial?.rating || 5);
  const [review, setReview] = useState(initial?.review || "");
  const [status, setStatus] = useState(initial?.status || "approved");
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review) {
      alert("Name and review are required.");
      return;
    }
    setSaving(true);
    try {
      await onSave({ name, role, company, rating: Number(rating), review, status });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[88vh] flex flex-col rounded-2xl bg-[#0B152B] border border-blue-900/80 shadow-2xl animate-in fade-in zoom-in-95 my-auto overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 border-b border-blue-900/40 bg-[#070F1E]/90 flex items-center justify-between shrink-0">
          <h3 className="font-display text-base sm:text-lg font-bold text-white">
            {mode === "add" ? "Add New Testimonial" : "Edit Testimonial"}
          </h3>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
            <Icon name="close" className="size-4" />
          </button>
        </div>

        <form onSubmit={submit} className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Client Name *</label>
              <input
                className="field h-10 text-xs sm:text-sm px-3.5 py-2"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Rajesh Patel"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Rating</label>
              <select
                className="w-full h-10 rounded-xl border border-blue-900/70 bg-[#070F1E] px-3.5 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none transition-colors cursor-pointer"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={5} className="bg-[#0B152B] text-white">⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4} className="bg-[#0B152B] text-white">⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3} className="bg-[#0B152B] text-white">⭐⭐⭐ (3 Stars)</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Role / Designation</label>
              <input
                className="field h-10 text-xs sm:text-sm px-3.5 py-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Managing Director"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Company / Organization</label>
              <input
                className="field h-10 text-xs sm:text-sm px-3.5 py-2"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Apex Healthcare"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Review *</label>
            <textarea
              className="field text-xs sm:text-sm px-3 py-2 leading-relaxed"
              required
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Client's review or testimonial quote..."
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Status</label>
            <select
              className="w-full h-10 rounded-xl border border-blue-900/70 bg-[#070F1E] px-3.5 text-xs sm:text-sm text-white focus:border-orange-500 focus:outline-none transition-colors cursor-pointer"
              value={status}
              onChange={(e) => setStatus(e.target.value as "approved" | "pending" | "rejected")}
            >
              <option value="approved" className="bg-[#0B152B] text-white">Approved (Live on Website)</option>
              <option value="pending" className="bg-[#0B152B] text-white">Pending Approval</option>
              <option value="rejected" className="bg-[#0B152B] text-white">Rejected</option>
            </select>
          </div>
        </form>

        <div className="px-5 py-3 border-t border-blue-900/40 bg-[#070F1E]/95 flex justify-end gap-2 shrink-0">
          <button type="button" onClick={onClose} className="btn btn-outline btn-sm text-xs cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={submit} disabled={saving} className="btn btn-gradient btn-sm text-xs font-black cursor-pointer">
            {saving ? "Saving..." : mode === "add" ? "Create Testimonial" : "Update Testimonial"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectViewModal({
  project,
  onClose,
  onEdit,
  onDelete,
}: {
  project: ProjectItem;
  onClose: () => void;
  onEdit: (p: ProjectItem) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[88vh] flex flex-col rounded-2xl bg-[#0B152B] border border-blue-900/80 shadow-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 border-b border-blue-900/40 bg-[#070F1E]/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-orange-500/15 text-brand">
              <Icon name="eye" className="size-4" />
            </span>
            <h3 className="font-display text-base sm:text-lg font-bold text-white">Project Details</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <Icon name="close" className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          <div className="relative aspect-[21/10] rounded-xl overflow-hidden bg-[#070F1E] border border-blue-900/60 flex items-center justify-center shadow-md">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute top-2.5 left-2.5 flex gap-1.5">
              <span className="rounded-full bg-navy/85 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-white">
                {project.category}
              </span>
              {project.showIn360 && (
                <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-extrabold text-white">
                  360° Active
                </span>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white">{project.title}</h2>
            <p className="mt-1.5 text-xs sm:text-sm text-blue-200/80 leading-relaxed whitespace-pre-wrap">
              {project.description || "No detailed description provided."}
            </p>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Technologies</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-blue-900/60 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.href && (
            <div className="text-xs">
              <span className="text-slate-400">Live URL: </span>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="text-brand hover:underline font-semibold"
              >
                {project.href} ↗
              </a>
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-blue-900/40 bg-[#070F1E]/95 flex items-center justify-between shrink-0">
          <div>
            {onDelete && (
              <button
                onClick={() => onDelete(project._id || project.id || "")}
                className="btn btn-outline btn-sm text-xs text-red-400 hover:bg-red-500/10 hover:border-red-500/40 cursor-pointer"
              >
                <Icon name="trash" className="size-3.5" />
                Delete
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="btn btn-gradient btn-sm text-xs cursor-pointer"
            >
              <Icon name="edit" className="size-3.5" />
              Edit Project
            </button>
            <button onClick={onClose} className="btn btn-outline btn-sm text-xs cursor-pointer">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SequenceEditorModal({
  projects,
  onClose,
  onSave,
}: {
  projects: ProjectItem[];
  onClose: () => void;
  onSave: (orders: Array<{ id: string; order: number }>) => Promise<boolean | void>;
}) {
  const [items, setItems] = useState<ProjectItem[]>(() => [...projects]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const moveItem = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= items.length || fromIdx === toIdx) return;
    const next = [...items];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setItems(next);
  };

  const shiftToRank = (fromIdx: number, targetRank: number) => {
    const clampedRank = Math.max(1, Math.min(targetRank, items.length));
    const targetIdx = clampedRank - 1;
    moveItem(fromIdx, targetIdx);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    moveItem(draggedIdx, index);
    setDraggedIdx(index);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = items.map((p, idx) => ({
        id: (p._id || p.id || "") as string,
        order: idx + 1,
      }));
      await onSave(payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0B152B] border border-blue-900/80 shadow-2xl animate-in fade-in zoom-in-95 text-white my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-blue-900/40 flex items-center justify-between bg-[#070F1E]/90">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🔀</span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                Project Sequence Editor
              </h2>
              <span className="rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-black px-2.5 py-0.5 text-xs font-black">
                {items.length} Projects
              </span>
            </div>
            <p className="text-xs text-blue-200/70 mt-1">
              Drag & drop cards, use quick buttons, or enter rank numbers. Lower numbers appear first on the live website.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5 custom-scrollbar">
          {items.map((p, idx) => {
            const id = p._id || p.id || "";
            const isDragging = draggedIdx === idx;
            return (
              <div
                key={id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-3 rounded-2xl border transition-all duration-200 ${
                  isDragging
                    ? "bg-amber-500/20 border-amber-500/80 shadow-lg scale-[1.01]"
                    : "bg-[#070F1E]/80 border-blue-900/50 hover:border-amber-500/40 hover:bg-white/[0.02]"
                }`}
              >
                {/* Drag Handle & Sequence Rank */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-1.5 text-slate-400 hover:text-amber-400 cursor-grab active:cursor-grabbing rounded-lg hover:bg-white/5"
                    title="Drag to reorder"
                  >
                    <span className="text-lg font-black leading-none">⠿</span>
                  </div>

                  <div className="flex items-center gap-1 bg-[#0B152B] border border-blue-900/60 rounded-xl px-2 py-1 shadow-inner">
                    <span className="text-[10px] font-black text-slate-400 uppercase">#</span>
                    <input
                      type="number"
                      min={1}
                      max={items.length}
                      value={idx + 1}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) shiftToRank(idx, val);
                      }}
                      className="w-8 text-center font-black text-amber-400 bg-transparent outline-none text-xs cursor-text"
                      title="Type number to move"
                    />
                  </div>
                </div>

                {/* Thumbnail & Title */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-16 h-10 aspect-video rounded-lg overflow-hidden border border-blue-900/60 bg-[#0B152B] shrink-0">
                    <img src={p.image} alt={p.title} className="size-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs sm:text-sm text-white truncate" title={p.title}>
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="rounded-full bg-navy/80 px-2 py-0.2 text-[9px] font-bold text-blue-200">
                        {p.category}
                      </span>
                      {p.showIn360 && (
                        <span className="rounded-full bg-brand/20 text-brand px-1.5 py-0.2 text-[9px] font-black">
                          360°
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Movement Buttons */}
                <div className="flex items-center gap-1 ml-auto">
                  <button
                    type="button"
                    onClick={() => moveItem(idx, 0)}
                    disabled={idx === 0}
                    className="px-2 py-1 rounded-lg border border-blue-900/50 bg-[#0B152B] text-[10px] font-bold text-slate-300 hover:text-amber-400 hover:border-amber-500/50 disabled:opacity-20 cursor-pointer"
                    title="Send directly to Top (#1)"
                  >
                    Top
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(idx, idx - 1)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg border border-blue-900/50 bg-[#0B152B] text-slate-300 hover:text-amber-400 hover:border-amber-500/50 disabled:opacity-20 cursor-pointer"
                    title="Move Up 1 step"
                  >
                    <Icon name="arrow-up" className="size-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(idx, idx + 1)}
                    disabled={idx === items.length - 1}
                    className="p-1.5 rounded-lg border border-blue-900/50 bg-[#0B152B] text-slate-300 hover:text-amber-400 hover:border-amber-500/50 disabled:opacity-20 cursor-pointer"
                    title="Move Down 1 step"
                  >
                    <Icon name="arrow-down" className="size-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(idx, items.length - 1)}
                    disabled={idx === items.length - 1}
                    className="px-2 py-1 rounded-lg border border-blue-900/50 bg-[#0B152B] text-[10px] font-bold text-slate-300 hover:text-amber-400 hover:border-amber-500/50 disabled:opacity-20 cursor-pointer"
                    title="Send to Bottom"
                  >
                    End
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-blue-900/40 flex items-center justify-between bg-[#070F1E]/90 gap-3">
          <button
            type="button"
            onClick={() => setItems([...projects])}
            className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer px-3 py-1.5"
          >
            Reset Order
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="btn btn-outline btn-sm text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn btn-gradient btn-sm text-xs font-black shadow-lg shadow-orange-500/30 cursor-pointer"
            >
              {saving ? "Saving All..." : "Save All Sequences"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


/** Testimonial View Details Modal */
function TestimonialViewModal({
  testimonial,
  onClose,
  onEdit,
  onApprove,
  onReject,
  onDelete,
}: {
  testimonial: BackendTestimonial;
  onClose: () => void;
  onEdit: (t: BackendTestimonial) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[88vh] flex flex-col rounded-3xl bg-[#0B152B] border border-blue-900/80 shadow-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-blue-900/40 p-4 sm:p-5 bg-[#0B152B] shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Icon name="eye" className="size-4" />
            </span>
            <h3 className="font-display text-base sm:text-lg font-bold text-white">Review Details</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          <div className="flex items-center justify-between">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                testimonial.status === "approved"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : testimonial.status === "rejected"
                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
              }`}
            >
              Status: {testimonial.status}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
              <span className="ml-1 text-xs text-slate-400">({testimonial.rating} / 5)</span>
            </div>
          </div>

          <div className="rounded-2xl bg-[#070F1E] p-4 sm:p-5 border border-blue-900/60 text-white">
            <p className="text-sm italic leading-relaxed text-blue-100 whitespace-pre-wrap">
              &ldquo;{testimonial.review}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-3.5 pt-1">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan text-white text-base font-bold shadow-md">
              {testimonial.initials || testimonial.name[0]}
            </span>
            <div>
              <h4 className="font-display text-base font-bold text-white">{testimonial.name}</h4>
              <p className="text-xs text-blue-200/70">
                {testimonial.role ? testimonial.role : "Client"}
                {testimonial.company ? ` · ${testimonial.company}` : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 sm:p-5 border-t border-blue-900/40 bg-[#070F1E]/80 shrink-0">
          <div className="flex gap-2">
            {testimonial.status !== "approved" && (
              <button
                type="button"
                onClick={() => {
                  onApprove(testimonial._id);
                  onClose();
                }}
                className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                Approve Review
              </button>
            )}
            {testimonial.status !== "rejected" && (
              <button
                type="button"
                onClick={() => {
                  onReject(testimonial._id);
                  onClose();
                }}
                className="btn btn-sm btn-outline text-xs font-bold"
              >
                Reject Review
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(testimonial);
              }}
              className="btn btn-gradient btn-sm text-xs"
            >
              <Icon name="edit" className="size-3.5" /> Edit
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onDelete(testimonial._id);
              }}
              className="p-2 rounded-lg text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
              title="Delete"
            >
              <Icon name="trash" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
