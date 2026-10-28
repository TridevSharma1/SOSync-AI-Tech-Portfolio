"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { defaultSiteData } from "@/data";
import { PROJECTS as initialProjects } from "@/data/initialProjects";
import type { Enquiry, ListKey, SiteData, Testimonial } from "@/data/types";

export interface ProjectItem {
  _id?: string;
  id?: string;
  title: string;
  href: string;
  image: string;
  category: string;
  description: string;
  tags: string[];
  showIn360?: boolean;
  order?: number;
}

export interface Story360Item {
  _id: string;
  src: string;
  alt: string;
  title: string;
  active?: boolean;
  order?: number;
  isProject?: boolean;
  projectHref?: string;
}

export interface BackendTestimonial {
  _id: string;
  id?: string;
  name: string;
  company: string;
  role: string;
  initials: string;
  rating: number;
  review: string;
  status: "approved" | "pending" | "rejected";
  featured?: boolean;
  createdAt?: string;
}

export interface SiteSettingsState {
  maintenanceMode: boolean;
  maintenanceMessage: string;
  social: {
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    github: string;
  };
  company: {
    name: string;
    shortName: string;
    tagline: string;
    email: string;
    phones: string[];
    addressLines: string[];
    copyright?: string;
  };
}

interface SiteDataContextValue {
  data: SiteData;
  projects: ProjectItem[];
  testimonials: BackendTestimonial[];
  allAdminTestimonials: BackendTestimonial[];
  story360Slides: Story360Item[];
  admin360Slides: Story360Item[];
  settings: SiteSettingsState;
  isAdmin: boolean;
  authReady: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  // Project CRUD
  createProject: (project: Omit<ProjectItem, "_id" | "id">) => Promise<boolean>;
  updateProject: (id: string, patch: Partial<ProjectItem>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  // Testimonials
  approveTestimonial: (id: string, status: "approved" | "pending" | "rejected") => Promise<boolean>;
  updateTestimonial: (id: string, patch: Partial<BackendTestimonial>) => Promise<boolean>;
  createTestimonial: (t: Partial<BackendTestimonial>) => Promise<boolean>;
  deleteTestimonial: (id: string) => Promise<boolean>;
  // 360 Section
  create360Slide: (slide: { src: string; alt?: string; title?: string; active?: boolean }) => Promise<boolean>;
  update360Slide: (id: string, patch: Partial<Story360Item>) => Promise<boolean>;
  delete360Slide: (id: string) => Promise<boolean>;
  // Settings & Footer
  updateSettings: (patch: Partial<SiteSettingsState>) => Promise<boolean>;
  // Image Upload (Cloudinary)
  uploadImage: (file: File | string, folder?: string) => Promise<string | null>;
  // Enquiries
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "date" | "read">) => Promise<boolean>;
  markEnquiryRead: (id: string, read: boolean) => Promise<boolean>;
  deleteEnquiry: (id: string) => Promise<boolean>;
  refreshAllData: () => Promise<void>;
  // Backward compatibility with previous admin tabs
  updateSingleton: <K extends "company" | "social" | "hero">(key: K, value: Partial<SiteData[K]>) => void;
  addItem: (key: ListKey, item: Record<string, unknown> & { id?: string }) => void;
  updateItem: (key: ListKey, id: string, patch: Record<string, unknown>) => void;
  removeItem: (key: ListKey, id: string) => void;
  resetData: () => void;
}

const defaultSettings: SiteSettingsState = {
  maintenanceMode: false,
  maintenanceMessage: "SOSync AI Tech is currently undergoing scheduled maintenance. We'll be back online shortly.",
  social: defaultSiteData.social,
  company: {
    name: defaultSiteData.company.name,
    shortName: defaultSiteData.company.shortName,
    tagline: defaultSiteData.company.tagline,
    email: defaultSiteData.company.email,
    phones: defaultSiteData.company.phones,
    addressLines: defaultSiteData.company.addressLines,
    copyright: "SOSync Ai Tech IT Solution. All rights reserved.",
  },
};

