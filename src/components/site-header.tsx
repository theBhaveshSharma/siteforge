"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const { isSignedIn } = useAuth();

  return (
    <header
      className={`relative z-20 flex items-center justify-between px-6 py-5 md:px-10 ${
        solid ? "border-b border-border bg-background/90 backdrop-blur" : ""
      }`}
    >
      <Link href="/" className="font-display text-2xl tracking-tight text-sand">
        SiteForge
      </Link>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/dashboard" className="text-muted transition hover:text-foreground">
          Dashboard
        </Link>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <button className="rounded-md bg-accent px-4 py-2 font-semibold text-background transition hover:brightness-110">
              Sign in
            </button>
          </SignInButton>
        )}
      </nav>
    </header>
  );
}
