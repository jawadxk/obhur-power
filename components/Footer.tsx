import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getNavItems } from "./Header";
import { Logo } from "./Logo";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const items = getNavItems(lang, dict);

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo alt={dict.meta.siteName} variant="footer" />
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted">{dict.footer.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{dict.footer.quickLinks}</h3>
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted transition hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{dict.footer.contact}</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-accent" />
              <span dir="ltr">{dict.contactInfo.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-accent" />
              <span dir="ltr">{dict.contactInfo.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-accent" />
              <span>{dict.contactInfo.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        {/* Year is hardcoded on purpose: Cache Components doesn't allow new Date() in server components. */}
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © 2026 {dict.meta.siteName}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
