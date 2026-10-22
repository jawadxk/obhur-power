import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { FadeIn } from "@/components/FadeIn";
import { PageHeader } from "@/components/Sections";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).pages.contact.title };
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30";

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.pages.contact;

  const info = [
    { icon: Phone, value: dict.contactInfo.phone, ltr: true },
    { icon: Mail, value: dict.contactInfo.email, ltr: true },
    { icon: MapPin, value: dict.contactInfo.address, ltr: false },
  ];

  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-5">
        <FadeIn className="space-y-4 md:col-span-2">
          {info.map(({ icon: Icon, value, ltr }) => (
            <div key={value} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-accent">
                <Icon className="size-5" />
              </span>
              <span dir={ltr ? "ltr" : undefined} className="text-sm font-medium">
                {value}
              </span>
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={0.1} className="md:col-span-3">
          {/* UI only for now — wiring this up is a later phase. */}
          <form className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">
                {page.form.name}
                <input type="text" className={inputClass} />
              </label>
              <label className="text-sm font-medium">
                {page.form.email}
                <input type="email" dir="ltr" className={inputClass} />
              </label>
              <label className="text-sm font-medium sm:col-span-2">
                {page.form.phone}
                <input type="tel" dir="ltr" className={inputClass} />
              </label>
              <label className="text-sm font-medium sm:col-span-2">
                {page.form.message}
                <textarea rows={5} className={inputClass} />
              </label>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 sm:w-auto"
            >
              {page.form.submit}
            </button>
            <p className="mt-3 text-xs text-muted">{page.form.note}</p>
          </form>
        </FadeIn>
      </section>
    </>
  );
}
