import { DictionaryEntry, TranslationOptions, LanguageCode } from './types';
import { COMMUNITY_DICTIONARY_ENTRIES } from './communityDictionary';
import { PROFESSIONS_DICTIONARY_ENTRIES } from './professionsDictionary';
import { PLACES_DICTIONARY_ENTRIES } from './placesDictionary';
import { NAMES_DICTIONARY_ENTRIES } from './namesDictionary';
import { GENERAL_DICTIONARY_ENTRIES } from './generalDictionary';

/**
 * Combine all dictionary collections into the master library catalog
 */
export const ALL_DICTIONARY_ENTRIES: DictionaryEntry[] = [
  ...COMMUNITY_DICTIONARY_ENTRIES,
  ...PROFESSIONS_DICTIONARY_ENTRIES,
  ...PLACES_DICTIONARY_ENTRIES,
  ...NAMES_DICTIONARY_ENTRIES,
  ...GENERAL_DICTIONARY_ENTRIES,
];

// Pre-compiled bi-directional phrase and term lookup indexes
const EN_TO_UR_MAP = new Map<string, string>();
const UR_TO_EN_MAP = new Map<string, string>();

// Multi-word phrase lists sorted descending by length (longest match priority)
interface PhrasePair {
  en: string;
  ur: string;
  enRegex: RegExp;
  urRegex: RegExp;
}
const MULTI_WORD_PAIRS: PhrasePair[] = [];

// Initialize lookup indexes
(function initIndexes() {
  for (const entry of ALL_DICTIONARY_ENTRIES) {
    const enKey = entry.en.trim().toLowerCase();
    const urKey = entry.ur.trim();

    if (!EN_TO_UR_MAP.has(enKey)) {
      EN_TO_UR_MAP.set(enKey, entry.ur);
    }
    if (!UR_TO_EN_MAP.has(urKey)) {
      UR_TO_EN_MAP.set(urKey, entry.en);
    }

    // Register English aliases
    if (entry.aliasesEn) {
      for (const alias of entry.aliasesEn) {
        const aliasKey = alias.trim().toLowerCase();
        if (!EN_TO_UR_MAP.has(aliasKey)) {
          EN_TO_UR_MAP.set(aliasKey, entry.ur);
        }
      }
    }

    // Register Urdu aliases
    if (entry.aliasesUr) {
      for (const alias of entry.aliasesUr) {
        const aliasKey = alias.trim();
        if (!UR_TO_EN_MAP.has(aliasKey)) {
          UR_TO_EN_MAP.set(aliasKey, entry.en);
        }
      }
    }

    // Check if multi-word
    const isMultiWord = entry.en.includes(' ') || entry.ur.includes(' ');
    if (isMultiWord) {
      const escapeReg = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      MULTI_WORD_PAIRS.push({
        en: entry.en,
        ur: entry.ur,
        enRegex: new RegExp(`\\b${escapeReg(entry.en)}\\b`, 'gi'),
        urRegex: new RegExp(`${escapeReg(entry.ur)}`, 'g'),
      });

      if (entry.aliasesEn) {
        for (const alias of entry.aliasesEn) {
          if (alias.includes(' ')) {
            MULTI_WORD_PAIRS.push({
              en: alias,
              ur: entry.ur,
              enRegex: new RegExp(`\\b${escapeReg(alias)}\\b`, 'gi'),
              urRegex: new RegExp(`${escapeReg(entry.ur)}`, 'g'),
            });
          }
        }
      }

      if (entry.aliasesUr) {
        for (const alias of entry.aliasesUr) {
          if (alias.includes(' ')) {
            MULTI_WORD_PAIRS.push({
              en: entry.en,
              ur: alias,
              enRegex: new RegExp(`\\b${escapeReg(entry.en)}\\b`, 'gi'),
              urRegex: new RegExp(`${escapeReg(alias)}`, 'g'),
            });
          }
        }
      }
    }
  }

  // Sort multi-word phrases descending by length so longer phrases match first
  MULTI_WORD_PAIRS.sort((a, b) => b.en.length - a.en.length);
})();

/**
 * Checks if a string contains Urdu/Arabic Unicode characters
 */
