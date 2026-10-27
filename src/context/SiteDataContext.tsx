import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultSiteData } from "@/data";
import type { Enquiry, ListKey, SiteData } from "@/data/types";

const STORAGE_KEY = "sosync-site-data-v1";
const AUTH_KEY = "sosync-admin-auth";

/** Hardcoded admin credentials (mock, client-side only per project spec). */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

interface SiteDataContextValue {
  data: SiteData;
  /** Update company / social / hero singletons. */
  updateSingleton: <K extends "company" | "social" | "hero">(
    key: K,
    value: Partial<SiteData[K]>
  ) => void;
  addItem: (key: ListKey, item: Record<string, unknown> & { id?: string }) => void;
  updateItem: (key: ListKey, id: string, patch: Record<string, unknown>) => void;
  removeItem: (key: ListKey, id: string) => void;
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "date" | "read">) => void;
  markEnquiryRead: (id: string, read: boolean) => void;
  resetData: () => void;
  isAdmin: boolean;
  /** True once the client-side auth state has been read from storage. */
  authReady: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function persist(data: SiteData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full/blocked: keep working in-memory.
  }
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  // Load admin-saved edits + auth state once on the client (mock data only — no backend).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<SiteData>;
        setData((prev) => ({ ...prev, ...parsed }));
      }
      setIsAdmin(localStorage.getItem(AUTH_KEY) === "1");
    } catch {
      // Corrupt or unavailable storage: fall back to defaults.
    }
    setAuthReady(true);
  }, []);

  const updateSingleton = useCallback(
    <K extends "company" | "social" | "hero">(key: K, value: Partial<SiteData[K]>) => {
      setData((prev) => {
        const next = { ...prev, [key]: { ...prev[key], ...value } };
        persist(next);
        return next;
      });
    },
    []
  );

  const addItem = useCallback(
    (key: ListKey, item: Record<string, unknown> & { id?: string }) => {
      setData((prev) => {
        const list = prev[key] as unknown[];
        const next = {
          ...prev,
          [key]: [{ id: item.id ?? uid(), ...item }, ...list],
        } as SiteData;
        persist(next);
        return next;
      });
    },
    []
  );

  const updateItem = useCallback((key: ListKey, id: string, patch: Record<string, unknown>) => {
    setData((prev) => {
      const list = (prev[key] as Array<{ id: string }>).map((it) =>
        it.id === id ? { ...it, ...patch } : it
      );
      const next = { ...prev, [key]: list } as SiteData;
      persist(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((key: ListKey, id: string) => {
    setData((prev) => {
      const list = (prev[key] as Array<{ id: string }>).filter((it) => it.id !== id);
      const next = { ...prev, [key]: list } as SiteData;
      persist(next);
      return next;
    });
  }, []);

  const addEnquiry = useCallback(
    (enquiry: Omit<Enquiry, "id" | "date" | "read">) => {
      addItem("enquiries", {
        ...enquiry,
        id: uid(),
        date: new Date().toISOString().slice(0, 10),
        read: false,
      });
    },
    [addItem]
  );

  const markEnquiryRead = useCallback(
    (id: string, read: boolean) => {
      updateItem("enquiries", id, { read });
    },
    [updateItem]
  );

  const resetData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setData(defaultSiteData);
  }, []);

  const login = useCallback((username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      try {
        localStorage.setItem(AUTH_KEY, "1");
      } catch {
        /* ignore */
      }
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
    setIsAdmin(false);
  }, []);

  const value = useMemo(
    () => ({
      data,
      updateSingleton,
      addItem,
      updateItem,
      removeItem,
      addEnquiry,
      markEnquiryRead,
      resetData,
      isAdmin,
      authReady,
      login,
      logout,
    }),
    [
      data,
      updateSingleton,
      addItem,
      updateItem,
      removeItem,
      addEnquiry,
      markEnquiryRead,
      resetData,
      isAdmin,
      authReady,
      login,
      logout,
    ]
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteDataContextValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used inside <SiteDataProvider>");
  return ctx;
}
