import type { Metadata } from "next";
import {
  Fraunces,
  Source_Sans_3,
} from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SiteForge — Build your business website in minutes",
  description:
    "Pick a template, add your business details, and publish a live website. Edit anytime. Download when you are ready.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${display.variable} ${body.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
