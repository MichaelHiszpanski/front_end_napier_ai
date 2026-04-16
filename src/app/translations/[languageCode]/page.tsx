"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { tokenStorage } from "@/core/utils/local_storage";
import { TranslationWithLanguage } from "@/core/utils/types";
import { getTranslationsByLanguageApi, saveTranslationApi } from "@/features/translations/api/translations.api";
import LanguageSelector from "@/features/languages/components/LanguageSelector";

const PAGE_SIZE = 20;

export default function TranslationsPage() {
  const { languageCode } = useParams<{ languageCode: string }>();
  const router = useRouter();

  const [selectedLang, setSelectedLang] = useState<string>(languageCode);
  const [translations, setTranslations] = useState<TranslationWithLanguage[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) { router.push("/"); return; }
    if (!selectedLang) return;

    setLoading(true);
    setEditValues({});
    getTranslationsByLanguageApi(selectedLang, page, PAGE_SIZE, token)
      .then((data) => {
        setTranslations(data.data);
        setTotalPages(data.totalPages);
        setError(null);
      })
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [selectedLang, page, router]);

  function handleLangChange(code: string) {
    setSelectedLang(code);
    setPage(1);
  }

  async function handleSave(t: TranslationWithLanguage) {
    const token = tokenStorage.get();
    if (!token) return;

    setSaving(t.key);
    try {
      const updated = await saveTranslationApi(
        {
          key: t.key,
          language_code: selectedLang,
          translated_value: editValues[t.key] ?? t.translated_value,
        },
        token
      );
      setTranslations((prev) =>
        prev.map((item) => (item.key === updated.key ? updated : item))
      );
      setEditValues((prev) => { const next = { ...prev }; delete next[t.key]; return next; });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-4 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Translations
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              Page {page} of {totalPages}
            </p>
          </div>
          <LanguageSelector value={selectedLang} onChange={handleLangChange} />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {loading ? (
          <div className="text-sm text-zinc-400">Loading…</div>
        ) : (
          <>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-cyan-600 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cyan-600/30 text-left">
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/3">Key</th>
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/3">English</th>
                    <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/3">Translation</th>
                    <th className="px-4 py-3 w-16" />
                  </tr>
                </thead>
                <tbody>
                  {translations.map((t, i) => {
                    const isDirty = editValues[t.key] !== undefined;
                    return (
                      <tr
                        key={t.id}
                        className={`border-b border-zinc-100 dark:border-zinc-800 last:border-0 ${
                          i % 2 === 0 ? "" : "bg-zinc-50 dark:bg-zinc-800/40"
                        }`}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-zinc-500">{t.key}</td>
                        <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{t.english_value}</td>
                        <td className="px-4 py-2">
                          <input
                            className="w-full rounded-lg border border-transparent focus:border-cyan-600 bg-transparent px-2 py-1 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 transition-colors"
                            value={editValues[t.key] ?? t.translated_value ?? ""}
                            onChange={(e) =>
                              setEditValues((prev) => ({ ...prev, [t.key]: e.target.value }))
                            }
                          />
                        </td>
                        <td className="px-4 py-2 text-right">
                          {isDirty && (
                            <button
                              onClick={() => handleSave(t)}
                              disabled={saving === t.key}
                              className="text-xs text-cyan-600 border border-cyan-600 rounded-lg px-2 py-1 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-40"
                            >
                              {saving === t.key ? "…" : "Save"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-sm text-cyan-600 border border-cyan-600 rounded-xl px-4 py-1.5 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-zinc-500">{page} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-sm text-cyan-600 border border-cyan-600 rounded-xl px-4 py-1.5 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
