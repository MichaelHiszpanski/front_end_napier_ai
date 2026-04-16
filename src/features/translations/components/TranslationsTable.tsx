import { Dispatch, FC, SetStateAction } from "react";
import { TranslationWithLanguage } from "@/core/utils/types";
import MobileListTable from "./MobileListTable";
import DesktopListTable from "./DesktopListTable";

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
      <DesktopListTable
        translations={translations}
        editValues={editValues}
        setEditValues={setEditValues}
        saving={saving}
        handleSave={handleSave}
      />
      <MobileListTable
        translations={translations}
        editValues={editValues}
        setEditValues={setEditValues}
        saving={saving}
        handleSave={handleSave}
      />
    </div>
  );
};

export default TranslationsTable;
