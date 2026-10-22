import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, FileText, Gauge, Headset, ShieldCheck, Truck, Wrench, Zap } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { FadeIn } from "@/components/FadeIn";
import { ButtonLink, GridPattern, ProductGrid, SectionHeading } from "@/components/Sections";

const whyIcons = [ShieldCheck, Truck, Headset];
const visualIcons = [Zap, Gauge, Wrench];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-white">
        <GridPattern />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/85">
              <Zap className="size-3.5 text-accent" />
              {dict.hero.eyebrow}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {dict.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">{dict.hero.subtitle}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/${lang}/products`}>{dict.hero.primaryCta}</ButtonLink>
              <ButtonLink href={`/${lang}/contact`} variant="ghost">
                {dict.hero.secondaryCta}
              </ButtonLink>
            </div>

            <ul className="mt-10 space-y-2.5">
              {dict.hero.highlights.map((text) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-white/85">
                  <CheckCircle2 className="size-4 shrink-0 text-accent" />
                  {text}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15} className="hidden md:block">
            <div className="relative mx-auto max-w-sm rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur">
              <div className="mx-auto grid size-28 place-items-center rounded-full bg-accent/20 shadow-[0_0_80px_-10px] shadow-accent/60">
                <Zap className="size-14 text-accent" />
              </div>
              <p className="mt-6 text-center font-semibold">{dict.hero.visualTitle}</p>
              <div className="mt-6 space-y-3">
                {dict.hero.visualItems.map((label, i) => {
                  const Icon = visualIcons[i % visualIcons.length];
                  return (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <Icon className="size-4 text-accent" />
                      <span className="text-sm">{label}</span>
                      <span className="ms-auto size-2 rounded-full bg-emerald-400" />
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={dict.products.eyebrow}
            title={dict.products.title}
            subtitle={dict.products.subtitle}
          />
        </div>
        <div className="mt-12">
          <ProductGrid dict={dict} />
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading eyebrow={dict.why.eyebrow} title={dict.why.title} />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {dict.why.items.map((item, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <span className="grid size-11 place-items-center rounded-xl bg-brand text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Catalogs + Contact CTAs */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2">
        <FadeIn>
          <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8">
            <FileText className="size-8 text-accent" />
            <h2 className="mt-5 text-2xl font-bold">{dict.catalogsCta.title}</h2>
            <p className="mt-3 flex-1 text-muted">{dict.catalogsCta.subtitle}</p>
            <div className="mt-6">
              <Link
                href={`/${lang}/catalogs`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                {dict.catalogsCta.cta}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-brand p-8 text-white">
            <GridPattern />
            <div className="relative flex h-full flex-col">
              <h2 className="text-2xl font-bold">{dict.contactCta.title}</h2>
              <p className="mt-3 flex-1 text-white/75">{dict.contactCta.subtitle}</p>
              <div className="mt-6">
                <ButtonLink href={`/${lang}/contact`}>{dict.contactCta.cta}</ButtonLink>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
