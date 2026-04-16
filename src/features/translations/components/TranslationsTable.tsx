import { Dispatch, FC, SetStateAction } from "react";
import { TranslationWithLanguage } from "@/core/utils/types";

interface TranslationsTableProps {
  translations: TranslationWithLanguage[];
  editValues: Record<string, string>;
  setEditValues: Dispatch<SetStateAction<Record<string, string>>>;
  saving: string | null;
  handleSave: (t: TranslationWithLanguage) => void;
}

const TranslationsTable: FC<TranslationsTableProps> = ({
  translations,
  editValues,
  setEditValues,
  saving,
  handleSave,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-cyan-600 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-cyan-600/30 text-left">
            <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/3">
              Key
            </th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/3">
              English
            </th>
            <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/3">
              Translation
            </th>
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
                <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                  {t.key}
                </td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                  {t.english_value}
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full rounded-lg border border-transparent focus:border-cyan-600 bg-transparent px-2 py-1 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 transition-colors"
                    value={editValues[t.key] ?? t.translated_value ?? ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        [t.key]: e.target.value,
                      }))
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
  );
};

export default TranslationsTable;
