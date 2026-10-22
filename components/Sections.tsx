import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Cable, Gauge, Wrench, Zap } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { FadeIn } from "./FadeIn";

// Icons for the product categories, in the same order as products.items in the JSON files.
const productIcons = [Zap, Gauge, Cable, Wrench];

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted">{subtitle}</p>}
    </div>
  );
}

export function ProductGrid({ dict }: { dict: Dictionary }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {dict.products.items.map((item, i) => {
        const Icon = productIcons[i % productIcons.length];
        return (
          <FadeIn key={item.title} delay={i * 0.08}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const styles =
    variant === "primary"
      ? "bg-accent text-slate-950 hover:brightness-110"
      : "border border-white/25 text-white hover:bg-white/10";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${styles}`}
    >
      {children}
      <ArrowRight className="size-4 rtl:rotate-180" />
    </Link>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <GridPattern />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-white/75">{subtitle}</p>
        </FadeIn>
      </div>
    </section>
  );
}

export function GridPattern() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 end-0 size-96 rounded-full bg-accent/25 blur-3xl"
      />
    </>
  );
}