const fallbackProjectsList: ProjectItem[] = initialProjects.map((p, idx) => ({
  id: `proj-initial-${idx}`,
  _id: `proj-initial-${idx}`,
  title: p.title,
  href: p.href,
  image: p.image,
  category: p.category,
  description: p.description,
  tags: p.tags,
  showIn360: true,
  order: idx,
}));

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjectsList);
  const [testimonials, setTestimonials] = useState<BackendTestimonial[]>([]);
  const [allAdminTestimonials, setAllAdminTestimonials] = useState<BackendTestimonial[]>([]);
  const [story360Slides, setStory360Slides] = useState<Story360Item[]>([]);
  const [admin360Slides, setAdmin360Slides] = useState<Story360Item[]>([]);
  const [settings, setSettings] = useState<SiteSettingsState>(defaultSettings);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sosync_admin_logged") === "1";
    }
    return false;
  });
  const [authReady, setAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check current auth status
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const json = await res.json();
        const valid = Boolean(json.isAdmin);
        setIsAdmin(valid);
        if (typeof window !== "undefined") {
          if (valid) localStorage.setItem("sosync_admin_logged", "1");
          else localStorage.removeItem("sosync_admin_logged");
        }
      } else {
        setIsAdmin(false);
        if (typeof window !== "undefined") localStorage.removeItem("sosync_admin_logged");
      }
    } catch {
      // offline / not logged in
    } finally {
      setAuthReady(true);
    }
  }, []);

  // Fetch all live data from MongoDB APIs
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Projects
      const projRes = await fetch("/api/projects");
      if (projRes.ok) {
        const json = await projRes.json();
        if (json.projects && Array.isArray(json.projects)) {
          const list: ProjectItem[] = json.projects.map((p: any) => ({
            _id: p._id,
            id: p._id,
            title: p.title,
            href: p.href,
            image: p.image,
            category: p.category,
            description: p.description,
            tags: p.tags || [],
            showIn360: p.showIn360,
            order: p.order,
          }));

          // Preserve dummy projects alongside DB projects so rich case studies are always available
          const dbTitles = new Set(list.map((p) => (p.title || "").trim().toLowerCase()));
          const missingFallbacks = fallbackProjectsList.filter(
            (fb) => !dbTitles.has(fb.title.trim().toLowerCase())
          );
          const combined = [...list, ...missingFallbacks];

          setProjects(combined);
          setData((prev) => ({
            ...prev,
            portfolio: combined.map((p) => ({
              id: p.id || p._id || "",
              title: p.title,
              category: p.category,
              description: p.description,
              technologies: p.tags,
              image: p.image,
              href: p.href,
            })),
          }));
        }
      }

      // 2. Testimonials (approved for public, all for admin)
      const testRes = await fetch("/api/testimonials?all=true");
      if (testRes.ok) {
        const json = await testRes.json();
        if (json.testimonials) {
          const all: BackendTestimonial[] = json.testimonials;
          setAllAdminTestimonials(all);
          const approved = all.filter((t) => t.status === "approved");
          setTestimonials(approved);
          setData((prev) => ({
            ...prev,
            testimonials: (approved.length > 0 ? approved : all).map((t) => ({
              id: t._id,
              name: t.name,
              company: t.company,
              role: t.role,
              initials: t.initials,
              rating: t.rating,
              review: t.review,
            })),
          }));
        }
      }

      // 3. 360 Slides
      const storyRes = await fetch("/api/story-360");
      if (storyRes.ok) {
        const json = await storyRes.json();
        if (json.slides) setStory360Slides(json.slides);
        if (json.adminSlides) setAdmin360Slides(json.adminSlides);
      }

      // 4. Settings (Maintenance mode, social links, footer info)
      const settingsRes = await fetch("/api/settings");
      if (settingsRes.ok) {
        const json = await settingsRes.json();
        if (json.settings) {
          setSettings(json.settings);
          setData((prev) => ({
            ...prev,
            company: json.settings.company || prev.company,
            social: json.settings.social || prev.social,
          }));
        }
      }

      // 5. Enquiries (if admin)
      const enqRes = await fetch("/api/enquiries");
      if (enqRes.ok) {
        const json = await enqRes.json();
        if (json.enquiries) {
          setData((prev) => ({
            ...prev,
            enquiries: json.enquiries.map((e: any) => ({
              id: e._id,
              name: e.name,
              email: e.email,
              phone: e.phone,
              company: e.company,
              subject: e.subject,
              message: e.message,
              date: new Date(e.createdAt).toISOString().split("T")[0],
              read: e.read,
            })),
          }));
        }
      }
    } catch (err) {
      console.error("Error loading site data from MongoDB backend:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
    fetchAllData();
  }, [checkAuth, fetchAllData]);

  // Login handler
  const login = async (username: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: pass }),
      });
      if (res.ok) {
        setIsAdmin(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("sosync_admin_logged", "1");
        }
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setIsAdmin(false);
      if (typeof window !== "undefined") {
        localStorage.removeItem("sosync_admin_logged");
      }
    }
  };

  // Cloudinary image upload helper
  const uploadImage = async (file: File | string, folder = "sosync/portfolio"): Promise<string | null> => {
    try {
      if (typeof file === "string") {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: file, folder }),
        });
        const json = await res.json();
        return json.url || null;
      } else {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const json = await res.json();
        return json.url || null;
      }
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  // Project CRUD
  const createProject = async (project: Omit<ProjectItem, "_id" | "id">): Promise<boolean> => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateProject = async (id: string, patch: Partial<ProjectItem>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Testimonials
  const approveTestimonial = async (id: string, status: "approved" | "pending" | "rejected"): Promise<boolean> => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateTestimonial = async (id: string, patch: Partial<BackendTestimonial>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const createTestimonial = async (t: Partial<BackendTestimonial>): Promise<boolean> => {
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t),
      });
      if (res.ok) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteTestimonial = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // 360 Section
  const create360Slide = async (slide: { src: string; alt?: string; title?: string; active?: boolean }): Promise<boolean> => {
    try {
      const res = await fetch("/api/story-360", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slide),
      });
      if (res.ok) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const update360Slide = async (id: string, patch: Partial<Story360Item>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/story-360/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const delete360Slide = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/story-360/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchAllData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Settings & Footer
  const updateSettings = async (patch: Partial<SiteSettingsState>): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.settings) {
          setSettings(json.settings);
          setData((prev) => ({
            ...prev,
            company: json.settings.company || prev.company,
            social: json.settings.social || prev.social,
          }));
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Enquiries
  const addEnquiry = async (enquiry: Omit<Enquiry, "id" | "date" | "read">): Promise<boolean> => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const markEnquiryRead = async (id: string, read: boolean): Promise<boolean> => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      if (res.ok) {
        setData((prev) => ({
          ...prev,
          enquiries: prev.enquiries.map((e) => (e.id === id ? { ...e, read } : e)),
        }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteEnquiry = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setData((prev) => ({
          ...prev,
          enquiries: prev.enquiries.filter((e) => e.id !== id),
        }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Backward compatibility handlers for custom list items (services, team, etc.)
  const updateSingleton = <K extends "company" | "social" | "hero">(
    key: K,
    value: Partial<SiteData[K]>
  ) => {
    setData((prev) => {
      const next = { ...prev, [key]: { ...prev[key], ...value } };
      if (key === "company" || key === "social") {
        updateSettings({ [key]: next[key] });
      }
      return next;
    });
  };

  const addItem = (key: ListKey, item: Record<string, unknown> & { id?: string }) => {
    const id = item.id || `item-${Date.now()}`;
    const newItem = { ...item, id };
    setData((prev) => ({
      ...prev,
      [key]: [newItem, ...(prev[key] as any[])],
    }));
  };

  const updateItem = (key: ListKey, id: string, patch: Record<string, unknown>) => {
    setData((prev) => ({
      ...prev,
      [key]: (prev[key] as any[]).map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }));
  };

  const removeItem = (key: ListKey, id: string) => {
    setData((prev) => ({
      ...prev,
      [key]: (prev[key] as any[]).filter((it) => it.id !== id),
    }));
  };

  const resetData = () => {
    setData(defaultSiteData);
    fetchAllData();
  };

  return (
    <SiteDataContext.Provider
      value={{
        data,
        projects,
        testimonials,
        allAdminTestimonials,
        story360Slides,
        admin360Slides,
        settings,
        isAdmin,
        authReady,
        isLoading,
        login,
        logout,
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
        uploadImage,
        addEnquiry,
        markEnquiryRead,
        deleteEnquiry,
        refreshAllData: fetchAllData,
        updateSingleton,
        addItem,
        updateItem,
        removeItem,
        resetData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return ctx;
}
