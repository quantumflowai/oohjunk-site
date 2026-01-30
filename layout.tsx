import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OohJunk — Junk Removal",
  description: "Fast, reliable junk removal — without the hassle."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
