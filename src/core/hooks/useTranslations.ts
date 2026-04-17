import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { handleUnauthorized, tokenStorage } from "@/core/utils/local_storage";
import { TranslationWithLanguage } from "@/core/utils/types";
import {
  getTranslationsByLanguageAction,
  saveTranslationAction,
} from "@/features/translations/actions/translations.action";

const PAGE_SIZE = 20;

export function useTranslations() {
  const { languageCode } = useParams<{ languageCode: string }>();
  const router = useRouter();

  const [selectedLang, setSelectedLang] = useState<string>(languageCode);
  const [translations, setTranslations] = useState<TranslationWithLanguage[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      router.push("/");
      return;
    }
    if (!selectedLang) return;

    setEditValues({});

    startTransition(async () => {
      try {
        const data = await getTranslationsByLanguageAction(
          selectedLang,
          page,
          PAGE_SIZE,
          token
        );

        setTranslations(data.data);
        setTotalPages(data.totalPages);
        if (page > data.totalPages) setPage(data.totalPages);
        setError(null);
      } catch (err) {
        const msg = (err as Error).message;
        if (msg === "Unauthorized") return handleUnauthorized();
        setError(msg);
      }
    });
  }, [selectedLang, page, router]);

  function handleLangChange(code: string) {
    setSelectedLang(code);
    window.history.replaceState(null, "", `/translations/${code}`);
  }

  async function handleSave(t: TranslationWithLanguage) {
    const token = tokenStorage.get();
    if (!token) return;

    setSaving(t.key);
    startTransition(async () => {
      try {
        const updated = await saveTranslationAction(
          {
            key: t.key,
            language_code: selectedLang,
            translated_value: editValues[t.key] ?? t.translated_value ?? "",
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
        const msg = (err as Error).message;
        if (msg === "Unauthorized") return handleUnauthorized();
        setError(msg);
      } finally {
        setSaving(null);
      }
    });
  }

  return {
    selectedLang,
    translations,
    page,
    totalPages,
    error,
    saving,
    editValues,
    isPending,
    setPage,
    setEditValues,
    handleLangChange,
    handleSave,
  };
}
