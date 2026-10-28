import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | SOSync Ai Tech",
  description: "Admin area for SOSync Ai Tech website.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
