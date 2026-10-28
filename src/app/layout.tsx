import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SiteDataProvider } from "@/context/SiteDataContext";
import { ClientLayoutWrapper } from "@/components/ClientLayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FF6B00",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SOSync Ai Tech IT Solution | AI, Software & Digital Innovation",
  description:
    "SOSync Ai Tech IT Solution — an AI-first IT company in Pune delivering software development, web & mobile apps, cloud, ERP/CRM and digital innovation.",
  authors: [{ name: "SOSync Ai Tech IT Solution" }],
  icons: {
    icon: [
      { url: "/images/logo-mark.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/images/logo-mark.png",
  },
  openGraph: {
    title: "SOSync Ai Tech IT Solution",
    description: "Transforming businesses through AI, software & digital innovation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        <SiteDataProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </SiteDataProvider>
      </body>
    </html>
  );
}
