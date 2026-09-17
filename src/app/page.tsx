"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Fallback for hosts that don't run middleware (e.g. a static export on
 * GitHub Pages) — normally next-intl's middleware redirects "/" to the
 * detected locale before this is ever reached.
 *
 * Client-side router.replace() (not next/navigation's server redirect())
 * so the configured basePath is applied automatically at runtime —
 * this needs to resolve correctly whether the site is served at the
 * domain root (Vercel) or under a repo-name subpath (GitHub Pages).
 */
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${routing.defaultLocale}`);
  }, [router]);

  return null;
}
