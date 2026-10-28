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
  | "enquiries"
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

  const [slideModal, setSlideModal] = useState<{
    open: boolean;
    mode: "add" | "edit";
    item?: Story360Item;
  }>({ open: false, mode: "add" });

  // View Details Modals state
  const [viewProject, setViewProject] = useState<ProjectItem | null>(null);
  const [viewTestimonial, setViewTestimonial] = useState<BackendTestimonial | null>(null);
  const [viewSlide, setViewSlide] = useState<Story360Item | null>(null);

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

  const unreadEnquiries = data.enquiries.filter((e) => !e.read).length;
  const pendingTestimonials = allAdminTestimonials.filter((t) => t.status === "pending").length;

  const NAV_ITEMS: { id: AdminTab; label: string; icon: string; badge?: number }[] = [
    { id: "overview", label: "Overview", icon: "dashboard" },
    { id: "projects", label: "Portfolio Projects", icon: "briefcase" },
    { id: "story360", label: "360° Digital Solution", icon: "sparkles" },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: "quote",
      badge: pendingTestimonials > 0 ? pendingTestimonials : undefined,
    },
    {
      id: "enquiries",
      label: "Inquiries",
      icon: "mail",
      badge: unreadEnquiries > 0 ? unreadEnquiries : undefined,
    },
    { id: "footer", label: "Footer & Company", icon: "pin" },
    { id: "settings", label: "Settings & Maintenance", icon: "settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[999] flex items-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 shadow-xl border border-white/10 animate-in fade-in slide-in-from-top-4">
          <span className="size-2 rounded-full bg-success" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="hidden w-64 shrink-0 flex-col bg-navy p-5 text-white lg:flex border-r border-navy-soft">
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
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "text-slate-300 hover:bg-navy-soft hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name={n.icon} className="size-4" />
                <span>{n.label}</span>
              </div>
              {n.badge ? (
                <span className="rounded-full bg-brand-deep px-2 py-0.5 text-xs font-bold text-white">
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
                : "bg-navy-soft/60 border-white/10 hover:bg-navy-soft text-slate-300 hover:text-white"
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
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-xs">
          <div className="flex items-center gap-3 lg:hidden">
            <select
              className="field text-sm font-semibold py-1.5"
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
            <h1 className="font-display text-xl font-bold text-foreground">
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
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
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
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-brand transition-all"
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
              slides360Count={admin360Slides.length}
              enquiriesCount={data.enquiries.length}
              unreadEnquiries={unreadEnquiries}
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
            <Story360Tab
              slides={admin360Slides}
              projects={projects}
              onNavigate={setTab}
              onAddNew={() => setSlideModal({ open: true, mode: "add" })}
              onView={(s) => setViewSlide(s)}
              onToggleActive={async (slide) => {
                const ok = await update360Slide(slide._id, { active: !slide.active });
                if (ok) showToast(`Slide marked ${!slide.active ? "Active" : "Inactive"}`);
              }}
              onDelete={async (id) => {
                if (window.confirm("Are you sure you want to delete this 360 showcase image?")) {
                  const ok = await delete360Slide(id);
                  if (ok) showToast("Slide deleted");
                }
              }}
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

          {tab === "enquiries" && (
            <EnquiriesTab
              enquiries={data.enquiries}
              onToggleRead={async (id, read) => {
                const ok = await markEnquiryRead(id, read);
                if (ok) showToast(read ? "Marked as Read" : "Marked as Unread");
              }}
              onDelete={async (id) => {
                if (confirm("Delete this inquiry?")) {
                  const ok = await deleteEnquiry(id);
                  if (ok) showToast("Inquiry deleted");
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
              ok = await updateProject(id, data);
              if (ok) showToast("Project Updated successfully!");
            }
            if (ok) setProjectModal({ open: false, mode: "add" });
          }}
        />
      )}

      {/* 360 Slide Add Modal */}
      {slideModal.open && (
        <Slide360Modal
          onClose={() => setSlideModal({ open: false, mode: "add" })}
          onUpload={uploadImage}
          onSave={async (data) => {
            const ok = await create360Slide(data);
            if (ok) {
              showToast("New image added to 360 Digital Solution section!");
              setSlideModal({ open: false, mode: "add" });
            }
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

      {/* 360 Slide View Modal */}
      {viewSlide && (
        <Slide360ViewModal
          slide={viewSlide}
          onClose={() => setViewSlide(null)}
          onToggleActive={async (slide) => {
            const ok = await update360Slide(slide._id, { active: !slide.active });
            if (ok) {
              showToast(`Slide marked ${!slide.active ? "Active" : "Inactive"}`);
              setViewSlide((prev) => (prev ? { ...prev, active: !prev.active } : null));
            }
          }}
          onDelete={async (id) => {
            if (confirm("Delete this 360 showcase image?")) {
              const ok = await delete360Slide(id);
              if (ok) {
                showToast("Slide deleted");
                setViewSlide(null);
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
  enquiriesCount,
  unreadEnquiries,
  maintenanceMode,
  onNavigate,
  onToggleMaintenance,
  togglingMaintenance,
}: {
  projectsCount: number;
  testimonialsCount: number;
  pendingTestimonials: number;
  slides360Count: number;
  enquiriesCount: number;
  unreadEnquiries: number;
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
      title: "Testimonials",
      value: testimonialsCount,
      sub: pendingTestimonials > 0 ? `${pendingTestimonials} pending approval` : "All approved",
      badge: pendingTestimonials > 0 ? "Action Required" : undefined,
      tab: "testimonials" as AdminTab,
      icon: "quote",
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "360° Digital Solution",
      value: slides360Count,
      sub: "Showcase & project slides",
      tab: "story360" as AdminTab,
      icon: "sparkles",
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Client Inquiries",
      value: enquiriesCount,
      sub: unreadEnquiries > 0 ? `${unreadEnquiries} unread inquiries` : "All read",
      badge: unreadEnquiries > 0 ? "New" : undefined,
      tab: "enquiries" as AdminTab,
      icon: "mail",
      color: "from-emerald-600 to-teal-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Maintenance alert if active */}
      {maintenanceMode && (
        <div className="rounded-2xl bg-amber-500/15 border border-amber-500/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-amber-500 animate-ping shrink-0" />
            <div>
              <h3 className="font-bold text-amber-900 text-sm">Maintenance Mode is ON</h3>
              <p className="text-xs text-amber-800">
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
            className="card-soft text-left p-6 flex flex-col justify-between hover:shadow-elegant transition-all bg-white"
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
              <div className="font-display text-3xl font-extrabold text-foreground">{c.value}</div>
              <div className="text-sm font-bold text-slate-800 mt-1">{c.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{c.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Action Bar */}
      <div className="card-soft p-6 bg-white">
        <h3 className="font-display text-base font-bold text-foreground mb-4">Quick Management</h3>
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
            <Icon name="sparkles" className="size-4" /> Manage 360 Images
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
}: {
  projects: ProjectItem[];
  onAddNew: () => void;
  onView: (p: ProjectItem) => void;
  onEdit: (p: ProjectItem) => void;
  onDelete: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const categories = useMemo(() => {
    const list = projects.map((p) => (p.category || "").trim()).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const pCat = (p.category || "").trim().toLowerCase();
      const fCat = catFilter.trim().toLowerCase();
      const matchCat = catFilter === "All" || pCat === fCat;
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [projects, catFilter, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-bold text-foreground">Portfolio Projects</h2>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {projects.length} Total
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage projects shown on the portfolio page and the 360° Digital Solution section.
          </p>
        </div>
        <button onClick={onAddNew} className="btn btn-gradient btn-sm self-start sm:self-auto">
          <Icon name="plus" className="size-4" /> Add Project
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative flex-1 min-w-[200px]">
          <Icon name="search" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            className="field pl-9 text-xs sm:text-sm"
            placeholder="Search projects by title, tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="field max-w-[180px] text-xs sm:text-sm"
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

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const id = p._id || p.id || "";
          return (
            <div
              key={id}
              className="card-soft overflow-hidden flex flex-col justify-between bg-white border border-slate-200"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-navy/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-white">
                      {p.category}
                    </span>
                  </div>
                  {p.showIn360 && (
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-extrabold text-white">
                        360° Active
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-foreground text-base line-clamp-1">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {p.description || "No description provided."}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
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
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onView(p)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-brand hover:text-brand shadow-xs transition-colors"
                    title="View full project details"
                  >
                    <Icon name="eye" className="size-3.5" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onEdit(p)}
                    className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-brand"
                    title="Edit project"
                  >
                    <Icon name="edit" className="size-4" />
                  </button>
                  <button
                    onClick={() => onDelete(id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
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

      {filtered.length === 0 && (
        <div className="card-soft p-12 text-center bg-white text-muted-foreground text-sm">
          No projects found. Click &quot;Add Project&quot; to create your first one!
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 3. 360° DIGITAL SOLUTION SECTION TAB
// -------------------------------------------------------------
function Story360Tab({
  slides,
  projects = [],
  onNavigate,
  onAddNew,
  onView,
  onToggleActive,
  onDelete,
}: {
  slides: Story360Item[];
  projects?: ProjectItem[];
  onNavigate?: (t: AdminTab) => void;
  onAddNew: () => void;
  onView: (s: Story360Item) => void;
  onToggleActive: (slide: Story360Item) => void;
  onDelete: (id: string) => void;
}) {
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

  const hasAdminProjects = projects.some((p) => {
    const t = (p.title || "").trim().toLowerCase();
    return !INITIAL_PROJECT_TITLES.has(t);
  });

  const projectsIn360 = projects.filter((p) => {
    if (p.showIn360 === false) return false;
    const t = (p.title || "").trim().toLowerCase();
    if (hasAdminProjects && INITIAL_PROJECT_TITLES.has(t)) return false;
    return Boolean(p.image);
  });

  // Filter out any default placeholder template assets (/about-story-slide-)
  const customSlides = slides.filter((s) => s.src && !s.src.startsWith("/about-story-slide-"));
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">
            360° Digital Solution Section Images
          </h2>
          <p className="text-xs text-muted-foreground">
            Manage the circular image carousel in the &quot;About Us / 360° Digital Solution&quot; section on the homepage and portfolio.
          </p>
        </div>
        <button onClick={onAddNew} className="btn btn-gradient btn-sm self-start sm:self-auto">
          <Icon name="plus" className="size-4" /> Add 360 Image
        </button>
      </div>

      {/* Custom 360 Slides Added by Admin */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <span>Custom Images Added in 360 Section ({customSlides.length})</span>
        </h3>
        {customSlides.length === 0 ? (
          <div className="card-soft p-8 bg-white border border-dashed border-slate-300 text-center rounded-2xl">
            <p className="text-sm text-slate-500 font-medium">No custom 360 images added yet.</p>
            <p className="text-xs text-slate-400 mt-1">Upload images specifically for the circular 360° showcase carousel.</p>
            <button onClick={onAddNew} className="btn btn-gradient btn-sm mt-4">
              <Icon name="plus" className="size-4" /> Add 360 Image Now
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {customSlides.map((s) => (
              <div
                key={s._id}
                className="card-soft overflow-hidden bg-white border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square bg-slate-100 overflow-hidden flex items-center justify-center p-3">
                    <div className="relative size-full rounded-full overflow-hidden border-4 border-slate-200 shadow-inner">
                      <img src={s.src} alt={s.alt} className="size-full object-cover" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => onToggleActive(s)}
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-xs cursor-pointer ${
                          s.active !== false
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-300 text-slate-700"
                        }`}
                      >
                        {s.active !== false ? "Active in 360" : "Inactive"}
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-foreground truncate">
                      {s.title || "Custom 360 Slide"}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{s.alt}</p>
                  </div>
                </div>

                <div className="p-3 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                  <span className="text-[11px] text-slate-400">Order: {s.order || 0}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onView(s)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:border-brand hover:text-brand shadow-xs"
                    >
                      <Icon name="eye" className="size-3.5" /> View
                    </button>
                    <button
                      onClick={() => onDelete(s._id)}
                      className="text-xs text-red-600 hover:bg-rose-50 p-1 rounded-md flex items-center gap-1 cursor-pointer"
                      title="Remove image"
                    >
                      <Icon name="trash" className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects Displayed in 360 Section */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Projects Displayed in 360° Carousel ({projectsIn360.length})
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              These project images show in the 360° circular carousel because &quot;Show in 360°&quot; is active.
            </p>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate("projects")}
              className="btn btn-outline btn-sm text-xs"
            >
              Manage in Projects →
            </button>
          )}
        </div>

        {projectsIn360.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No projects currently marked to display in 360° carousel.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projectsIn360.map((p) => (
              <div
                key={p._id || p.id}
                className="card-soft overflow-hidden bg-white border border-slate-200 flex items-center gap-3 p-3 rounded-2xl"
              >
                <div className="size-14 rounded-full overflow-hidden shrink-0 border-2 border-brand/30">
                  <img src={p.image} alt={p.title} className="size-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-foreground truncate">{p.title}</h4>
                  <span className="inline-block mt-0.5 rounded-full bg-brand/10 text-brand px-2 py-0.5 text-[10px] font-bold">
                    360° Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. TESTIMONIALS TAB (Approve / Reject / CRUD)
// -------------------------------------------------------------
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
          <h2 className="font-display text-xl font-bold text-foreground">Client Testimonials</h2>
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
                ? "bg-slate-900 text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
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
            className="card-soft p-5 bg-white border border-slate-200 flex flex-col justify-between"
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
              <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-4">
                &ldquo;{t.review}&rdquo;
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan text-white text-xs font-bold">
                  {t.initials || t.name[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-foreground truncate">{t.name}</h4>
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
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-100"
                    >
                      Reject
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onView(t)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-brand hover:text-brand shadow-xs transition-colors"
                    title="View full review"
                  >
                    <Icon name="eye" className="size-3.5" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onEdit(t)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-brand"
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
        <div className="card-soft p-12 text-center bg-white text-muted-foreground text-sm">
          No testimonials in this category.
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 5. INQUIRIES TAB
// -------------------------------------------------------------
function EnquiriesTab({
  enquiries,
  onToggleRead,
  onDelete,
}: {
  enquiries: Array<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
    date: string;
    read: boolean;
  }>;
  onToggleRead: (id: string, read: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Client Inquiries</h2>
        <p className="text-xs text-muted-foreground">
          Inquiries submitted via the Contact form are stored here and emailed via Nodemailer.
        </p>
      </div>

      <div className="card-soft divide-y divide-slate-100 overflow-hidden bg-white border border-slate-200">
        {enquiries.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">No inquiries received yet.</div>
        )}
        {enquiries.map((e) => (
          <div key={e.id} className="p-5 transition-colors hover:bg-slate-50/70">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`size-2.5 rounded-full ${
                    !e.read ? "bg-brand animate-pulse" : "bg-slate-300"
                  }`}
                  title={!e.read ? "Unread" : "Read"}
                />
                <div>
                  <h4 className="font-bold text-sm text-foreground">
                    {e.subject} <span className="font-normal text-slate-500">— {e.name}</span>
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {e.email} {e.phone ? `· ${e.phone}` : ""} · {e.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setOpenId(openId === e.id ? null : e.id);
                    if (!e.read) onToggleRead(e.id, true);
                  }}
                  className="btn btn-outline btn-sm text-xs py-1"
                >
                  <Icon name="eye" className="size-3.5" /> {openId === e.id ? "Hide" : "View"}
                </button>
                <button
                  onClick={() => onToggleRead(e.id, !e.read)}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  {e.read ? "Mark unread" : "Mark read"}
                </button>
                <button
                  onClick={() => onDelete(e.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600"
                  title="Delete"
                >
                  <Icon name="trash" className="size-4" />
                </button>
              </div>
            </div>

            {openId === e.id && (
              <div className="mt-4 rounded-2xl bg-slate-50 p-5 border border-slate-200/80 text-xs sm:text-sm space-y-3 animate-in fade-in">
                <div className="grid sm:grid-cols-2 gap-2 text-slate-600 pb-2 border-b border-slate-200">
                  <p>
                    <strong>Company:</strong> {e.company || "Not specified"}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {e.phone ? (
                      <a href={`tel:${e.phone}`} className="text-brand hover:underline">
                        {e.phone}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>
                <div>
                  <strong className="block text-slate-700 mb-1">Message Content:</strong>
                  <p className="whitespace-pre-wrap text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                    {e.message}
                  </p>
                </div>
                <div className="pt-2 flex gap-2">
                  <a
                    href={`mailto:${e.email}?subject=Re: ${encodeURIComponent(e.subject)}`}
                    className="btn btn-gradient btn-sm text-xs"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
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
    phone2: settings.company?.phones?.[1] || "+91 80103 40822",
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
    <div className="card-soft p-6 md:p-8 bg-white border border-slate-200 max-w-3xl space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Footer & Company Settings</h2>
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
    linkedin: settings.social?.linkedin || "https://linkedin.com",
    twitter: settings.social?.twitter || "https://twitter.com",
    instagram: settings.social?.instagram || "https://instagram.com",
    facebook: settings.social?.facebook || "https://facebook.com",
    github: settings.social?.github || "https://github.com",
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
      <div className="card-soft p-6 md:p-8 bg-white border border-slate-200 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">Website Maintenance Mode</h3>
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
              maintenanceMode ? "bg-amber-500" : "bg-slate-300"
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
              ? "bg-amber-50 border-amber-200 text-amber-900"
              : "bg-emerald-50 border-emerald-200 text-emerald-900"
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
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-brand hover:text-brand shadow-xs transition-colors"
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
      <div className="card-soft p-6 md:p-8 bg-white border border-slate-200 space-y-5">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">Social Media Links</h3>
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
              placeholder="https://linkedin.com/company/sosync-ai-tech"
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
              placeholder="https://instagram.com/sosyncaitech"
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
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
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
    "Websites",
    "ERP",
    "CRM",
    "AI Projects",
    "Mobile Apps",
    "Graphic Design",
    "Branding",
    "E-Commerce",
    "E-Learning",
  ];

  const initialIsCustom = Boolean(initial?.category && !STANDARD_CATEGORIES.includes(initial.category));
  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initialIsCustom ? "Custom" : (initial?.category || "Websites"));
  const [customCategory, setCustomCategory] = useState(initialIsCustom ? (initial?.category || "") : "");
  const [href, setHref] = useState(initial?.href || "");
  const [image, setImage] = useState(initial?.image || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [tags, setTags] = useState(initial?.tags ? initial.tags.join(", ") : "React, Next.js, Node.js");
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
    const effectiveCategory = category === "Custom" ? customCategory.trim() : category.trim();
    if (!title || !image || !effectiveCategory) {
      alert("Please provide title, category, and an image.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        title,
        category: effectiveCategory,
        href,
        image,
        description,
        tags: tags.split(",").map((s: string) => s.trim()).filter(Boolean),
        showIn360,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="card-soft w-full max-w-xl p-6 sm:p-8 bg-white my-8 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="font-display text-xl font-bold text-foreground">
            {mode === "add" ? "Add New Portfolio Project" : "Edit Project"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div>
            <label className="label">Project Title *</label>
            <input
              className="field"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Phoolrani Sarees Marketplace"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Category *</label>
              <select
                className="field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Websites">Websites</option>
                <option value="ERP">ERP</option>
                <option value="CRM">CRM</option>
                <option value="AI Projects">AI Projects</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Branding">Branding</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="E-Learning">E-Learning</option>
                <option value="Custom">+ Custom / Other Category</option>
              </select>
              {category === "Custom" && (
                <input
                  className="field mt-2"
                  placeholder="Enter custom category name..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  required
                />
              )}
            </div>
            <div>
              <label className="label">Live Project URL</label>
              <input
                className="field"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Image & Cloudinary Upload */}
          <div>
            <label className="label">Project Image *</label>
            <div className="flex gap-2">
              <input
                className="field flex-1"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL or upload below"
              />
            </div>

            <div className="mt-2.5 flex items-center gap-3">
              <label className="btn btn-outline btn-sm cursor-pointer text-xs font-semibold py-1.5">
                {uploading ? (
                  <span className="flex items-center gap-1.5">
                    <span className="size-3 rounded-full border-2 border-brand border-t-transparent animate-spin" />
                    Uploading to Cloudinary...
                  </span>
                ) : (
                  "Upload File to Cloudinary ☁️"
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={handleFileUpload}
                />
              </label>
              {image && (
                <div className="size-10 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                  <img src={image} alt="preview" className="size-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="label">Technologies / Tags (Comma separated)</label>
            <input
              className="field"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, Next.js, Node.js, Express.js, MongoDB"
            />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              rows={3}
              className="field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the digital product, deliverables, and impact..."
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="chk360"
              checked={showIn360}
              onChange={(e) => setShowIn360(e.target.checked)}
              className="size-4 text-brand rounded"
            />
            <label htmlFor="chk360" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Show in 360° Digital Solution section carousel as well
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="btn btn-gradient btn-sm">
              {saving ? "Saving..." : mode === "add" ? "Create Project" : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** 360 Slide Upload Modal */
function Slide360Modal({
  onClose,
  onUpload,
  onSave,
}: {
  onClose: () => void;
  onUpload: (file: File | string, folder?: string) => Promise<string | null>;
  onSave: (data: any) => Promise<void>;
}) {
  const [src, setSrc] = useState("");
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await onUpload(file, "sosync/story360");
      if (url) setSrc(url);
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!src) {
      alert("Please upload or enter an image URL.");
      return;
    }
    setSaving(true);
    try {
      await onSave({ src, title, alt: alt || title || "SOSync 360 Showcase" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="card-soft w-full max-w-md max-h-[90vh] overflow-y-auto p-5 sm:p-6 bg-white animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-display text-lg font-bold">Add 360° Section Image</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-4">
          <div>
            <label className="label">Slide Title</label>
            <input
              className="field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI Technology Labs"
            />
          </div>

          <div>
            <label className="label">Image URL / Cloudinary Upload *</label>
            <input
              className="field"
              required
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              placeholder="Image URL or upload below"
            />
            <div className="mt-2.5 flex items-center gap-3">
              <label className="btn btn-outline btn-sm cursor-pointer text-xs font-semibold py-1.5">
                {uploading ? "Uploading..." : "Upload from Device ☁️"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={handleFileUpload}
                />
              </label>
              {src && (
                <div className="size-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <img src={src} alt="preview" className="size-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="btn btn-gradient btn-sm">
              {saving ? "Adding..." : "Add to 360 Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** Testimonial Modal (Add or Edit) */
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="card-soft w-full max-w-lg p-6 bg-white animate-in fade-in zoom-in-95 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-display text-lg font-bold">
            {mode === "add" ? "Add New Testimonial" : "Edit Testimonial"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Client Name *</label>
              <input
                className="field"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Rajesh Patel"
              />
            </div>
            <div>
              <label className="label">Rating</label>
              <select
                className="field"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3}>⭐⭐⭐ (3 Stars)</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Role / Designation</label>
              <input
                className="field"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Founder & CEO"
              />
            </div>
            <div>
              <label className="label">Company / Organization</label>
              <input
                className="field"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Karyon Group"
              />
            </div>
          </div>

          <div>
            <label className="label">Approval Status</label>
            <select
              className="field"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="approved">Approved (Visible on Website)</option>
              <option value="pending">Pending Review</option>
              <option value="rejected">Rejected (Hidden)</option>
            </select>
          </div>

          <div>
            <label className="label">Review / Feedback *</label>
            <textarea
              rows={4}
              required
              className="field"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did the client say about working with SOSync AI Tech?"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn btn-gradient btn-sm">
              {saving ? "Saving..." : mode === "add" ? "Add & Approve Testimonial" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** Project View Details Modal */
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="card-soft w-full max-w-2xl p-6 sm:p-8 bg-white my-8 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Icon name="eye" className="size-4" />
            </span>
            <h3 className="font-display text-lg font-bold text-foreground">Project Details</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="rounded-full bg-navy/85 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
                {project.category}
              </span>
              {project.showIn360 && (
                <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-extrabold text-white">
                  360° Active
                </span>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">{project.title}</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
              {project.description || "No detailed description provided."}
            </p>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Technologies & Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Live Website URL</span>
              {project.href && project.href !== "#" ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand hover:underline mt-0.5 inline-block truncate max-w-full"
                >
                  {project.href} ↗
                </a>
              ) : (
                <span className="text-slate-500 mt-0.5 block">Not specified</span>
              )}
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Database Document ID</span>
              <span className="font-mono text-slate-600 mt-0.5 block truncate">
                {project._id || project.id || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {project.href && project.href !== "#" ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm text-xs"
              >
                Open Live Site ↗
              </a>
            ) : <div />}
            <div className="flex gap-2">
              {onDelete && (
                <button
                  onClick={() => onDelete(project._id || project.id || "")}
                  className="btn btn-sm text-xs text-rose-600 hover:bg-rose-50 border border-rose-200"
                >
                  <Icon name="trash" className="size-3.5" /> Delete
                </button>
              )}
              <button
                onClick={() => {
                  onClose();
                  onEdit(project);
                }}
                className="btn btn-gradient btn-sm text-xs"
              >
                <Icon name="edit" className="size-3.5" /> Edit Project
              </button>
              <button onClick={onClose} className="btn btn-secondary btn-sm text-xs">
                Close
              </button>
            </div>
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
        className="card-soft w-full max-w-lg p-6 sm:p-8 bg-white my-8 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Icon name="eye" className="size-4" />
            </span>
            <h3 className="font-display text-lg font-bold text-foreground">Review Details</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <div className="flex items-center justify-between">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                testimonial.status === "approved"
                  ? "bg-emerald-100 text-emerald-800"
                  : testimonial.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-amber-100 text-amber-800 animate-pulse"
              }`}
            >
              Status: {testimonial.status}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
              {[...Array(testimonial.rating || 5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
              <span className="ml-1 text-xs text-slate-500">({testimonial.rating} / 5)</span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
            <p className="text-sm italic leading-relaxed text-slate-800 whitespace-pre-wrap">
              &ldquo;{testimonial.review}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-3.5 pt-2">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-cyan text-white text-base font-bold shadow-md">
              {testimonial.initials || testimonial.name[0]}
            </span>
            <div>
              <h4 className="font-display text-base font-bold text-foreground">{testimonial.name}</h4>
              <p className="text-xs text-muted-foreground">
                {testimonial.role ? testimonial.role : "Client"}
                {testimonial.company ? ` · ${testimonial.company}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex gap-2">
              {testimonial.status !== "approved" && (
                <button
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
                onClick={() => {
                  onClose();
                  onEdit(testimonial);
                }}
                className="btn btn-gradient btn-sm text-xs"
              >
                <Icon name="edit" className="size-3.5" /> Edit
              </button>
              <button
                onClick={() => {
                  onClose();
                  onDelete(testimonial._id);
                }}
                className="p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                title="Delete"
              >
                <Icon name="trash" className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 360 Slide View Details Modal */
function Slide360ViewModal({
  slide,
  onClose,
  onToggleActive,
  onDelete,
}: {
  slide: Story360Item;
  onClose: () => void;
  onToggleActive: (slide: Story360Item) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="card-soft w-full max-w-md p-6 bg-white animate-in fade-in zoom-in-95 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-display text-lg font-bold">360° Slide Preview</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-center">
          <div className="relative size-60 mx-auto rounded-full overflow-hidden border-4 border-brand/40 shadow-lg">
            <img src={slide.src} alt={slide.alt} className="size-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-base text-foreground">{slide.title || "Showcase Slide"}</h4>
            <p className="text-xs text-muted-foreground mt-1">{slide.alt}</p>
          </div>
          <div className="flex justify-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                slide.active !== false ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
              }`}
            >
              {slide.active !== false ? "Active in Carousel" : "Inactive"}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                onToggleActive(slide);
                onClose();
              }}
              className="btn btn-outline btn-sm text-xs"
            >
              {slide.active !== false ? "Deactivate" : "Activate"}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onDelete(slide._id);
                  onClose();
                }}
                className="btn btn-sm text-xs text-rose-600 hover:bg-rose-50"
              >
                Delete
              </button>
              <button onClick={onClose} className="btn btn-secondary btn-sm text-xs">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
