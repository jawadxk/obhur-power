import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader, ProductGrid } from "@/components/Sections";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).pages.products.title };
}

export default async function ProductsPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <PageHeader title={dict.pages.products.title} subtitle={dict.pages.products.subtitle} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ProductGrid dict={dict} />
      </section>
    </>
  );
}
