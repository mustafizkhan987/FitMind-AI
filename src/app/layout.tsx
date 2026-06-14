import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitMind AI",
  description: "AI-Powered Personal Health Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="h-full flex bg-zinc-950 text-zinc-50 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-zinc-950/50 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
