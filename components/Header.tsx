import Link from "next/link";
import { Zap } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { DesktopNav, MobileNav, type NavItem } from "./Navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function getNavItems(lang: Locale, dict: Dictionary): NavItem[] {
  return [
    { href: `/${lang}`, label: dict.nav.home, exact: true },
    { href: `/${lang}/products`, label: dict.nav.products },
    { href: `/${lang}/catalogs`, label: dict.nav.catalogs },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];
}

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const items = getNavItems(lang, dict);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-brand text-accent">
            <Zap className="size-5" />
          </span>
          <span className="text-sm font-semibold leading-tight sm:text-base">
            {dict.meta.siteName}
          </span>
        </Link>

        <DesktopNav items={items} />

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} label={dict.nav.switchLanguage} />
          <ThemeToggle label={dict.nav.toggleTheme} />
          <MobileNav
            items={items}
            openLabel={dict.nav.openMenu}
            closeLabel={dict.nav.closeMenu}
          />
        </div>
      </div>
    </header>
  );
}
