import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Headset, ShieldCheck, Truck } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { FadeIn } from "@/components/FadeIn";
import { PageHeader } from "@/components/Sections";

type Props = { params: Promise<{ lang: string }> };

const whyIcons = [ShieldCheck, Truck, Headset];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).pages.about.title };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.pages.about;

  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
        <FadeIn className="space-y-5 text-lg leading-relaxed">
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </FadeIn>
        <div className="space-y-4">
          {dict.why.items.map((item, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-accent">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </>
  );
}
