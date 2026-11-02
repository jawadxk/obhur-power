import Image from "next/image";

/**
 * OPS brand logo.
 * - "header": the OPS emblem + "Obhur Power Services" wordmark side by side.
 * - "footer": the full stacked logo (emblem above wordmark).
 * Each variant ships a color version (light mode) and a white version (dark mode);
 * Tailwind's `dark:` variant swaps them based on the class next-themes sets on <html>.
 * dir="ltr" keeps the emblem before the wordmark on the Arabic (RTL) pages too.
 */
export function Logo({
  alt,
  variant = "header",
}: {
  alt: string;
  variant?: "header" | "footer";
}) {
  if (variant === "footer") {
    return (
      <span dir="ltr" className="inline-block">
        <Image src="/brand/logo.svg" alt={alt} width={141} height={80} className="h-16 w-auto dark:hidden" />
        <Image src="/brand/logo-white.svg" alt={alt} width={141} height={80} className="hidden h-16 w-auto dark:block" />
      </span>
    );
  }

  return (
    <span dir="ltr" className="flex items-center gap-2.5">
      <Image src="/brand/logo-mark.svg" alt={alt} width={75} height={40} priority className="h-9 w-auto dark:hidden" />
      <Image src="/brand/logo-mark-white.svg" alt={alt} width={75} height={40} priority className="hidden h-9 w-auto dark:block" />
      {/* The wordmark repeats the name the emblem's alt already gives, so it is decorative. */}
      <Image src="/brand/logo-text.svg" alt="" width={204} height={20} priority className="h-3.5 w-auto sm:h-4 dark:hidden" />
      <Image src="/brand/logo-text-white.svg" alt="" width={204} height={20} priority className="hidden h-3.5 w-auto sm:h-4 dark:block" />
    </span>
  );
}