export function isUrduScript(text?: string): boolean {
  if (!text) return false;
  return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

/**
 * Cleans corrupted or malformed transliterations and zero-width artifacts
 */
export function sanitizeTextSeparation(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, ' ') // Replace zero-width spaces with standard space where needed
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Translates English text to pure Urdu using the bilingual dictionary library
 */
export function translateEnglishToUrduWithLibrary(
  text: string,
  options: TranslationOptions = { preserveDigits: true, preserveUrlsAndEmails: true }
): string {
  if (!text || typeof text !== 'string') return '';
  const trimmed = sanitizeTextSeparation(text);
  if (!trimmed) return '';

  // Already Urdu?
  if (isUrduScript(trimmed)) return trimmed;

  // Direct exact match
  const directMatch = EN_TO_UR_MAP.get(trimmed.toLowerCase());
  if (directMatch) return directMatch;

  let result = trimmed;

  // 1. Replace multi-word phrases (longest first)
  for (const pair of MULTI_WORD_PAIRS) {
    if (pair.enRegex.test(result)) {
      result = result.replace(pair.enRegex, pair.ur);
    }
  }

  // 2. Tokenize remaining words and replace from single-word dictionary
  const tokens = result.split(/(\s+|[,.:;!?"'()\[\]\/\\]+)/);
  const translatedTokens = tokens.map(tok => {
    // Preserve numbers, URLs, emails if requested
    if (options.preserveDigits && /^\d+[\d\-.,]*$/.test(tok.trim())) {
      return tok;
    }
    if (options.preserveUrlsAndEmails && /[@:\/.]/.test(tok) && !tok.includes(' ')) {
      return tok;
    }

    const clean = tok.toLowerCase().trim();
    if (!clean) return tok;

    const dictUr = EN_TO_UR_MAP.get(clean);
    if (dictUr) return dictUr;

    return tok;
  });

  return sanitizeTextSeparation(translatedTokens.join(''));
}

/**
 * Translates Urdu text to accurate English using the bilingual dictionary library
 */
export function translateUrduToEnglishWithLibrary(
  text: string,
  options: TranslationOptions = { preserveDigits: true, preserveUrlsAndEmails: true }
): string {
  if (!text || typeof text !== 'string') return '';
  const trimmed = sanitizeTextSeparation(text);
  if (!trimmed) return '';

  // Already English?
  if (!isUrduScript(trimmed)) return trimmed;

  // Direct exact match
  const directMatch = UR_TO_EN_MAP.get(trimmed);
  if (directMatch) return directMatch;

  let result = trimmed;

  // 1. Replace multi-word phrases (longest first)
  for (const pair of MULTI_WORD_PAIRS) {
    if (result.includes(pair.ur)) {
      result = result.split(pair.ur).join(pair.en);
    }
  }

  // 2. Replace known Urdu punctuation with English punctuation
  result = result
    .replace(/،/g, ', ')
    .replace(/۔/g, '. ')
    .replace(/؟/g, '? ')
    .replace(/٪/g, '% ');

  // 3. Tokenize remaining words
  const tokens = result.split(/(\s+|[,.:;!?"'()\[\]\/\\]+)/);
  const translatedTokens = tokens.map(tok => {
    const clean = tok.trim();
    if (!clean) return tok;

    if (!isUrduScript(clean)) return tok;

    const dictEn = UR_TO_EN_MAP.get(clean);
    if (dictEn) return dictEn;

    return tok;
  });

  return sanitizeTextSeparation(translatedTokens.join(''));
}

/**
 * Searches the bilingual dictionary for matches in either English or Urdu
 */
export function searchBilingualDictionary(query: string, limit = 20): DictionaryEntry[] {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  const isUr = isUrduScript(q);

  const results: DictionaryEntry[] = [];
  for (const entry of ALL_DICTIONARY_ENTRIES) {
    if (isUr) {
      if (
        entry.ur.includes(q) ||
        (entry.aliasesUr && entry.aliasesUr.some(a => a.includes(q)))
      ) {
        results.push(entry);
      }
    } else {
      if (
        entry.en.toLowerCase().includes(q) ||
        (entry.aliasesEn && entry.aliasesEn.some(a => a.toLowerCase().includes(q)))
      ) {
        results.push(entry);
      }
    }
    if (results.length >= limit) break;
  }
  return results;
}

/**
 * Lookup exact word or phrase in dictionary
 */
export function lookupDictionaryTerm(term: string): { en?: string; ur?: string; entry?: DictionaryEntry } {
  const clean = term.trim();
  if (isUrduScript(clean)) {
    const en = UR_TO_EN_MAP.get(clean);
    const entry = ALL_DICTIONARY_ENTRIES.find(e => e.ur === clean || e.aliasesUr?.includes(clean));
    return { en, ur: clean, entry };
  } else {
    const ur = EN_TO_UR_MAP.get(clean.toLowerCase());
    const entry = ALL_DICTIONARY_ENTRIES.find(
      e => e.en.toLowerCase() === clean.toLowerCase() || e.aliasesEn?.some(a => a.toLowerCase() === clean.toLowerCase())
    );
    return { en: clean, ur, entry };
  }
}
