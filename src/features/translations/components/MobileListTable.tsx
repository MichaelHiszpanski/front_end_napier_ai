import { formatDate } from "@/core/utils/helpers";
import { TranslationWithLanguage } from "@/core/utils/types";
import { Dispatch, SetStateAction } from "react";
import RowInput from "./RowInput";

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
            <RowInput
              t={t}
              editValues={editValues}
              setEditValues={setEditValues}
              saving={saving}
              handleSave={handleSave}
              isDirty={isDirty}
            />
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-3 text-xs text-zinc-400">
                <span>Created: {formatDate(t.created_at)}</span>
                <span>Updated: {formatDate(t.updated_at)}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileListTable;
