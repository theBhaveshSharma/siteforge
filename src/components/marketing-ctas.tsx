"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";

export function MarketingCtas() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-md bg-accent px-5 py-3 font-semibold text-background transition hover:brightness-110"
        >
          Go to dashboard
        </Link>
        <Link
          href="/sites/new"
          className="rounded-md border border-border px-5 py-3 text-sand transition hover:border-accent/50"
        >
          New site
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <SignUpButton mode="modal">
        <button className="rounded-md bg-accent px-5 py-3 font-semibold text-background transition hover:brightness-110">
          Create your site
        </button>
      </SignUpButton>
      <SignInButton mode="modal">
        <button className="rounded-md border border-border px-5 py-3 text-sand transition hover:border-accent/50">
          Sign in
        </button>
      </SignInButton>
    </div>
  );
}
