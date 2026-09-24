import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import PwaRegister from "@/components/PwaRegister";

export const metadata: Metadata = {
  title: "AuraCheck — Upload your look. Discover your vibe.",
  description: "AI-powered style and vibe analyzer with captions, songs, colors and shareable aura cards.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "AuraCheck" },
  formatDetection: { telephone: false },
  icons: { icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }, { url: "/icon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        <Navbar />
        <main className="mx-auto min-h-[calc(100vh-80px)] w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-12">
          {children}
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
