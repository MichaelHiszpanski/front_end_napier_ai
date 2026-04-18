import { formatDate } from "@/core/utils/helpers";
import { TranslationWithLanguage } from "@/core/utils/types";
import { Dispatch, FC, SetStateAction } from "react";
import RowInput from "./RowInput";

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
          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-min">
            Key
          </th>
          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-min">
            Lang
          </th>
          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/6">
            English
          </th>
          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-1/3">
            Description
          </th>

          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-min">
            Created
          </th>
          <th className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide w-min">
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
              <td className="px-4 py-3 font-mono text-xs text-zinc-500 ">
                {t.language_code}
              </td>
              <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                {t.english_value}
              </td>
              <td>
                <RowInput
                  t={t}
                  editValues={editValues}
                  setEditValues={setEditValues}
                  saving={saving}
                  handleSave={handleSave}
                  isDirty={isDirty}
                />
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
