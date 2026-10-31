import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pspyn.vercel.app"),
  title: "Putta Shankar Prasad Y N — Software Engineer & Product Builder",
  description: "A CSE undergraduate building practical software across product engineering, applied AI, automation, Linux systems and application security.",
  openGraph: {
    title: "Putta Shankar Prasad Y N — Engineering with intent",
    description: "Selected engineering work, experiments and product systems.",
    url: "https://pspyn.vercel.app",
    siteName: "PSP-YN Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Putta Shankar Prasad Y N — Engineering with intent",
    description: "Selected engineering work, experiments and product systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F8F5",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}