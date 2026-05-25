import type { Metadata } from "next";
import "./globals.css";
import BackgroundLayer from "@/components/background-layer";
import Navigation from "@/components/navigation";
import InteractiveGlow from "@/components/interactive-glow";

export const metadata: Metadata = {
  title: "白子煜 · UX Designer",
  description: "白子煜的个人 UX 作品集 — 专注于企业级产品的用户体验设计",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full relative">
        <BackgroundLayer />
        <Navigation />
        {children}
        <InteractiveGlow />
      </body>
    </html>
  );
}
