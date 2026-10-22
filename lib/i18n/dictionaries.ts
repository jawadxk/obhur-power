import en from "./en.json";
import ar from "./ar.json";
import type { Locale } from "./config";

export type Dictionary = typeof en;

// TypeScript checks that ar.json has the same shape as en.json.
const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
