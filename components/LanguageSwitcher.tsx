"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const target: Locale = lang === "en" ? "ar" : "en";

  // Swap the first path segment (/en/products -> /ar/products) so the user stays on the same page.
  const segments = pathname.split("/");
  segments[1] = target;
  const href = segments.join("/") || `/${target}`;

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-foreground/5"
    >
      <Languages className="size-4" />
      <span className={target === "ar" ? "font-arabic" : "font-sans"}>
        {target === "ar" ? "العربية" : "English"}
      </span>
    </Link>
  );
}
