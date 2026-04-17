import { formatDate } from "@/core/utils/helpers";
import { TranslationWithLanguage } from "@/core/utils/types";
import { Dispatch, FC, SetStateAction } from "react";

interface DekstopListTableProps {
  translations: TranslationWithLanguage[];
  editValues: Record<string, string>;
  setEditValues: Dispatch<SetStateAction<Record<string, string>>>;
  saving: string | null;
  handleSave: (t: TranslationWithLanguage) => void;
}

const DekstopListTable: FC<DekstopListTableProps> = ({
  translations,
  editValues,
  saving,
  setEditValues,
  handleSave,
}) => {
  return (
    <table className="hidden md:table w-full text-sm">
      <thead>
        <tr className="border-b border-cyan-600/30 text-left">
          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/4">
            Key
          </th>
          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/4">
            English
          </th>
          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/4">
            Description
          </th>

          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
            Created
          </th>
          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
            Updated
          </th>
          <th className="px-4 py-3 w-16" />
        </tr>
      </thead>
      <tbody>
        {translations.map((t, i) => {
          const isDirty: boolean = editValues[t.key] !== undefined;
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
              <td className="px-4 py-2 flex flex-row gap-2">
                <input
                  className="w-full rounded-lg border  border-transparent focus:border-cyan-600 bg-transparent px-2 py-1 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 transition-colors"
                  value={editValues[t.key] ?? t.translated_value ?? ""}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      [t.key]: e.target.value,
                    }))
                  }
                />
                {(editValues[t.key] ?? t.translated_value) && isDirty && (
                  <button
                    onClick={() => handleSave(t)}
                    disabled={saving === t.key}
                    className="text-xs text-cyan-600 border border-cyan-600 rounded-lg px-2 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-40"
                  >
                    {saving === t.key ? "…" : "Save"}
                  </button>
                )}
              </td>

              <td className="px-4 py-3 text-xs text-zinc-400 whitespace-nowrap">
                {formatDate(t.created_at)}
              </td>
              <td className="px-4 py-3 text-xs text-zinc-400 whitespace-nowrap">
                {formatDate(t.updated_at)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DekstopListTable;
