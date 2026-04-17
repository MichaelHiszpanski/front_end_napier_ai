import LanguageSelector from "@/features/languages/components/LanguageSelector";
import TranslationsTable from "@/features/translations/components/TranslationsTable";
import Pagination from "@/core/components/Pagination/Pagination";
import { useTranslations } from "@/core/hooks/useTranslations";

export default function TranslationsPage() {
  const {
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
  } = useTranslations();

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

        {isPending ? (
          <h2 className="text-sm text-zinc-400">Loading…</h2>
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
