import { formatDate } from "@/core/utils/helpers";
import { TranslationWithLanguage } from "@/core/utils/types";
import { Dispatch, SetStateAction } from "react";

interface MobileListTableProps {
  translations: TranslationWithLanguage[];
  editValues: Record<string, string>;
  setEditValues: Dispatch<SetStateAction<Record<string, string>>>;
  saving: string | null;
  handleSave: (t: TranslationWithLanguage) => void;
}
const MobileListTable: React.FC<MobileListTableProps> = ({
  translations,
  editValues,
  setEditValues,
  saving,
  handleSave,
}) => {
  return (
    <ul className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800">
      {translations.map((t, i) => {
        const isDirty = editValues[t.key] !== undefined;
        return (
          <li
            key={t.id}
            className={`px-4 py-3 flex flex-col gap-2 ${
              i % 2 === 0 ? "" : "bg-zinc-50 dark:bg-zinc-800/40"
            }`}
          >
            <p className="font-mono text-xs text-zinc-400 break-all">{t.key}</p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {t.english_value}
            </p>
            <input
              className="w-full rounded-lg border border-transparent focus:border-cyan-600 bg-zinc-100 dark:bg-zinc-800 px-2 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-cyan-600 transition-colors"
              value={editValues[t.key] ?? t.translated_value ?? ""}
              onChange={(e) =>
                setEditValues((prev) => ({ ...prev, [t.key]: e.target.value }))
              }
            />
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-3 text-xs text-zinc-400">
                <span>Created: {formatDate(t.created_at)}</span>
                <span>Updated: {formatDate(t.updated_at)}</span>
              </div>
              {isDirty && (
                <button
                  onClick={() => handleSave(t)}
                  disabled={saving === t.key}
                  className="text-xs text-cyan-600 border border-cyan-600 rounded-lg px-2 py-1 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-40"
                >
                  {saving === t.key ? "…" : "Save"}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileListTable;
