import { TranslationWithLanguage } from "@/core/utils/types";
import { Dispatch, FC, SetStateAction, useState } from "react";
import DetailsModal from "./DetailsModal";

interface RowInputProps {
  t: TranslationWithLanguage;
  editValues: Record<string, string>;
  setEditValues: Dispatch<SetStateAction<Record<string, string>>>;
  saving: string | null;
  handleSave: (t: TranslationWithLanguage) => void;
  isDirty: boolean;
}

const RowInput: FC<RowInputProps> = ({
  t,
  editValues,
  setEditValues,
  saving,
  handleSave,
  isDirty,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-row items-center gap-2 lg:gap-4 lg:px-2">
      <input
        className="w-full rounded-lg border border-transparent focus:border-cyan-600 bg-transparent px-2 py-1 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 transition-colors"
        value={editValues[t.key] ?? t.translated_value ?? ""}
        onChange={(e) =>
          setEditValues((prev) => ({ ...prev, [t.key]: e.target.value }))
        }
        onBlur={() => {
          if (editValues[t.key] === "") {
            setEditValues((prev) => {
              const next = { ...prev };
              delete next[t.key];
              return next;
            });
          }
        }}
      />

      {isDirty && (
        <button
          onClick={() => handleSave(t)}
          disabled={saving === t.key}
          className="text-xs text-cyan-600 border border-cyan-600 rounded-xl px-2 py-1 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-40"
        >
          {saving === t.key ? "…" : "Save"}
        </button>
      )}

      <button
        onClick={() => setShowDetails((prev) => !prev)}
        className="border-cyan-600 border rounded-full cursor-pointer select-none px-1"
      >
        {showDetails ? "🙈" : "👀"}
      </button>

      <DetailsModal
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        t={t}
      />
    </div>
  );
};

export default RowInput;
