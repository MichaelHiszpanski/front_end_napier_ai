"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { tokenStorage } from "@/core/utils/local_storage";
import { TranslationWithLanguage } from "@/core/utils/types";
import {
  getTranslationsByLanguageApi,
  saveTranslationApi,
} from "@/features/translations/api/translations.api";
import LanguageSelector from "@/features/languages/components/LanguageSelector";
import TranslationsTable from "@/features/translations/components/TranslationsTable";
import Pagination from "@/core/components/Pagination/Pagination";

const PAGE_SIZE = 20;

export default function TranslationsPage() {
  const { languageCode } = useParams<{ languageCode: string }>();
  const router = useRouter();

  const [selectedLang, setSelectedLang] = useState<string>(languageCode);
  const [translations, setTranslations] = useState<TranslationWithLanguage[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      router.push("/");
      return;
    }
    if (!selectedLang) return;

    setLoading(true);
    setEditValues({});
    getTranslationsByLanguageApi(selectedLang, page, PAGE_SIZE, token)
      .then((data) => {
        setTranslations(data.data);
        setTotalPages(data.totalPages);
        setPage((p) => Math.min(p, data.totalPages));
        setError(null);
      })
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [selectedLang, page, router]);

  function handleLangChange(code: string) {
    setSelectedLang(code);
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
      setEditValues((prev) => {
        const next = { ...prev };
        delete next[t.key];
        return next;
      });
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
            <TranslationsTable
              translations={translations}
              editValues={editValues}
              setEditValues={setEditValues}
              saving={saving}
              handleSave={handleSave}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          </>
        )}
      </div>
    </div>
  );
}
