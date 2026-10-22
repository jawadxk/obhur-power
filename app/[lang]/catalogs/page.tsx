import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, FileText } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { FadeIn } from "@/components/FadeIn";
import { PageHeader } from "@/components/Sections";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).pages.catalogs.title };
}

export default async function CatalogsPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.pages.catalogs;

  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {page.items.map((name, i) => (
          <FadeIn key={name} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <div className="grid aspect-[4/3] place-items-center rounded-xl bg-brand/5 dark:bg-white/5">
                <FileText className="size-12 text-accent" />
              </div>
              <h3 className="mt-5 flex-1 font-semibold">{name}</h3>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm text-muted">
                  <Download className="size-4" />
                  {page.download}
                </span>
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
                  {dict.common.comingSoon}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>
    </>
  );
}
